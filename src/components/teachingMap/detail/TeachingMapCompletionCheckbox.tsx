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
      className="flex h-[48px] w-[48px] shrink-0 items-center justify-center"
    >
      <img
        src={
          isCompleted
            ? "/SelfCheck.svg"
            : "/emptySelfCheck.svg"
        }
        alt=""
        className="h-[42px] w-[42px] object-contain"
      />
    </button>
  );
};

export default TeachingMapCompletionCheckbox;