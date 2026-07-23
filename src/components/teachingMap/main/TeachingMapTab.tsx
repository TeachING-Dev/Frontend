type LearningStatus =
  | "inProgress"
  | "completed";

interface TeachingMapTabProps {
  learningStatus: LearningStatus;
  onLearningStatusChange: (
    status: LearningStatus,
  ) => void;
}

const TeachingMapTab = ({
  learningStatus,
  onLearningStatusChange,
}: TeachingMapTabProps) => {
  const tabItems: {
    label: string;
    value: LearningStatus;
  }[] = [
    {
      label: "학습 중",
      value: "inProgress",
    },
    {
      label: "학습 완료",
      value: "completed",
    },
  ];

  return (
    <div
      role="tablist"
      aria-label="티칭맵 학습 상태"
      className="flex h-[56px] w-[568px] items-center rounded-[10px] bg-[#15151F] p-2"
    >
      {tabItems.map((tabItem) => {
        const isActive =
          learningStatus === tabItem.value;

        return (
          <button
            key={tabItem.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() =>
              onLearningStatusChange(
                tabItem.value,
              )
            }
            className={[
              "flex h-10 flex-1 items-center justify-center",
              "rounded-[5px]",
              "font-['SUIT'] text-[18px] font-medium not-italic",
              "leading-[27px] tracking-[-0.54px]",
              "transition-colors duration-150",
              isActive
                ? "bg-[#917DEC] text-[#F5F2FF]"
                : "bg-transparent text-[#42444C] hover:text-[#8D8E94]",
            ].join(" ")}
          >
            {tabItem.label}
          </button>
        );
      })}
    </div>
  );
};

export default TeachingMapTab;