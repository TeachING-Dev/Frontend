import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import ChatBubble from "../components/chatbot/ChatBubble";
import ChatLimitModal from "../components/chatbot/ChatLimitModal";
import ChatSidebar from "../components/chatbot/ChatSidebar";
import SourceList from "../components/chatbot/SourceList";
import Toast from "../components/common/Toast";
import type { SourceItem } from "../components/chatbot/SourceList";

const mockFiles = ["파일 이름", "파일 이름", "파일 이름", "파일 이름", "파일 이름"];

const mockSources: SourceItem[] = [
  {
    label: "내가 저장한 자료 제목(15행)",
    location: "내가 저장한 자료 제목 - 15행",
  },
  {
    label: "내가 저장한 자료 제목 (05:20)",
    location: "내가 저장한 자료 제목 - 05:20",
  },
];

const limitDescription = "요금제를 업그레이드하고 무제한으로 티칭잉을 만들어 보세요!";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  isLoading?: boolean;
};

const createMockAnswer = (question: string) =>
  `관련 자료를 찾았습니다.\n'${question}'에 대한 내용을 내 자료에서 확인해보니, 사용자의 목적과 이전 맥락을 반영해 답변을 조정하는 방식과 관련이 있습니다. 핵심은 AI가 모든 정보를 자동으로 사용하는 것이 아니라, 사용자가 허용한 맥락만 선택적으로 반영한다는 점입니다.`;

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRoomLimitModalOpen, setIsRoomLimitModalOpen] = useState(false);
  const [isQuestionLimitModalOpen, setIsQuestionLimitModalOpen] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isCopyToastVisible, setIsCopyToastVisible] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const contentMarginClass = isNavOpen ? "ml-[204px]" : "ml-20";
  const hasConversation = messages.length > 0;

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextQuestion = question.trim();

    if (!nextQuestion) {
      return;
    }

    if (questionCount >= 5) {
      setIsQuestionLimitModalOpen(true);
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
    setQuestionCount((prevCount) => prevCount + 1);
    setQuestion("");

    window.setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === loadingMessage.id
            ? {
                ...message,
                content: createMockAnswer(nextQuestion),
                sources: mockSources,
                isLoading: false,
              }
            : message,
        ),
      );
    }, 700);
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

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden bg-[#090713]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-violet-500/0 to-violet-500/30" />

      <ChatSidebar
        isOpen={isNavOpen}
        files={mockFiles}
        onOpen={() => setIsNavOpen(true)}
        onClose={() => setIsNavOpen(false)}
        onCreateRoomClick={() => setIsRoomLimitModalOpen(true)}
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
                src="/ChatbotEmpty.png"
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




