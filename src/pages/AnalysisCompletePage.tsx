import { useState } from "react";

import {
  updateMaterialSummary,
} from "../apis/material";

import AnalysisHeader from "../components/home/AnalysisHeader";
import AnalysisSidebar from "../components/home/AnalysisSidebar";
import AnalysisSummary from "../components/home/AnalysisSummary";
import AnalysisUrl from "../components/home/AnalysisUrl";

const folders = [
  {
    id: 1,
    name: "Backend",
  },
  {
    id: 2,
    name: "Frontend",
  },
  {
    id: 3,
    name: "React",
  },
  {
    id: 4,
    name: "Next.js",
  },
  {
    id: 5,
    name: "TypeScript",
  },
];

const AnalysisCompletePage = () => {
  const [selectedFolderId, setSelectedFolderId] =
    useState(1);

  const [summary, setSummary] = useState(
    "AI가 분석한 내용을 요약해드릴게요.",
  );

  const [isSaving, setIsSaving] =
    useState(false);

  // 현재는 예시값
  // 실제로는 분석 완료 API 응답이나 URL params에서 받아와야 함
  const materialId = 101;

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const result =
        await updateMaterialSummary(
          selectedFolderId,
          materialId,
          {
            shortSummary: summary,
          },
        );

      setSummary(result.shortSummary);

      console.log(
        "AI 요약 수정 성공:",
        result,
      );
    } catch (error) {
      console.error(
        "AI 요약 수정 실패:",
        error,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative py-[55px]">
      {/* 좌측 고정 사이드바 */}
      <AnalysisSidebar
        folders={folders}
        selectedFolderId={selectedFolderId}
        onFolderChange={
          setSelectedFolderId
        }
      />

      {/* 가운데 콘텐츠 */}
      <section className="mx-auto w-[1100px]">
        <div className="ml-[350px]">
          <div className="ml-[30px]">
            <AnalysisHeader
              date="2026-05-10"
              title="Node.js의 이벤트 루프(Event Loop) 완벽 이해하기"
              tags={[
                "여기는 10자의 태그",
                "여기는 10자의 태그",
                "여기는 10자의 태그",
                "여기는 10자의 태그",
              ]}
            />
          </div>

          {/* 본문 */}
          <div className="mt-[20px] flex flex-col gap-[20px]">
            <AnalysisUrl url="https://example.com" />

            <AnalysisSummary
              summary={summary}
              onSummaryChange={setSummary}
            />

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="
                h-[54px]
                w-full
                rounded-[5px]
                bg-[#917DEC]
                text-center
                text-[24px]
                font-semibold
                leading-[150%]
                tracking-[-0.72px]
                text-white
                transition-colors
                hover:bg-[#8269E7]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSaving
                ? "저장 중..."
                : "저장하기"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnalysisCompletePage;