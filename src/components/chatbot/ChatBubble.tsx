import { Fragment } from "react";
import type { ReactNode } from "react";

type ChatBubbleProps = {
  align: "left" | "right";
  children: ReactNode;
  className?: string;
};

const renderFormattedText = (children: ReactNode) => {
  if (typeof children !== "string") {
    return children;
  }

  return children.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
};

const ChatBubble = ({ align, children, className = "" }: ChatBubbleProps) => {
  const justifyClass =
    align === "right"
      ? "justify-end pl-[48%] pr-1"
      : "justify-start pl-0 pr-[43%]";
  const formattedChildren = renderFormattedText(children);

  return (
    <div className={`flex w-full ${justifyClass}`}>
      {align === "left" ? (
        <div className="rounded-[10px] bg-gradient-to-r from-[#FFFFFF]/20 to-[#4E4E4E]/30 p-[1px]">
          <div
            className={`rounded-[9px] bg-[#13151F] px-4 py-3 font-['SUIT'] text-[15px] font-normal leading-[160%] text-white ${className}`}
          >
            {formattedChildren}
          </div>
        </div>
      ) : (
        <div
          className={`rounded-[10px] bg-[#13151F] px-4 py-3 font-['SUIT'] text-[15px] font-normal leading-[160%] text-white ${className}`}
        >
          {formattedChildren}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
