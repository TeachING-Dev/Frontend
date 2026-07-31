import { ChevronRight } from "lucide-react";

type RecentKnowledgeItemProps = {
  title: string;
  savedAt: string;
  iconSrc: string;
  onClick?: () => void;
};

const RecentKnowledgeItem = ({
  title,
  savedAt,
  iconSrc,
  onClick,
}: RecentKnowledgeItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-[60px] w-full items-center px-[30px] py-5 transition-colors hover:bg-white/5"
    >
      <img
        src={iconSrc}
        alt=""
        className="mr-[10px] h-[36px] w-[36px] shrink-0 rounded-full"
      />

      <p className="flex-1 truncate text-left text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#D0D0D2]">
        {title}
      </p>

      <span className="mr-80 shrink-0 text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#42444C]">
        {savedAt}
      </span>

      <ChevronRight
        size={24}
        className="shrink-0 text-[#717379] transition-colors group-hover:text-[#917DEC]"
      />
    </button>
  );
};

export default RecentKnowledgeItem;