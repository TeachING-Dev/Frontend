import type { TeachingMapStep } from "../../../pages/TeachingMapDetailPage";
import TeachingMapStepItem from "./TeachingMapStepItem";

interface TeachingMapStepListProps {
  steps: TeachingMapStep[];
  onToggleCompletion: (stepId: number) => void;
}

const TeachingMapStepList = ({
  steps,
  onToggleCompletion,
}: TeachingMapStepListProps) => {
  return (
    <div className="flex flex-col gap-[80.69px]">
      {steps.map((step, index) => (
        <TeachingMapStepItem
          key={step.id}
          step={step}
          isLast={index === steps.length - 1}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </div>
  );
};

export default TeachingMapStepList;