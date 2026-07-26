import TeachingMapCompletionCheckbox from "./TeachingMapCompletionCheckbox";

interface TeachingMapStepContentProps {
  stepId: number;
  title: string;
  isCompleted: boolean;
  onToggleCompletion: (stepId: number) => void;
  isSourceAvailable: boolean;
}

const TeachingMapStepContent = ({
  stepId,
  title,
  isCompleted,
  onToggleCompletion,
  isSourceAvailable,
}: TeachingMapStepContentProps) => {
  return (
    <div className="flex h-[100px] items-center justify-between gap-[20px] rounded-b-[10px] bg-[#13151F] px-[29px] py-[10px]">
      <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[20px] font-medium leading-[160%] text-[#D0D0D2]">
        {title}
      </p>

      {isSourceAvailable && <TeachingMapCompletionCheckbox
        isCompleted={isCompleted}
        onToggle={() => onToggleCompletion(stepId)}
      />}
    </div>
  );
};

export default TeachingMapStepContent;
