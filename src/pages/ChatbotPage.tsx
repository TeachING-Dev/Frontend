import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ChatApiError,
  askChatRoomMessage,
  createChatRoom,
  getChatRooms,
  getChatRoomMessages,
  type ChatSource,
  type ChatHistoryMessage,
  type ChatRoomSummary,
} from "../apis/chat";
import ChatBubble from "../components/chatbot/ChatBubble";
import ChatLimitModal from "../components/chatbot/ChatLimitModal";
import ChatSidebar from "../components/chatbot/ChatSidebar";
import SourceList from "../components/chatbot/SourceList";
import Toast from "../components/common/Toast";
import type { SourceItem } from "../components/chatbot/SourceList";
import { renderFormattedText } from "../utils/renderFormattedText";
import { getMyProfile } from "../apis/users";
import {
  isPremiumMembership,
  isSubscriptionActive,
} from "../utils/subscription";

const limitDescription = "요금제를 업그레이드하고 무제한으로 질문해 보세요!";
const chatRoomDailyQuestionLimit = 5;
const chatRoomLimit = 10;
const chatRoomListSize = 10;
const fallbackNoticeMessage =
  "죄송합니다. 현재 보관하신 자료 중에서는 관련 답변을 찾지 못했습니다.";
const fallbackSourceMessage =
  "내 자료에는 없지만, 일반적인 지식에 따르면";
const fallbackDefaultAnswer =
  "AI가 개인 맥락을 반영하는 방식은 대화 기록, 사용자가 설정한 선호, 현재 진행 중인 작업과 직접 입력한 조건 등을 종합하여 답변의 방향과 수준을 조정하는 방식으로 설명할 수 있습니다. 다만 서비스마다 활용하는 정보의 범위와 저장 방식이 달라, 이전에 정리한 내용과는 일부 차이가 있을 수 있습니다.";

const removeInlineSourceText = (
  content: string,
) =>
  content
    .replace(/\s*\[출처:[\s\S]*?\]/g, "")
    .trim();

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  isFallback?: boolean;
  isLoading?: boolean;
};

type ChatbotLocationState = {
  chatRoomId?: number | string;
} | null;

const getTodayKey = () =>
  new Date().toLocaleDateString("sv-SE");

const isToday = (dateValue: string) =>
  new Date(dateValue).toLocaleDateString(
    "sv-SE",
  ) === getTodayKey();

const countTodayUserQuestions = (
  messages: ChatHistoryMessage[],
) =>
  messages.filter(
    (message) =>
      message.role === "USER" &&
      isToday(message.createdAt),
  ).length;

const isQuestionLimitMessage = (message: string) =>
  (message.includes("무료") ||
    message.includes("제한") ||
    message.includes("하루")) &&
  (message.includes("5") ||
    message.includes("질문") ||
    message.includes("메시지") ||
    message.includes("메세지"));

const isQuestionLimitError = (error: unknown) =>
  error instanceof Error &&
  ((error instanceof ChatApiError &&
    error.code?.includes("LIMIT")) ||
    isQuestionLimitMessage(error.message));

const isRoomLimitError = (error: unknown) =>
  error instanceof ChatApiError &&
  (error.code?.includes("LIMIT") ||
    error.message.includes("대화방") ||
    error.message.includes("채팅방") ||
    error.message.includes("10"));

const isForbiddenChatError = (error: unknown) =>
  error instanceof ChatApiError &&
  (error.status === 403 ||
    error.code === "COMMON403_1");

const getSourceLabel = (
  source: ChatSource,
) => {
  return (
    source.citedText ||
    source.position ||
    source.materialTitle
  );
};

const getSourceMaterialTitle = (
  source: ChatSource,
) => {
  if (
    typeof source.startLine === "number" &&
    source.startLine >= 0
  ) {
    if (
      typeof source.endLine === "number" &&
      source.endLine >= 0 &&
      source.endLine !== source.startLine
    ) {
      return `${source.materialTitle}(${source.startLine}-${source.endLine}행)`;
    }

    return `${source.materialTitle}(${source.startLine}행)`;
  }

  return source.materialTitle;
};

const mapSources = (
  sources: ChatSource[],
) => {
  const primarySource = sources[0];

  if (!primarySource) {
    return [];
  }

  const sourceMap = new Map<number | string, SourceItem>();

  [primarySource].forEach((source) => {
    const sourceKey =
      source.url ||
      `${source.folderName}-${source.materialTitle}`;
    const previousSource =
      sourceMap.get(sourceKey);

    if (previousSource) {
      if (
        typeof previousSource.startLine !== "number" &&
        typeof source.startLine === "number"
      ) {
        previousSource.materialTitle =
          getSourceMaterialTitle(source);
        previousSource.startLine =
          source.startLine;
        previousSource.endLine = source.endLine;
      }

      return;
    }

    sourceMap.set(sourceKey, {
      label: getSourceLabel(source),
      materialId: source.materialId,
      folderId: source.folderId,
      materialTitle: getSourceMaterialTitle(source),
      folderName: source.folderName,
      url: source.url,
      startLine: source.startLine,
      endLine: source.endLine,
      location: getSourceLabel(source),
    });
  });

  return Array.from(sourceMap.values());
};

const mapHistoryMessage = (
  message: ChatHistoryMessage,
): ChatMessage => ({
  id: message.messageId,
  role:
    message.role === "USER"
      ? "user"
      : "assistant",
  content: message.content,
  isFallback: message.isFallback,
  sources:
    message.sources.length > 0
      ? mapSources(message.sources)
      : undefined,
});

const ChatbotPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoomSummary[]>([]);
  const [isRoomLimitModalOpen, setIsRoomLimitModalOpen] = useState(false);
  const [isQuestionLimitModalOpen, setIsQuestionLimitModalOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isPremiumUser, setIsPremiumUser] = useState(
    isSubscriptionActive,
  );
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "✓ 복사 완료! 원문에서 붙여넣기(Ctrl+V)로 위치를 확인하세요.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const contentMarginClass = isNavOpen ? "ml-[204px] max-md:ml-0" : "ml-20 max-md:ml-0";
  const emptyStateCenterClass = isNavOpen
    ? "md:-translate-x-[102px]"
    : "md:-translate-x-10";
  const hasConversation = messages.length > 0;
  const locationState =
    location.state as ChatbotLocationState;
  const chatRoomIdValue =
    params.chatRoomId ??
    searchParams.get("chatRoomId") ??
    locationState?.chatRoomId;
  const chatRoomId =
    chatRoomIdValue === undefined ||
    chatRoomIdValue === null
      ? null
      : Number(chatRoomIdValue);
  const hasValidChatRoomId =
    chatRoomId !== null &&
    !Number.isNaN(chatRoomId);

  useEffect(() => {
    document.body.classList.toggle(
      "chatbot-search-focused",
      isSearchFocused,
    );

    return () => {
      document.body.classList.remove("chatbot-search-focused");
    };
  }, [isSearchFocused]);

  useEffect(() => {
    document.body.classList.toggle(
      "chatbot-sidebar-open",
      isNavOpen,
    );

    return () => {
      document.body.classList.remove("chatbot-sidebar-open");
    };
  }, [isNavOpen]);

  useEffect(() => {
    const loadSubscriptionStatus = async () => {
      try {
        const profile = await getMyProfile();
        setIsPremiumUser(
          isSubscriptionActive() ||
            isPremiumMembership(
              profile.membershipType,
            ),
        );
      } catch (error) {
        console.error(error);
      }
    };

    void loadSubscriptionStatus();
  }, []);

  const loadChatRooms = useCallback(async () => {
    try {
      const chatRoomList = await getChatRooms({
        size: chatRoomListSize,
      });
      setChatRooms(chatRoomList.chatrooms);
      return chatRoomList.chatrooms;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, []);

  useEffect(() => {
    const loadInitialChatRooms = async () => {
      await loadChatRooms();
    };

    void loadInitialChatRooms();
  }, [loadChatRooms]);

  useEffect(() => {
    if (!hasValidChatRoomId) {
      return;
    }

    const loadChatMessages = async () => {
      try {
        const chatHistory =
          await getChatRoomMessages(chatRoomId);

        setMessages(
          chatHistory.messages.map(
            mapHistoryMessage,
          ),
        );
        setQuestionCount(
          countTodayUserQuestions(
            chatHistory.messages,
          ),
        );
      } catch (error) {
        console.error(error);

        if (isForbiddenChatError(error)) {
          setMessages([]);
          navigate("/chatbot", { replace: true });
        }
      }
    };

    void loadChatMessages();
  }, [chatRoomId, hasValidChatRoomId, navigate]);

  useEffect(() => {
    const chatScrollElement = chatScrollRef.current;

    if (!chatScrollElement) {
      return;
    }

    chatScrollElement.scrollTo({
      top: chatScrollElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuestion = question.trim();

    if (!nextQuestion) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    const currentQuestionCount = hasValidChatRoomId
      ? questionCount
      : 0;

    if (
      !isPremiumUser &&
      currentQuestionCount >= chatRoomDailyQuestionLimit
    ) {
      setQuestionCount(currentQuestionCount);
      setIsQuestionLimitModalOpen(true);
      return;
    }

    if (
      !hasValidChatRoomId &&
      !isPremiumUser &&
      chatRooms.length >= chatRoomLimit
    ) {
      setIsRoomLimitModalOpen(true);
      return;
    }

    const now = Date.now();
    const userMessage: ChatMessage = {
      id: now,
      role: "user",
      content: nextQuestion,
    };
    const loadingMessage: ChatMessage = {
      id: now + 1,
      role: "assistant",
      content: "답변을 찾고 있어요...",
      isLoading: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage, loadingMessage]);
    setQuestion("");
    setIsSearchFocused(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsSubmitting(true);
    let createdChatRoomId: number | null = null;

    const resolveChatRoomId = async () => {
      if (hasValidChatRoomId) {
        return chatRoomId;
      }

      const createdChatRoom =
        await createChatRoom();
      createdChatRoomId =
        createdChatRoom.chatroomId;

      return createdChatRoom.chatroomId;
    };

    try {
      const activeChatRoomId =
        await resolveChatRoomId();
      const askResult =
        await askChatRoomMessage(activeChatRoomId, {
          content: nextQuestion,
        });

      if (
        !isPremiumUser &&
        isQuestionLimitMessage(
          askResult.aiMessage.content,
        )
      ) {
        setQuestionCount(
          chatRoomDailyQuestionLimit,
        );
        setMessages((prevMessages) =>
          prevMessages.filter(
            (message) =>
              message.id !== userMessage.id &&
              message.id !== loadingMessage.id,
          ),
        );
        setQuestion(nextQuestion);
        setIsQuestionLimitModalOpen(true);
        return;
      }

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === userMessage.id
            ? {
                ...message,
                id: askResult.userMessage.messageId,
                content:
                  askResult.userMessage.content,
              }
            : message.id === loadingMessage.id
              ? {
                  id: askResult.aiMessage.messageId,
                  role: "assistant",
                  content:
                    askResult.aiMessage.content,
                  isFallback:
                    askResult.aiMessage.isFallback,
                  sources:
                    askResult.aiMessage.sources
                      .length > 0
                      ? mapSources(
                          askResult.aiMessage
                            .sources,
                        )
                      : undefined,
                  isLoading: false,
                }
              : message,
        ),
      );

      setQuestionCount(
        currentQuestionCount + 1,
      );

      if (createdChatRoomId !== null) {
        await loadChatRooms();
        navigate(
          `/chatbot/${createdChatRoomId}`,
          { replace: true },
        );
      }
    } catch (error) {
      console.error(error);

      if (
        !isPremiumUser &&
        isQuestionLimitError(error)
      ) {
        setQuestionCount(
          chatRoomDailyQuestionLimit,
        );
        setMessages((prevMessages) =>
          prevMessages.filter(
            (message) =>
              message.id !== userMessage.id &&
              message.id !== loadingMessage.id,
          ),
        );
        setQuestion(nextQuestion);
        setIsQuestionLimitModalOpen(true);
        return;
      }

      if (
        !isPremiumUser &&
        isRoomLimitError(error)
      ) {
        setMessages((prevMessages) =>
          prevMessages.filter(
            (message) =>
              message.id !== userMessage.id &&
              message.id !== loadingMessage.id,
          ),
        );
        setQuestion(nextQuestion);
        setIsRoomLimitModalOpen(true);
        return;
      }

      if (isForbiddenChatError(error)) {
        setMessages((prevMessages) =>
          prevMessages.filter(
            (message) =>
              message.id !== userMessage.id &&
              message.id !== loadingMessage.id,
          ),
        );
        setQuestion(nextQuestion);
        navigate("/chatbot", { replace: true });
        return;
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "답변을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === loadingMessage.id
            ? {
                ...message,
                content:
                  errorMessage,
                isLoading: false,
              }
            : message,
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSourceNameClick = async (
    source: SourceItem,
  ) => {
    if (!source.url) {
      setToastMessage("원문 링크를 찾을 수 없습니다.");
      setIsCopyToastVisible(true);
      window.setTimeout(() => {
        setIsCopyToastVisible(false);
      }, 2200);
      return;
    }

    try {
      await navigator.clipboard.writeText(
        source.location,
      );
    } finally {
      setToastMessage(
        "✓ 복사 완료! 원문에서 붙여넣기(Ctrl+V)로 위치를 확인하세요.",
      );
      setIsCopyToastVisible(true);
      window.setTimeout(() => {
        setIsCopyToastVisible(false);
      }, 2200);
      window.setTimeout(() => {
        window.open(
          source.url,
          "_blank",
          "noopener,noreferrer",
        );
      }, 1000);
    }
  };

  const getFallbackAnswer = (
    content: string,
  ) => {
    const trimmedContent = removeInlineSourceText(content)
      .replace(fallbackSourceMessage, "")
      .replace(/^,\s*/, "")
      .trim();

    if (
      !trimmedContent ||
      trimmedContent === fallbackNoticeMessage
    ) {
      return fallbackDefaultAnswer;
    }

    return trimmedContent;
  };

  const isSingleLineText = (content: string) => {
    const trimmedContent = content.trim();

    return trimmedContent.length > 0 && !trimmedContent.includes("\n");
  };

  const getSourcedAnswerBody = (content: string) =>
    removeInlineSourceText(content)
      .replace(fallbackSourceMessage, "")
      .replace(/^,\s*/, "")
      .replace(/^관련 자료를 찾았습니다\.?\s*/, "")
      .trim();

  const getSourcedAnswer = (
    content: string,
    hasSources: boolean,
  ) => {
    if (!hasSources) {
      return content;
    }

    const sourcedContent = getSourcedAnswerBody(content);

    if (
      sourcedContent.startsWith(
        "관련 자료를 찾았습니다.",
      )
    ) {
      return sourcedContent;
    }

    return `관련 자료를 찾았습니다.\n${sourcedContent}`;
  };

  const handleSubscribeClick = () => {
    navigate("/subscription", {
      state: {
        backTarget: "chatbot",
      },
    });
  };

  const handleCreateRoomClick = async () => {
    if (
      !isPremiumUser &&
      chatRooms.length >= chatRoomLimit
    ) {
      setIsNavOpen(false);
      setIsRoomLimitModalOpen(true);
      return;
    }

    try {
      const createdChatRoom =
        await createChatRoom();
      await loadChatRooms();
      setMessages([]);
      navigate(
        `/chatbot/${createdChatRoom.chatroomId}`,
      );
      setIsNavOpen(false);
    } catch (error) {
      console.error(error);
      setIsNavOpen(false);

      if (
        !isPremiumUser &&
        isRoomLimitError(error)
      ) {
        setIsRoomLimitModalOpen(true);
      }
    }
  };

  const handleChatRoomClick = (index: number) => {
    const selectedRoom = chatRooms[index];

    if (!selectedRoom) {
      return;
    }

    navigate(`/chatbot/${selectedRoom.chatroomId}`);
    setIsNavOpen(false);
  };

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden bg-[#090713] max-md:-mt-16 max-md:h-screen">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

      {isNavOpen ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] hidden h-[120px] bg-[#090713] max-md:block"
        />
      ) : null}

      <button
        type="button"
        aria-label="챗봇 사이드바 열기"
        onClick={() => setIsNavOpen(true)}
        className="absolute left-4 top-[70px] z-10 hidden h-9 w-8 max-md:fixed max-md:top-[44px] max-md:z-50 max-md:block"
      >
        <img
          src="/logo/logo.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      </button>

      <ChatSidebar
        isOpen={isNavOpen}
        files={chatRooms.map((room) => room.title)}
        onOpen={() => setIsNavOpen(true)}
        onClose={() => setIsNavOpen(false)}
        onCreateRoomClick={() => void handleCreateRoomClick()}
        onFileClick={handleChatRoomClick}
      />

      <main
        className={`relative z-0 flex h-[calc(100vh-64px)] min-h-0 flex-col items-center overflow-hidden px-14 pb-6 pt-16 transition-[margin] duration-200 max-md:h-screen max-md:px-0 max-md:pt-0 ${contentMarginClass}`}
      >
        {hasConversation ? (
          <div
            ref={chatScrollRef}
            className={`scrollbar-hide min-h-0 w-full flex-1 overflow-y-auto pb-28 pt-[70px] max-md:pt-[87px] ${
              isSearchFocused
                ? "max-md:pb-[370px]"
                : "max-md:pb-[190px]"
            }`}
          >
            <div className="flex w-full flex-col gap-8 max-md:gap-[80px]">
              {messages.map((message) =>
                message.role === "user" ? (
                  <ChatBubble
                    key={message.id}
                    align="right"
                    className={
                      isSingleLineText(message.content)
                        ? "max-md:w-fit max-md:max-w-[300px]"
                        : "max-md:w-[300px] max-md:max-w-[300px]"
                    }
                  >
                    {message.content}
                  </ChatBubble>
                ) : (
                  <div
                    key={message.id}
                    className={`flex w-full flex-col gap-3 ${
                      message.isLoading ? "max-md:mt-[23px]" : ""
                    }`}
                  >
                    {message.isFallback && !message.isLoading ? (
                      <>
                        <ChatBubble
                          align="left"
                          className="w-[605px] max-w-full whitespace-pre-line max-md:hidden"
                        >
                          {fallbackNoticeMessage}
                        </ChatBubble>

                        <p className="hidden px-5 font-['SUIT'] text-[14px] font-normal text-[#A1A1A5] max-md:block">
                          죄송합니다. 현재 보관하신 자료 중에서는
                          <br />
                          관련 답변을 찾지 못했습니다.
                        </p>

                        <div className="flex w-full justify-start pl-0 pr-[43%] max-md:mt-2 max-md:px-5">
                          <div className="inline-block rounded-[20px] bg-gradient-to-r from-[#917DEC]/60 to-[#FFFFFF]/30 p-[1px]">
                            <div className="flex h-[42px] items-center rounded-[19px] bg-gradient-to-b from-[#0B0A18] to-[#453c71] px-4 font-['SUIT'] text-[15px] font-normal leading-[160%] text-white max-md:h-[31px] max-md:justify-center max-md:px-4 max-md:text-center max-md:text-[14px] max-md:font-normal max-md:leading-[150%]">
                              {fallbackSourceMessage}
                            </div>
                          </div>
                        </div>

                        <div className="max-md:mt-[5px]">
                          <ChatBubble
                            align="left"
                            className={`w-[605px] max-w-full whitespace-pre-line ${
                              isSingleLineText(getFallbackAnswer(message.content))
                                ? "max-md:w-fit max-md:max-w-[353px]"
                                : "max-md:w-[353px] max-md:max-w-[353px]"
                            }`}
                          >
                            {getFallbackAnswer(message.content)}
                          </ChatBubble>
                        </div>
                      </>
                    ) : message.isLoading ? (
                      <>
                        <div className="hidden w-full items-center px-5 max-md:flex">
                          <img
                            src="/logo/logo.png"
                            alt=""
                            aria-hidden="true"
                            className="h-10 w-9"
                          />
                          <div className="ml-[15px] flex items-center gap-[6.4px]">
                            {[0, 1, 2].map((dotIndex) => (
                              <img
                                key={dotIndex}
                                src="/icon/loading-dot.svg"
                                alt=""
                                aria-hidden="true"
                                className="size-[5px]"
                              />
                            ))}
                          </div>
                        </div>

                        <ChatBubble
                          align="left"
                          className="w-[605px] max-w-full whitespace-pre-line text-zinc-500 max-md:hidden"
                        >
                          {getSourcedAnswer(
                            message.content,
                            Boolean(message.sources),
                          )}
                        </ChatBubble>
                      </>
                    ) : (
                      <>
                        <ChatBubble
                          align="left"
                          className={`w-[605px] max-w-full whitespace-pre-line ${
                            message.sources
                              ? "max-md:hidden"
                              : "max-md:w-[353px] max-md:max-w-[353px]"
                          }`}
                        >
                          {getSourcedAnswer(
                            message.content,
                            Boolean(message.sources),
                          )}
                        </ChatBubble>

                        {message.sources ? (
                          <>
                            <p className="hidden px-5 font-['SUIT'] text-[14px] font-normal text-[#A1A1A5] max-md:block">
                              관련 자료를 찾았습니다.
                            </p>
                            <p className="hidden whitespace-pre-line px-5 font-['SUIT'] text-[14px] font-normal text-white max-md:block">
                              {renderFormattedText(getSourcedAnswerBody(message.content))}
                            </p>
                          </>
                        ) : null}
                      </>
                    )}

                    {!message.isFallback && message.sources ? (
                      <div className="flex w-full justify-start pl-0 pr-[43%] max-md:mt-[26px] max-md:px-5">
                        <SourceList
                          sources={message.sources}
                          onSourceNameClick={(source) => void handleSourceNameClick(source)}
                        />
                      </div>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-x-0 bottom-[126px] top-0 max-md:pointer-events-auto max-md:bottom-[190px] max-md:overflow-y-auto max-md:overscroll-contain">
            <div className={`flex min-h-full translate-y-5 flex-col items-center justify-center max-md:translate-y-0 max-md:pt-[70px] ${emptyStateCenterClass}`}>
              <div className="flex h-[110px] w-[127px] shrink-0 items-center justify-center max-md:h-[90px] max-md:w-[108px]">
                <img
                  src="/character/ConfidentTaka.svg"
                  alt="열공 티키"
                  className="h-[110px] w-[127px] object-contain max-md:h-full max-md:w-full"
                />
              </div>

              <h1 className="mt-2.5 text-center font-['SUIT'] text-[18px] font-normal leading-[180%] tracking-normal text-white max-md:mt-2 max-md:text-[18px] max-md:leading-[150%]">
                내 자료에서 답을 찾아드립니다.
              </h1>
              <p className="mt-1.5 text-center font-['SUIT'] text-[13px] font-normal leading-4 text-[#717379] max-md:mt-1.5 max-md:text-[13px] max-md:leading-[150%]">
                정확한 키워드를 몰라도 괜찮아요 !
                <br />
                대략적인 상황이나 기억나는 단서만 입력하면,
                <br className="md:hidden" />
                타카가 관련 자료를 찾아 답변해 드립니다.
              </p>
            </div>
          </div>
        )}
        {isCopyToastVisible ? (
          <Toast
            variant="chat"
            message={toastMessage}
          />
        ) : null}

        <form
          onSubmit={handleSubmit}
          className={`fixed bottom-[50px] left-1/2 flex w-full -translate-x-1/2 justify-center px-[170px] max-md:px-4 ${
            isNavOpen
              ? "max-md:hidden"
              : isSearchFocused
              ? "max-md:bottom-auto max-md:top-[502.99px]"
              : "max-md:bottom-[110px]"
          }`}
        >
          <label
  className="
    box-border
    h-[50px]
    w-full
    max-w-[800px]
    rounded-[10px]
    border-[2px]
    border-[#917DEC]
    bg-[#13151F]
    py-2.5
    pl-5
    pr-3
    shadow-[0_0_50px_0_rgba(145,125,236,0.50)]
    max-md:pl-[14px]
    max-md:pr-[12px]
  "
>
            <div className="flex h-full w-full items-center justify-between">
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="궁금한 점을 물어보세요"
              className="flex-1 bg-transparent font-['SUIT'] text-[15px] font-medium leading-5 text-violet-50 outline-none placeholder:text-[#42444C] max-md:text-[14px] max-md:font-normal max-md:placeholder:font-normal"
            />
            <button
              type="submit"
              aria-label="질문 보내기"
              disabled={isSubmitting}
              onPointerDown={(event) => {
                event.preventDefault();
              }}
              className="flex size-9 items-center justify-center transition hover:opacity-85 disabled:opacity-50 max-md:size-6"
            >
              <img
                src="/icon/chat-send.svg"
                alt=""
                aria-hidden="true"
                className="size-6"
              />
            </button>
            </div>
          </label>
        </form>
      </main>

      <ChatLimitModal
        isOpen={isQuestionLimitModalOpen}
        title="이 대화방의 오늘 질문을 모두 사용했어요"
        description={limitDescription}
        onClose={() => setIsQuestionLimitModalOpen(false)}
        onSubscribe={handleSubscribeClick}
      />
      <ChatLimitModal
        isOpen={isRoomLimitModalOpen}
        title="대화방 생성 한도에 도달했어요"
        description={limitDescription}
        onClose={() => setIsRoomLimitModalOpen(false)}
        onSubscribe={handleSubscribeClick}
      />
    </section>
  );
};

export default ChatbotPage;




