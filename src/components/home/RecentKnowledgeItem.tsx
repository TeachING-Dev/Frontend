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
    <div
      className="
        flex
        w-full
        items-center
        px-[10px]
        py-[10px]
        md:h-[60px]
        md:px-[30px]
        md:py-5
      "
    >
      <img
        src={iconSrc}
        alt=""
        className="
          mr-[clamp(10px,2.8vw,19px)]
          h-[clamp(24px,6.4vw,44px)]
          w-[clamp(24px,6.4vw,44px)]
          shrink-0
          rounded-full
          md:mr-[10px]
          md:h-[36px]
          md:w-[36px]
        "
      />

      <p
        className="
          min-w-0
          flex-1
          truncate
          text-left
          text-[clamp(14px,3.5vw,24px)]
          font-medium
          leading-[140%]
          tracking-[-0.42px]
          text-[#D0D0D2]
          md:text-[20px]
          md:font-semibold
          md:tracking-[-0.6px]
        "
      >
        {title}
      </p>

      <span
        className="
          ml-[clamp(10px,2.5vw,17px)]
          shrink-0
          text-[clamp(12px,3.2vw,22px)]
          font-medium
          leading-[150%]
          tracking-[-0.36px]
          text-[#42444C]
          md:ml-0
          md:mr-80
          md:text-[16px]
          md:tracking-[-0.48px]
        "
      >
        {savedAt}
      </span>

      <button
        type="button"
        onClick={onClick}
        aria-label={`${title} 상세 보기`}
        className="
          group
          flex
          h-[clamp(24px,5vw,34px)]
          w-[clamp(24px,5vw,34px)]
          shrink-0
          items-center
          justify-center
          rounded-full
          transition-colors
          md:h-8
          md:w-8
        "
      >
        <ChevronRight
          className="
            h-[clamp(20px,4.7vw,32px)]
            w-[clamp(20px,4.7vw,32px)]
            text-[#717379]
            transition-colors
            group-hover:text-[#917DEC]
            md:h-6
            md:w-6
          "
        />
      </button>
    </div>
  );
};

export default RecentKnowledgeItem;