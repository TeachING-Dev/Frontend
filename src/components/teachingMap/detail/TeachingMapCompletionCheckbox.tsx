interface TeachingMapCompletionCheckboxProps {
  isCompleted: boolean;
  onToggle: () => void;
}

const TeachingMapCompletionCheckbox = ({
  isCompleted,
  onToggle,
}: TeachingMapCompletionCheckboxProps) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isCompleted}
      aria-label={isCompleted ? "완료 취소" : "완료 처리"}
      onClick={onToggle}
      className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-[48px] lg:w-[48px]"
    >
      <img
        src={
          isCompleted
            ? "/SelfCheck.svg"
            : "/emptySelfCheck.svg"
        }
        alt=""
        className="h-6 w-6 object-contain lg:h-[42px] lg:w-[42px]"
      />
    </button>
  );
};

export default TeachingMapCompletionCheckbox;
