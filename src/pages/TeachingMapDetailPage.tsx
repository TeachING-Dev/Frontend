import {
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import TeachingMapDetailHeader from "../components/teachingMap/detail/TeachingMapDetailHeader";
import TeachingMapProgressSummary from "../components/teachingMap/detail/TeachingMapProgressSummary";
import TeachingMapStepList from "../components/teachingMap/detail/TeachingMapStepList";
import { ARCHIVE_FOLDERS } from "../constants/archiveFolders";

export interface TeachingMapStep {
  id: number;
  tip: string;
  title: string;
  isCompleted: boolean;
  isSourceAvailable?: boolean;
}

const initialSteps: TeachingMapStep[] = [
  {
    id: 1,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title:
      "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: true,
  },
  {
    id: 2,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title:
      "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: false,
  },
  {
    id: 3,
    tip: "다 읽지 마세요. 중간의 ‘결론’ 섹션만 보면 됩니다.",
    title:
      "Node.js 비동기 I/O 모델과 싱글 스레드의 작동 원리",
    isCompleted: false,
  },
];

const TeachingMapDetailPage = () => {
  const { teachingMapId = "unknown" } =
    useParams<{ teachingMapId: string }>();
  const createdTeachingMap = useMemo(() => {
    const savedTeachingMap = sessionStorage.getItem(
      `teaching-map:${teachingMapId}`,
    );
    if (!savedTeachingMap) {
      return null;
    }

    try {
      return JSON.parse(savedTeachingMap) as {
        title: string;
        description: string;
        type: "shortcut" | "deepDive";
        folderId: number | null;
      };
    } catch {
      return null;
    }
  }, [teachingMapId]);
  const [
    teachingMapTitle,
    setTeachingMapTitle,
  ] = useState(
    createdTeachingMap?.title ??
      "티칭맵 제목",
  );

  const [
    teachingMapDescription,
    setTeachingMapDescription,
  ] = useState(
    createdTeachingMap?.description ??
      "티칭맵 설명",
  );

  const [steps, setSteps] =
    useState<TeachingMapStep[]>(() => {
      const savedSteps = sessionStorage.getItem(
        `teaching-map-progress:${teachingMapId}`,
      );
      if (!savedSteps) {
        const folderMaterialCount =
          ARCHIVE_FOLDERS.find(
            (folder) =>
              folder.id ===
              createdTeachingMap?.folderId,
          )?.count ?? initialSteps.length;
        const stepCount =
          createdTeachingMap?.type === "deepDive"
            ? folderMaterialCount
            : Math.min(
                5,
                Math.max(3, folderMaterialCount),
              );

        return Array.from(
          { length: stepCount },
          (_, index) => ({
            ...initialSteps[
              index % initialSteps.length
            ],
            id: index + 1,
            isCompleted: index === 0,
          }),
        );
      }

      try {
        return JSON.parse(savedSteps) as TeachingMapStep[];
      } catch {
        return initialSteps;
      }
    });

  const completedCount = useMemo(() => {
    return steps.filter(
      (step) => step.isCompleted,
    ).length;
  }, [steps]);

  const handleTeachingMapSave = (
    title: string,
    description: string,
  ) => {
    setTeachingMapTitle(title);
    setTeachingMapDescription(
      description,
    );

    console.log("수정된 티칭맵:", {
      title,
      description,
    });

    // TODO: 티칭맵 수정 API 연결
  };

  const handleToggleCompletion = (
    stepId: number,
  ) => {
    setSteps((previousSteps) =>
      {
        const nextSteps = previousSteps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              ...(step.isSourceAvailable === false
                ? { isCompleted: step.isCompleted }
                : {
              isCompleted:
                !step.isCompleted,
                  }),
            }
          : step,
        );
        sessionStorage.setItem(
          `teaching-map-progress:${teachingMapId}`,
          JSON.stringify(nextSteps),
        );
        return nextSteps;
      },
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0A18]">
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0",
          "h-[195px]",
          "bg-[linear-gradient(180deg,rgba(134,111,241,0)_0%,rgba(134,111,241,0.3)_100%)]",
        ].join(" ")}
      />

      <div className="relative z-10 px-[160px] pb-[160px] pt-[40px]">
        <TeachingMapDetailHeader
          title={teachingMapTitle}
          description={
            teachingMapDescription
          }
          mode={
            createdTeachingMap?.type ===
            "deepDive"
              ? "Deep-dive"
              : "Short-cut"
          }
          onSave={
            handleTeachingMapSave
          }
        />

        <section className="relative mt-[111px] w-[1000px]">
          <TeachingMapProgressSummary
            completedCount={
              completedCount
            }
            totalCount={steps.length}
          />

          <TeachingMapStepList
            steps={steps}
            onToggleCompletion={
              handleToggleCompletion
            }
          />
        </section>
      </div>
    </main>
  );
};

export default TeachingMapDetailPage;
