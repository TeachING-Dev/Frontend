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
      className="flex h-[56px] w-[568px] items-center rounded-[10px] bg-[#15151F] p-2"
      role="tablist"
      aria-label="티칭맵 학습 상태"
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
            className={`flex h-10 flex-1 items-center justify-center rounded-[5px] text-[18px] font-semibold leading-[150%] tracking-[-0.54px] transition-colors ${
              isActive
                ? "bg-[#917DEC] text-[#E8E8E8]"
                : "bg-transparent text-[#4A4B52] hover:text-[#8D8E94]"
            }`}
          >
            {tabItem.label}
          </button>
        );
      })}
    </div>
  );
};

export default TeachingMapTab;