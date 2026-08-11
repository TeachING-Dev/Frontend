import { useEffect, useRef, useState } from "react";

type ArchiveDataSummaryProps = {
  summary: string;
  onUpdateSummary: (summary: string) => Promise<void>;
};

const ArchiveDataSummary = ({
  summary,
  onUpdateSummary,
}: ArchiveDataSummaryProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedSummary, setEditedSummary] = useState(summary);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";

    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    if (isEditing) {
      resizeTextarea();
    }
  }, [isEditing, editedSummary]);

  const handleEdit = () => {
    setEditedSummary(summary);
    setIsEditing(true);
  };

  const handleReset = () => {
    setEditedSummary(summary);
  };

  const handleComplete = async () => {
    try {
      await onUpdateSummary(editedSummary);

      setIsEditing(false);
    } catch (error) {
      console.error("요약 수정 실패:", error);
    }
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  return (
    <section className="mb-[20px] w-full lg:mb-[80px]">
      {/* 제목 */}
      <div className="mb-[10px] flex items-center justify-between lg:mb-[30px]">
        <div className="flex items-center gap-[5px] lg:gap-[8px]">
          <img
            src="/icon/AI.svg"
            alt="AI 요약"
            aria-hidden="true"
            className="h-4 w-4 object-contain lg:h-[24px] lg:w-[24px]"
          />

          <h2 className="font-['SUIT_Variable'] text-[16px] font-normal leading-[24px] text-[#FAFAFA] lg:text-[24px] lg:font-bold lg:leading-[150%] lg:tracking-[-0.24px]">
            AI 요약
          </h2>
        </div>

        <button
          type="button"
          onClick={handleEdit}
          className="group flex h-[25px] w-[80px] items-center justify-center gap-[5px] rounded-[5px] bg-[#24232D] px-[5px] transition-colors hover:bg-[#3A3847] lg:h-[40px] lg:w-[120px] lg:px-[12px]"
        >
          <img
            src="/icon/edit2.png"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 object-contain lg:h-[24px] lg:w-[24px]"
          />

          <span className="text-[10px] font-normal leading-[15px] text-[#A1A1A5] transition-colors group-hover:text-white lg:text-[16px] lg:leading-[150%] lg:tracking-[-0.48px]">
            편집하기
          </span>
        </button>
      </div>

      {/* 기존 요약 */}
      <div className="ml-[16px] border-l-[2px] border-[#D9CDFF] pl-[10px] lg:ml-0 lg:pl-[30px]">
        <p className="text-[12px] font-semibold leading-[18px] text-[#D9CDFF] lg:text-[20px] lg:font-medium lg:leading-[160%]">
          {summary}
        </p>
      </div>

      {/* 편집 창 */}
      {isEditing && (
        <div className="mt-[10px] rounded-[8px] bg-[#1F212A] px-[10px] py-[10px] lg:mt-[30px] lg:px-[20px]">
          <div className="mb-[10px] flex items-center justify-between lg:mb-[20px]">
            <span className="rounded-[4px] bg-[#31323C] px-[5px] py-[3px] font-['ABeeZee'] text-[10px] font-normal leading-[15px] text-[#717379] lg:px-[10px] lg:py-[5px] lg:text-[18px] lg:leading-[150%] lg:tracking-[-0.54px]">
              직접 수정
            </span>

            <div className="flex items-center gap-[2px] rounded-full border border-[#917DEC] bg-[#13151F] px-[4px] lg:gap-[4px] lg:px-[6px]">
              <button
                type="button"
                onClick={handleReset}
                aria-label="원래 내용으로 되돌리기"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20 lg:h-[35px] lg:w-[35px]"
              >
                <img
                  src="/icon/flip-left.png"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 object-contain lg:h-[24px] lg:w-[24px]"
                />
              </button>

              <button
                type="button"
                onClick={handleComplete}
                aria-label="수정 완료"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20 lg:h-[35px] lg:w-[35px]"
              >
                <img
                  src="/icon/check.png"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 object-contain lg:h-[24px] lg:w-[24px]"
                />
              </button>

              <button
                type="button"
                onClick={handleCancel}
                aria-label="수정 취소"
                className="flex h-[24px] w-[24px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20 lg:h-[35px] lg:w-[35px]"
              >
                <img
                  src="/icon/cancel.png"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 object-contain lg:h-[24px] lg:w-[24px]"
                />
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={editedSummary}
            onChange={(event) => setEditedSummary(event.target.value)}
            rows={1}
            autoFocus
            className="w-full resize-none overflow-hidden bg-transparent text-[12px] font-semibold leading-[18px] text-[#D9CDFF] outline-none lg:text-[20px] lg:font-medium lg:leading-[160%]"
          />
        </div>
      )}
    </section>
  );
};

export default ArchiveDataSummary;
