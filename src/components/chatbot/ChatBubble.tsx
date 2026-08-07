import type { ReactNode } from "react";

import { renderFormattedText } from "../../utils/renderFormattedText";

type ChatBubbleProps = {
  align: "left" | "right";
  children: ReactNode;
  className?: string;
};

const ChatBubble = ({ align, children, className = "" }: ChatBubbleProps) => {
  const justifyClass =
    align === "right"
      ? "justify-end pl-[48%] pr-1 max-md:px-5"
      : "justify-start pl-0 pr-[43%] max-md:px-5";
  const formattedChildren = renderFormattedText(children);

  return (
    <div className={`flex w-full ${justifyClass}`}>
      {align === "left" ? (
        <div className="rounded-[10px] bg-gradient-to-r from-[#FFFFFF]/20 to-[#4E4E4E]/30 p-[1px]">
          <div
            className={`rounded-[9px] bg-[#13151F] px-4 py-3 font-['SUIT'] text-[15px] font-normal leading-[160%] text-white max-md:text-[14px] max-md:font-normal ${className}`}
          >
            {formattedChildren}
          </div>
        </div>
      ) : (
        <div className="rounded-[10px] bg-gradient-to-r from-[#FFFFFF]/20 to-[#4E4E4E]/30 p-[1px]">
          <div
            className={`rounded-[9px] bg-[#13151F] px-4 py-3 font-['SUIT'] text-[15px] font-normal leading-[160%] text-white max-md:text-[14px] max-md:font-normal ${className}`}
          >
            {formattedChildren}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
