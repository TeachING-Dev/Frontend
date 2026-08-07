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
    <div className="flex h-[48px] items-center justify-between gap-[10px] rounded-b-[5px] bg-[#13151F] px-[10px] py-[5px] lg:h-[100px] lg:gap-[20px] lg:rounded-b-[10px] lg:px-[29px]">
      <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12px] font-semibold leading-[18px] tracking-[-0.3px] text-[#D0D0D2] lg:text-[20px] lg:font-medium lg:leading-[160%] lg:tracking-normal">
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
