import { useState } from "react";

type ArchiveDataSummaryProps = {
  summary: string;
};

const ArchiveDataSummary = ({
  summary,
}: ArchiveDataSummaryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] =
    useState(summary);

  const handleEdit = () => {
    setEditedSummary(summary);
    setIsEditing(true);
  };

  const handleReset = () => {
    setEditedSummary(summary);
  };

  const handleComplete = () => {
    console.log("수정 완료:", editedSummary);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSummary(summary);
    setIsEditing(false);
  };

  return (
    <section className="mb-[80px]">
      {/* 제목 */}
      <div className="mb-[30px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <img
            src="/AI.png"
            alt="AI 요약"
            aria-hidden="true"
            className="h-[24px] w-[24px] object-contain"
          />

          <h2 className="font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D0D0D2]">
            AI 요약
          </h2>
        </div>

        <button
          type="button"
          onClick={handleEdit}
          className="group flex h-[40px] w-[120px] items-center gap-[5px] rounded-[5px] bg-[#24232D] px-[12px] transition-colors hover:bg-[#3A3847]"
        >
          <img
            src="/edit-04.png"
            alt=""
            aria-hidden="true"
            className="h-[24px] w-[24px] object-contain"
          />

          <span className="font-['ABeeZee'] text-[16px] font-normal leading-[150%] tracking-[-0.48px] text-[#A1A1A5] transition-colors group-hover:text-white">
            편집하기
          </span>
        </button>
      </div>

      {/* 기존 요약 */}
      <div className="border-l-[2px] border-[#D9CDFF] pl-[30px]">
        <p className="font-['ABeeZee'] text-[20px] leading-[180%] tracking-[-0.4px] text-[#D9CDFF]">
          {summary}
        </p>
      </div>

      {/* 편집 창 */}
      {isEditing && (
        <div className="mt-[30px] rounded-[8px] bg-[#1F212A] px-[20px] py-[10px]">
          <div className="mb-[20px] flex items-center justify-between">
            <span className="rounded-[4px] bg-[#31323C] px-[10px] py-[5px] font-['ABeeZee'] text-[18px] font-normal leading-[150%] tracking-[-0.54px] text-[#717379]">
              직접 수정
            </span>

            <div className="flex items-center rounded-full border border-[#917DEC] bg-[#13151F] px-[6px] gap-[4px]">
              <button
                type="button"
                onClick={handleReset}
                aria-label="원래 내용으로 되돌리기"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/flip-left.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>

              <button
                type="button"
                onClick={handleComplete}
                aria-label="수정 완료"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/check.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>

              <button
                type="button"
                onClick={handleCancel}
                aria-label="수정 취소"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/cancel.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>
            </div>
          </div>

          <textarea
            value={editedSummary}
            onChange={(event) =>
              setEditedSummary(event.target.value)
            }
            rows={3}
            autoFocus
            className="w-full resize-none bg-transparent font-['ABeeZee'] text-[20px] italic font-normal leading-[160%] text-[#D9CDFF] outline-none"
          />
        </div>
      )}
    </section>
  );
};

export default ArchiveDataSummary;