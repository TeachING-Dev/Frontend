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
    <section className="w-full overflow-hidden rounded-[10px] border border-[#1F212A] bg-[#1F212A] lg:rounded-[12px] lg:border-0">
      {/* 상단 제목 영역 */}
      <div className="flex h-[40px] items-center justify-between px-[20px] lg:h-[60px]">
        <h2 className="font-['SUIT_Variable'] text-[16px] font-normal leading-[24px] text-[#FAFAFA] lg:text-[24px] lg:font-bold lg:leading-[150%] lg:tracking-[-0.24px]">
          AI 상세 분석
        </h2>

        <button
          type="button"
          onClick={handleEdit}
          className="group flex h-[25px] w-[80px] items-center justify-center gap-[5px] rounded-[5px] bg-[#13151F] px-[5px] transition-colors hover:bg-[#3A3847] lg:h-[40px] lg:w-[120px] lg:px-[12px]"
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

      {/* 상세 분석 내용 */}
      <div className="rounded-t-[10px] bg-[#13151F] px-[20px] pb-[10px] pt-[20px] lg:px-[30px] lg:py-[30px]">
        {/* 편집하기 클릭 시 추가되는 부분 */}
        {isEditing && (
          <div className="mb-[10px] flex items-center justify-between lg:mb-[20px]">
            <span className="rounded-[4px] bg-[#31323C] px-[5px] py-[3px] font-['ABeeZee'] text-[10px] font-normal leading-[15px] text-[#717379] lg:px-[10px] lg:py-[5px] lg:text-[18px] lg:leading-[150%] lg:tracking-[-0.54px]">
              직접 수정
            </span>

            <div className="flex items-center gap-[2px] rounded-full border border-[#917DEC] bg-[#13151F] px-[4px] lg:gap-[4px] lg:px-[6px]">
              {/* 되돌리기 */}
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

              {/* 완료 */}
              <button
                type="button"
                onClick={handleComplete}
                disabled={isSaving}
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

              {/* 취소 */}
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
        )}

        {isEditing ? (
          <textarea
            value={editedFullAnalysis}
            onChange={(event) => {
              setEditedFullAnalysis(event.target.value);
            }}
            className="field-sizing-content w-full resize-none overflow-hidden bg-transparent text-[13px] font-normal leading-[19.5px] text-[#A1A1A5] outline-none lg:text-[20px] lg:font-medium lg:leading-[160%]"
          />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="mb-[10px] mt-[16px] font-['SUIT_Variable'] text-[13px] font-bold leading-[19.5px] text-[#D0D0D2] first:mt-0 lg:mb-[16px] lg:mt-[24px] lg:text-[24px] lg:leading-[160%]">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="mb-[8px] mt-[16px] font-['SUIT_Variable'] text-[13px] font-bold leading-[19.5px] text-[#D0D0D2] first:mt-0 lg:mb-[12px] lg:mt-[24px] lg:text-[22px] lg:leading-[160%]">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mb-[8px] mt-[14px] font-['SUIT_Variable'] text-[13px] font-semibold leading-[19.5px] text-[#D0D0D2] first:mt-0 lg:mb-[10px] lg:mt-[20px] lg:text-[20px] lg:leading-[160%]">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-[8px] text-[13px] font-normal leading-[19.5px] text-[#A1A1A5] last:mb-0 lg:mb-[12px] lg:text-[20px] lg:font-medium lg:leading-[160%]">
                  {children}
                </p>
              ),

              strong: ({ children }) => (
                <strong className="font-bold text-[#D0D0D2]">
                  {children}
                </strong>
              ),

              ul: ({ children }) => (
                <ul className="mb-[10px] list-disc space-y-[4px] pl-[18px] text-[#A1A1A5] lg:mb-[16px] lg:space-y-[8px] lg:pl-[28px]">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="mb-[10px] list-decimal space-y-[4px] pl-[18px] text-[#A1A1A5] lg:mb-[16px] lg:space-y-[8px] lg:pl-[28px]">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="text-[13px] font-normal leading-[19.5px] lg:text-[20px] lg:font-medium lg:leading-[160%]">
                  {children}
                </li>
              ),

              blockquote: ({
                children,
              }) => (
                <blockquote className="my-[10px] border-l-[2px] border-[#917DEC] pl-[10px] text-[#A1A1A5] lg:my-[16px] lg:border-l-[3px] lg:pl-[16px]">
                  {children}
                </blockquote>
              ),

              code: ({ children }) => (
                <code className="rounded-[4px] bg-[#2B2C35] px-[4px] py-[1px] text-[12px] text-[#D9CDFF] lg:px-[6px] lg:py-[2px] lg:text-[18px]">
                  {children}
                </code>
              ),

              img: ({ alt, ...props }) => (
                <img
                  {...props}
                  alt={alt ?? ""}
                  className="h-auto max-w-full lg:max-w-[700px]"
                />
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
