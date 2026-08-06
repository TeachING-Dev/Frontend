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
        "relative flex h-[80px] items-start gap-[10px] lg:h-[167px] lg:gap-[25px]",
        "transition-opacity duration-200",
        step.isCompleted
          ? "opacity-100"
          : "opacity-50",
      ].join(" ")}
    >
      <div className="relative flex w-4 shrink-0 flex-col items-center lg:w-[36px]">
        <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full bg-[#917DEC] px-[5.5px] text-[10px] font-medium leading-[14px] text-[#0B0A18] lg:h-[36px] lg:w-[36px] lg:px-0 lg:text-[20px] lg:leading-[160%]">
          {step.order}
        </div>

        {!isLast && (
          <svg
            aria-hidden="true"
            className="mt-[5px] h-[79px] shrink-0 lg:mt-[8px] lg:h-[174px]"
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

      <div className="h-[80px] min-w-0 flex-1 overflow-hidden rounded-[5px] border border-[#C1AEFF] shadow-[0_0_50px_0_rgba(145,125,236,0.5)] lg:h-[167px] lg:w-[939px] lg:flex-none lg:rounded-[10px]">
        <TeachingMapStepHeader
          tip={step.tip}
          contentId={step.id}
          isSourceAvailable={
            step.isSourceAvailable !== false
          }
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
          isSourceAvailable={
            step.isSourceAvailable !== false
          }
        />
      </div>
    </article>
  );
};

export default TeachingMapStepItem;
