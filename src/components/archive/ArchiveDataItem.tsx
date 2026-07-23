import { Globe } from "lucide-react";

type ArchiveDataItemProps = {
  tag: string;
  date: string;
  title: string;
  description: string;
  isMoveMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  onAiAnalysis?: () => void;
  onOpenOriginal?: () => void;
};

const ArchiveDataItem = ({
  tag,
  date,
  title,
  description,
  isMoveMode = false,
  isSelected = false,
  onSelect,
  onClick,
  onAiAnalysis,
  onOpenOriginal,
}: ArchiveDataItemProps) => {
  const handleItemClick = () => {
    if (isMoveMode) {
      onSelect?.();
      return;
    }

    onClick?.();
  };

  const handleItemKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();
    handleItemClick();
  };

  const handleAiAnalysis = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    onAiAnalysis?.();
  };

  const handleOpenOriginal = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    onOpenOriginal?.();
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={
        isMoveMode ? isSelected : undefined
      }
      onClick={handleItemClick}
      onKeyDown={handleItemKeyDown}
      className={`relative flex h-[335px] w-full cursor-pointer flex-col overflow-hidden rounded-[12px] border bg-[#2B2C35] transition ${
        isSelected
          ? "border-[#917DEC] shadow-[inset_0_0_20px_0_rgba(145,125,236,0.6)]"
          : "border-[#3A3946]"
      }`}
    >
      <div className="flex h-[75px] shrink-0 items-center justify-between px-[29px]">
        <div className="flex items-center gap-8 font-['ABeeZee'] text-[18px] font-normal italic leading-[150%] tracking-[-0.54px] text-[#F5F2FF]">
          <span>#{tag}</span>
          <span>{date}</span>
        </div>

        {!isMoveMode && (
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={handleAiAnalysis}
              className="flex h-[40px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] transition-colors hover:bg-[#7D66E8]"
            >
              <img
                src="/AI.png"
                alt=""
                aria-hidden="true"
                className="h-[22px] w-[22px] shrink-0 object-contain"
              />

              <span className="font-['SUIT'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA]">
                AI 분석 결과
              </span>
            </button>

            <button
              type="button"
              onClick={handleOpenOriginal}
              className="flex h-[42px] w-[164px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] transition-colors hover:bg-[#343444]"
            >
              <Globe
                size={22}
                className="shrink-0 text-[#FAFAFA]"
              />

              <span className="font-['SUIT'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA]">
                원문으로 이동
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 rounded-t-[10px] bg-[#11121A] px-[30px] py-[40px]">
        <div className="mb-[20px] flex items-center gap-[15px]">
          <img
            src="/youtube-app-icon.png"
            alt="YouTube"
            className="h-[36px] w-[36px] shrink-0 rounded-full object-contain"
          />

          <h2 className="truncate font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            {title}
          </h2>
        </div>

        <p className="line-clamp-3 whitespace-pre-line font-['ABeeZee'] text-[20px] font-normal leading-[160%] text-[#898A8F]">
          {description}
        </p>
      </div>
    </article>
  );
};

export default ArchiveDataItem;