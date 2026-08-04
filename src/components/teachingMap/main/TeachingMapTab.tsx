type LearningStatus = "inProgress" | "completed";

interface TeachingMapTabProps {
  learningStatus: LearningStatus;
  onLearningStatusChange: (status: LearningStatus) => void;
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
      className="flex h-10 w-full items-center rounded-[5px] bg-[#13151F] p-[5px] lg:h-[56px] lg:w-[568px] lg:rounded-[10px] lg:bg-[#15151F] lg:p-2"
    >
      {tabItems.map((tabItem) => {
        const isActive = learningStatus === tabItem.value;

        return (
          <button
            key={tabItem.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onLearningStatusChange(tabItem.value)}
            className={[
              "flex h-[30px] w-20 flex-none items-center justify-center lg:h-10 lg:flex-1",
              "rounded-[5px]",
              "font-['SUIT'] text-[14px] font-normal not-italic lg:text-[18px] lg:font-medium",
              "leading-[150%] tracking-[-0.35px] lg:leading-[27px] lg:tracking-[-0.54px]",
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