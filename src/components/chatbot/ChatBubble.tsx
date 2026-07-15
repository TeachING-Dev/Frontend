import type { ReactNode } from "react";

type ChatBubbleProps = {
  align: "left" | "right";
  children: ReactNode;
  className?: string;
};

const ChatBubble = ({ align, children, className = "" }: ChatBubbleProps) => {
  const justifyClass = align === "right" ? "justify-end pl-[48%] pr-1" : "justify-start pl-0 pr-[43%]";

  return (
    <div className={`flex w-full ${justifyClass}`}>
      <div
        className={`rounded-[5px] bg-zinc-900 px-4 py-3 font-['SUIT_Variable'] text-sm font-normal leading-5 text-white ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatBubble;
