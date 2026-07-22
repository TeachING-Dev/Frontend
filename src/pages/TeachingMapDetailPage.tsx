import { useMemo, useState } from "react";
import TeachingMapDetailHeader from "../components/teachingMap/detail/TeachingMapDetailHeader";
import TeachingMapProgressSummary from "../components/teachingMap/detail/TeachingMapProgressSummary";
import TeachingMapStepList from "../components/teachingMap/detail/TeachingMapStepList";

export interface TeachingMapStep {
  id: number;
  tip: string;
  title: string;
  isCompleted: boolean;
}

const initialSteps: TeachingMapStep[] = [
  {
    id: 1,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title: "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: true,
  },
  {
    id: 2,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title: "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: false,
  },
  {
    id: 3,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title: "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: false,
  },
];

const TeachingMapDetailPage = () => {
  const [steps, setSteps] = useState<TeachingMapStep[]>(initialSteps);

  const completedCount = useMemo(() => {
    return steps.filter((step) => step.isCompleted).length;
  }, [steps]);

  const handleToggleCompletion = (stepId: number) => {
    setSteps((previousSteps) =>
      previousSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              isCompleted: !step.isCompleted,
            }
          : step,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-[#0B0A18] px-[160px] pb-[160px] pt-[40px]">
      <TeachingMapDetailHeader
        title="티칭맵 제목"
        description="티칭맵 설명"
        mode="Short-cut"
      />

      <section className="relative mt-[111px] w-[1000px]">
        <TeachingMapProgressSummary
          completedCount={completedCount}
          totalCount={steps.length}
        />

        <TeachingMapStepList
          steps={steps}
          onToggleCompletion={handleToggleCompletion}
        />
      </section>
    </main>
  );
};

export default TeachingMapDetailPage;