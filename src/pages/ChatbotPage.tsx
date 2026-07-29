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
import { ArrowUp } from "lucide-react";
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

const limitDescription = "요금제를 업그레이드하고 무제한으로 티칭잉을 만들어 보세요!";
const dailyQuestionLimit = 5;
const chatRoomLimit = 10;
const chatRoomListSize = 10;
const dailyQuestionCountStorageKey =
  "chatbotDailyQuestionCount";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  isLoading?: boolean;
};

type ChatbotLocationState = {
  chatRoomId?: number | string;
} | null;

const getTodayKey = () =>
  new Date().toLocaleDateString("sv-SE");

const getStoredDailyQuestionCount = () => {
  const storedValue = localStorage.getItem(
    dailyQuestionCountStorageKey,
  );

  if (!storedValue) {
    return 0;
  }

  try {
    const parsedValue = JSON.parse(
      storedValue,
    ) as {
      date?: string;
      count?: number;
    };

    if (parsedValue.date !== getTodayKey()) {
      return 0;
    }

    return parsedValue.count ?? 0;
  } catch {
    return 0;
  }
};

const setStoredDailyQuestionCount = (
  count: number,
) => {
  localStorage.setItem(
    dailyQuestionCountStorageKey,
    JSON.stringify({
      date: getTodayKey(),
      count,
    }),
  );
};

const isQuestionLimitError = (error: unknown) =>
  error instanceof ChatApiError &&
  (error.code?.includes("LIMIT") ||
    error.message.includes("제한") ||
    error.message.includes("하루") ||
    error.message.includes("무료") ||
    error.message.includes("5"));

const isRoomLimitError = (error: unknown) =>
  error instanceof ChatApiError &&
  (error.code?.includes("LIMIT") ||
    error.message.includes("대화방") ||
    error.message.includes("채팅방") ||
    error.message.includes("10"));

const getSourceLabel = (
  source: ChatSource,
) => {
  const position = source.position
    ? ` (${source.position})`
    : "";

  return `${source.materialTitle}${position}`;
};

const mapSources = (
  sources: ChatSource[],
) =>
  sources.map((source) => ({
    label: getSourceLabel(source),
    location:
      source.url ||
      `${source.folderName} - ${source.materialTitle}`,
  }));

const mapHistoryMessage = (
  message: ChatHistoryMessage,
): ChatMessage => ({
  id: message.messageId,
  role:
    message.role === "USER"
      ? "user"
      : "assistant",
  content: message.content,
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoomSummary[]>([]);
  const [isRoomLimitModalOpen, setIsRoomLimitModalOpen] = useState(false);
  const [isQuestionLimitModalOpen, setIsQuestionLimitModalOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(
    getStoredDailyQuestionCount,
  );
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const contentMarginClass = isNavOpen ? "ml-[204px]" : "ml-20";
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
      const loadedChatRooms =
        await loadChatRooms();

      if (
        !hasValidChatRoomId &&
        loadedChatRooms.length > 0
      ) {
        navigate(
          `/chatbot/${loadedChatRooms[0].chatroomId}`,
          { replace: true },
        );
      }
    };

    void loadInitialChatRooms();
  }, [hasValidChatRoomId, loadChatRooms, navigate]);

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
      } catch (error) {
        console.error(error);
      }
    };

    void loadChatMessages();
  }, [chatRoomId, hasValidChatRoomId]);

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

    if (questionCount >= dailyQuestionLimit) {
      setIsQuestionLimitModalOpen(true);
      return;
    }

    if (
      !hasValidChatRoomId &&
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

      if (askResult.remainingCount <= 0) {
        setQuestionCount(dailyQuestionLimit);
        setStoredDailyQuestionCount(
          dailyQuestionLimit,
        );
      } else {
        const nextQuestionCount =
          dailyQuestionLimit -
          askResult.remainingCount;
        setQuestionCount(nextQuestionCount);
        setStoredDailyQuestionCount(
          nextQuestionCount,
        );
      }

      if (createdChatRoomId !== null) {
        await loadChatRooms();
        navigate(
          `/chatbot/${createdChatRoomId}`,
          { replace: true },
        );
      }
    } catch (error) {
      console.error(error);

      if (isQuestionLimitError(error)) {
        setQuestionCount(dailyQuestionLimit);
        setStoredDailyQuestionCount(
          dailyQuestionLimit,
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

      if (isRoomLimitError(error)) {
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

  const copySourceLocation = async (location: string) => {
    try {
      await navigator.clipboard.writeText(location);
    } finally {
      setIsCopyToastVisible(true);
      window.setTimeout(() => {
        setIsCopyToastVisible(false);
      }, 2200);
    }
  };

  const handleSubscribeClick = () => {
    navigate("/subscription");
  };

  const handleCreateRoomClick = async () => {
    if (chatRooms.length >= chatRoomLimit) {
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
      setIsRoomLimitModalOpen(true);
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
    <section className="relative h-[calc(100vh-64px)] overflow-hidden bg-[#090713]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

      <ChatSidebar
        isOpen={isNavOpen}
        files={chatRooms.map((room) => room.title)}
        onOpen={() => setIsNavOpen(true)}
        onClose={() => setIsNavOpen(false)}
        onCreateRoomClick={() => void handleCreateRoomClick()}
        onFileClick={handleChatRoomClick}
      />

      <main
        className={`relative z-0 flex h-[calc(100vh-64px)] min-h-0 flex-col items-center overflow-hidden px-14 pb-6 pt-16 transition-[margin] duration-200 ${contentMarginClass}`}
      >
        {hasConversation ? (
          <div ref={chatScrollRef} className="scrollbar-hide min-h-0 w-full flex-1 overflow-y-auto pb-28 pt-[70px]">
            <div className="flex w-full flex-col gap-8">
              {messages.map((message) =>
                message.role === "user" ? (
                  <ChatBubble key={message.id} align="right">
                    {message.content}
                  </ChatBubble>
                ) : (
                  <div key={message.id} className="flex w-full flex-col gap-3">
                    <ChatBubble
                      align="left"
                      className={`w-[605px] max-w-full whitespace-pre-line ${
                        message.isLoading ? "text-zinc-500" : ""
                      }`}
                    >
                      {message.content}
                    </ChatBubble>

                    {message.sources ? (
                      <div className="flex w-full justify-start pl-0 pr-[43%]">
                        <SourceList
                          sources={message.sources}
                          onSourceClick={(location) => void copySourceLocation(location)}
                        />
                      </div>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          </div>
        ) : (
          <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center">
            <div className="flex h-[220px] w-[360px] shrink-0 items-center justify-center pb-[14px] ">
              <img
                src="/character/ChatbotEmpty.png"
                alt="열공 티키"
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="text-center font-['SUIT'] text-[18px] font-normal leading-[180%] tracking-normal text-white">
              내 자료에서 답을 찾아드립니다.
            </h1>
            <p className="mt-2 text-center font-['SUIT'] text-[12px] font-normal leading-4 text-[#717379]">
              정확한 키워드를 몰라도 괜찮아요 !
              <br />
              대략적인 상황이나 기억나는 단서만 입력하면, 관련 자료를 찾아 답변해 드립니다.
            </p>
          </div>
        )}
        {isCopyToastVisible ? (
          <Toast
            variant="chat"
            message="✓ 복사 완료! 원문에서 붙여넣기(Ctrl+V)로 위치를 확인하세요."
          />
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-6 left-1/2 flex w-full -translate-x-1/2 justify-center"
        >
          <label
  className="
    flex
    h-12
    w-full
    max-w-[976px]
    items-center
    justify-between
    rounded-[10px]
    border-[2px]
    border-[#917DEC]
    bg-[#13151F]
    py-2.5
    pl-5
    pr-3
    shadow-[0_0_60px_0_rgba(145,125,236,0.7)]
  "
>
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="궁금한 점을 물어보세요"
              className="flex-1 bg-transparent font-['SUIT'] text-sm font-normal leading-5 text-violet-50 outline-none placeholder:text-[#42444C]"
            />
            <button
              type="submit"
              aria-label="질문 보내기"
              disabled={isSubmitting}
              className="flex size-7 items-center justify-center rounded-full bg-[#917DEC] text-[#090713] transition hover:opacity-85"
            >
              <ArrowUp size={18} strokeWidth={2.6} />
            </button>
          </label>
        </form>
      </main>

      <ChatLimitModal
        isOpen={isQuestionLimitModalOpen}
        title="무료 요금제는 하루에 5개까지 질문할 수 있어요."
        description={limitDescription}
        onClose={() => setIsQuestionLimitModalOpen(false)}
        onSubscribe={handleSubscribeClick}
      />
      <ChatLimitModal
        isOpen={isRoomLimitModalOpen}
        title="무료 요금제는 대화방을 10개까지 만들 수 있어요."
        description={limitDescription}
        onClose={() => setIsRoomLimitModalOpen(false)}
        onSubscribe={handleSubscribeClick}
      />
    </section>
  );
};

export default ChatbotPage;




