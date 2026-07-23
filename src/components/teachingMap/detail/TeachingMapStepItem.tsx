import type { TeachingMapStep } from "../../../pages/TeachingMapDetailPage";

import TeachingMapStepContent from "./TeachingMapStepContent";
import TeachingMapStepHeader from "./TeachingMapStepHeader";

interface TeachingMapStepItemProps {
  step: TeachingMapStep;
  isLast: boolean;
  onToggleCompletion: (
    stepId: number,
  ) => void;
}

const TeachingMapStepItem = ({
  step,
  isLast,
  onToggleCompletion,
}: TeachingMapStepItemProps) => {
  return (
    <article
      className={[
        "relative flex h-[167px] items-start gap-[25px]",
        "transition-opacity duration-200",
        step.isCompleted
          ? "opacity-100"
          : "opacity-50",
      ].join(" ")}
    >
      <div className="relative flex w-[36px] shrink-0 flex-col items-center">
        <div className="z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#917DEC] text-[20px] font-medium leading-[160%] text-[#0B0A18]">
          {step.id}
        </div>

        {!isLast && (
          <svg
            aria-hidden="true"
            className="mt-[8px] shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="1"
            height="174"
            viewBox="0 0 1 174"
            fill="none"
          >
            <path
              d="M0.5 0V173.691"
              stroke="#C1AEFF"
              strokeDasharray="5 5"
            />
          </svg>
        )}
      </div>

      <div className="h-[167px] w-[939px] overflow-hidden rounded-[10px] border border-[#C1AEFF] shadow-[0_0_50px_0_rgba(145,125,236,0.5)]">
        <TeachingMapStepHeader
          tip={step.tip}
          contentId={step.id}
        />

        <TeachingMapStepContent
          stepId={step.id}
          title={step.title}
          isCompleted={
            step.isCompleted
          }
          onToggleCompletion={
            onToggleCompletion
          }
        />
      </div>
    </article>
  );
};

export default TeachingMapStepItem;