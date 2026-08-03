import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getTeachingMap,
  toggleTeachingMapStep,
  updateTeachingMap,
} from "../apis/teachingMap";
import TeachingMapDetailHeader from "../components/teachingMap/detail/TeachingMapDetailHeader";
import TeachingMapProgressSummary from "../components/teachingMap/detail/TeachingMapProgressSummary";
import TeachingMapStepList from "../components/teachingMap/detail/TeachingMapStepList";

export interface TeachingMapStep {
  id: number;
  order: number;
  tip: string;
  title: string;
  isCompleted: boolean;
  isSourceAvailable?: boolean;
}

const TeachingMapDetailPage = () => {
  const { teachingMapId } = useParams<{ teachingMapId: string }>();
  const parsedTeachingMapId = Number(teachingMapId);
  const hasValidTeachingMapId =
    Number.isInteger(parsedTeachingMapId) && parsedTeachingMapId > 0;

  const [teachingMapTitle, setTeachingMapTitle] = useState("");
  const [teachingMapDescription, setTeachingMapDescription] = useState("");
  const [teachingMapType, setTeachingMapType] = useState<
    "shortcut" | "deepDive"
  >("shortcut");
  const [steps, setSteps] = useState<TeachingMapStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [toggleError, setToggleError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [togglingStepIds, setTogglingStepIds] = useState<number[]>([]);

  useEffect(() => {
    if (!hasValidTeachingMapId) {
      return;
    }

    let isCancelled = false;

    const loadTeachingMap = async () => {
      try {
        setLoadError("");
        const teachingMap = await getTeachingMap(parsedTeachingMapId);

        if (isCancelled) {
          return;
        }

        setTeachingMapTitle(teachingMap.title);
        setTeachingMapDescription(teachingMap.description);
        setTeachingMapType(
          teachingMap.type === "DEEPDIVE" ? "deepDive" : "shortcut",
        );
        setSteps(
          [...(teachingMap.steps ?? [])]
            .sort((firstStep, secondStep) => firstStep.order - secondStep.order)
            .map((step) => ({
              id: step.stepId,
              order: step.order,
              tip: step.tip,
              title: step.stepTitle,
              isCompleted: step.isFinished,
            })),
        );
      } catch (error) {
        if (!isCancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "티칭맵 상세 정보를 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadTeachingMap();

    return () => {
      isCancelled = true;
    };
  }, [hasValidTeachingMapId, parsedTeachingMapId]);

  const completedCount = useMemo(
    () => steps.filter((step) => step.isCompleted).length,
    [steps],
  );

  const handleTeachingMapSave = async (title: string, description: string) => {
    try {
      setSaveError("");
      const updated = await updateTeachingMap(parsedTeachingMapId, {
        title,
        description,
      });
      setTeachingMapTitle(updated.title ?? title);
      setTeachingMapDescription(updated.description ?? description);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "티칭맵 제목과 설명을 저장하지 못했습니다.",
      );
      throw error;
    }
  };

  const handleToggleCompletion = async (stepId: number) => {
    const targetStep = steps.find((step) => step.id === stepId);

    if (
      !targetStep ||
      targetStep.isSourceAvailable === false ||
      togglingStepIds.includes(stepId)
    ) {
      return;
    }

    setToggleError("");
    setTogglingStepIds((previousIds) => [...previousIds, stepId]);

    try {
      const result = await toggleTeachingMapStep(parsedTeachingMapId, stepId);

      setSteps((previousSteps) =>
        previousSteps.map((step) =>
          step.id === result.stepId
            ? {
                ...step,
                isCompleted: result.isCompleted,
              }
            : step,
        ),
      );
    } catch (error) {
      setToggleError(
        error instanceof Error
          ? error.message
          : "스텝 완료 상태를 변경하지 못했습니다.",
      );
    } finally {
      setTogglingStepIds((previousIds) =>
        previousIds.filter((id) => id !== stepId),
      );
    }
  };

  if (!hasValidTeachingMapId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0A18] font-suit text-[18px] text-[#F07A7A]">
        유효하지 않은 티칭맵입니다.
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0A18] font-suit text-[18px] text-[#C1AEFF]">
        티칭맵을 불러오는 중입니다.
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0A18] font-suit text-[18px] text-[#F07A7A]">
        {loadError}
      </main>
    );
  }

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
          description={teachingMapDescription}
          mode={teachingMapType === "deepDive" ? "Deep-dive" : "Short-cut"}
          onSave={handleTeachingMapSave}
        />

        {saveError && (
          <p role="alert" className="mt-4 text-[16px] text-[#F07A7A]">
            {saveError}
          </p>
        )}

        <section className="relative mt-[111px] w-[1000px]">
          {toggleError && (
            <p role="alert" className="mb-4 text-[16px] text-[#F07A7A]">
              {toggleError}
            </p>
          )}

          <TeachingMapProgressSummary
            completedCount={completedCount}
            totalCount={steps.length}
          />

          <TeachingMapStepList
            steps={steps}
            onToggleCompletion={handleToggleCompletion}
          />
        </section>
      </div>
    </main>
  );
};

export default TeachingMapDetailPage;