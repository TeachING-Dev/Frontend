import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArchiveDataAnalysisProps = {
  fullAnalysis: string;
  onEdit?: () => void;
  onUpdateAnalysis?: (
    fullAnalysis: string,
  ) => Promise<void>;
};

const ArchiveDataAnalysis = ({
  fullAnalysis,
  onEdit,
  onUpdateAnalysis,
}: ArchiveDataAnalysisProps) => {
  const [isEditing, setIsEditing] =
    useState(false);

  const [
    editedFullAnalysis,
    setEditedFullAnalysis,
  ] = useState(fullAnalysis);

  const [isSaving, setIsSaving] =
    useState(false);

  const handleEdit = () => {
    setEditedFullAnalysis(
      fullAnalysis,
    );
    setIsEditing(true);
    onEdit?.();
  };

  const handleReset = () => {
    setEditedFullAnalysis(
      fullAnalysis,
    );
  };

  const handleComplete = async () => {
    try {
      setIsSaving(true);

      await onUpdateAnalysis?.(
        editedFullAnalysis,
      );

      setIsEditing(false);
    } catch (error) {
      console.error(
        "AI 상세 분석 저장 실패:",
        error,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedFullAnalysis(
      fullAnalysis,
    );
    setIsEditing(false);
  };

  return (
    <section className="w-full overflow-hidden rounded-[12px] border border-[#3A3946] bg-[#1F212A]">
      {/* 상단 제목 영역 */}
      <div className="flex h-[60px] items-center justify-between px-[20px]">
        <h2 className="font-['SUIT_Variable'] text-[24px] font-bold leading-[150%] tracking-[-0.24px] text-[#D9CDFF]">
          AI 상세 분석
        </h2>

        <button
          type="button"
          onClick={handleEdit}
          className="group flex h-[40px] w-[120px] items-center justify-center gap-[5px] rounded-[5px] bg-[#13151F] px-[12px] transition-colors hover:bg-[#3A3847]"
        >
          <img
            src="/icon/edit2.png"
            alt=""
            aria-hidden="true"
            className="h-[24px] w-[24px] object-contain"
          />

          <span className="text-[16px] font-normal leading-[150%] tracking-[-0.48px] text-[#A1A1A5] transition-colors group-hover:text-white">
            편집하기
          </span>
        </button>
      </div>

      {/* 상세 분석 내용 */}
      <div className="rounded-t-[10px] bg-[#13151F] px-[30px] py-[30px]">
        {/* 편집하기 클릭 시 추가되는 부분 */}
        {isEditing && (
          <div className="mb-[20px] flex items-center justify-between">
            <span className="rounded-[4px] bg-[#31323C] px-[10px] py-[5px] font-['ABeeZee'] text-[18px] font-normal leading-[150%] tracking-[-0.54px] text-[#717379]">
              직접 수정
            </span>

            <div className="flex items-center gap-[4px] rounded-full border border-[#917DEC] bg-[#13151F] px-[6px]">
              {/* 되돌리기 */}
              <button
                type="button"
                onClick={handleReset}
                aria-label="원래 내용으로 되돌리기"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/icon/flip-left.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>

              {/* 완료 */}
              <button
                type="button"
                onClick={handleComplete}
                disabled={isSaving}
                aria-label="수정 완료"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/icon/check.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>

              {/* 취소 */}
              <button
                type="button"
                onClick={handleCancel}
                aria-label="수정 취소"
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full transition-colors hover:bg-[#917DEC]/20"
              >
                <img
                  src="/icon/cancel.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[24px] w-[24px] object-contain"
                />
              </button>
            </div>
          </div>
        )}

        {isEditing ? (
          <textarea
            value={editedFullAnalysis}
            onChange={(event) =>
              setEditedFullAnalysis(
                event.target.value,
              )
            }
            className="min-h-[400px] w-full resize-none bg-transparent text-[20px] font-medium leading-[160%] text-[#A1A1A5] outline-none"
          />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-[16px] mt-[24px] font-['SUIT_Variable'] text-[24px] font-bold leading-[160%] text-[#D0D0D2] first:mt-0">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="mb-[12px] mt-[24px] font-['SUIT_Variable'] text-[22px] font-bold leading-[160%] text-[#D0D0D2] first:mt-0">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-[10px] mt-[20px] font-['SUIT_Variable'] text-[20px] font-semibold leading-[160%] text-[#D0D0D2] first:mt-0">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-[12px] text-[20px] font-medium leading-[160%] text-[#A1A1A5] last:mb-0">
                  {children}
                </p>
              ),

              strong: ({ children }) => (
                <strong className="font-bold text-[#D0D0D2]">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="mb-[16px] list-disc space-y-[8px] pl-[28px] text-[#A1A1A5]">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-[16px] list-decimal space-y-[8px] pl-[28px] text-[#A1A1A5]">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="text-[20px] font-medium leading-[160%]">
                  {children}
                </li>
              ),

              blockquote: ({
                children,
              }) => (
                <blockquote className="my-[16px] border-l-[3px] border-[#917DEC] pl-[16px] text-[#A1A1A5]">
                  {children}
                </blockquote>
              ),

              code: ({ children }) => (
                <code className="rounded-[4px] bg-[#2B2C35] px-[6px] py-[2px] text-[18px] text-[#D9CDFF]">
                  {children}
                </code>
              ),
            }}
          >
            {fullAnalysis}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
};

export default ArchiveDataAnalysis;