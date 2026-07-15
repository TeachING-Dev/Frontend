import { Check, Globe, Sparkles } from "lucide-react";

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
    // 선택 모드일 때는 상세 페이지로 이동하지 않고
    // 해당 자료의 선택 상태만 변경
    if (isMoveMode) {
      onSelect?.();
      return;
    }

    // 일반 모드일 때는 상세 페이지 이동 이벤트 실행
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
      onClick={handleItemClick}
      onKeyDown={handleItemKeyDown}
      className={`relative flex h-[335px] w-full flex-col overflow-hidden rounded-[12px] border bg-[#2B2C35] transition ${
        isMoveMode
          ? "cursor-pointer"
          : "cursor-pointer"
      } ${
        isSelected
          ? "border-[#917DEC] shadow-[0_0_30px_rgba(134,111,241,0.3)]"
          : "border-[#3A3946]"
      }`}
    >
      {/* 선택 체크박스 */}
      {isMoveMode && (
        <div
          className={`absolute right-4 top-4 z-10 flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border transition ${
            isSelected
              ? "border-[#917DEC] bg-[#917DEC]"
              : "border-[#777482] bg-[#24242E]"
          }`}
        >
          {isSelected && (
            <Check
              size={22}
              strokeWidth={3}
              className="text-white"
            />
          )}
        </div>
      )}

      {/* 상단 정보 및 버튼 */}
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
              className="flex h-[40px] w-[180px] items-center justify-center gap-[8px] rounded-[8px] bg-[#917DEC] text-[20px] font-semibold text-white transition-colors hover:bg-[#7D66E8]"
            >
              <Sparkles
                size={22}
                className="shrink-0"
              />

              <span>AI 분석 결과</span>
            </button>

            <button
              type="button"
              onClick={handleOpenOriginal}
              className="flex h-[42px] w-[180px] items-center justify-center gap-[8px] rounded-[8px] bg-[#24242E] text-[20px] font-semibold text-white transition-colors hover:bg-[#343444]"
            >
              <Globe
                size={22}
                className="shrink-0"
              />

              <span>원문으로 이동</span>
            </button>
          </div>
        )}
      </div>

      {/* 저장된 데이터 내용 */}
      <div className="min-h-0 flex-1 rounded-t-[10px] bg-[#11121A] px-[30px] py-[40px]">
        <div className="mb-[20px] flex items-center gap-[15px]">
          <img
            src="/youtube-app-icon.png"
            alt="YouTube"
            className="h-[36px] w-[36px] shrink-0 object-contain"
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