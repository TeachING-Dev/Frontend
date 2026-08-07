import TeachingStyleCard from "./TeachingStyleCard";

export type TeachingStyle =
  | "friendly"
  | "strict"
  | "supportive";

interface TeachingStyleSelectorProps {
  selectedStyle: TeachingStyle;
  onChange: (style: TeachingStyle) => void;
}

const TeachingStyleSelector = ({
  selectedStyle,
  onChange,
}: TeachingStyleSelectorProps) => {
  const teachingStyles: Array<{
    value: TeachingStyle;
    title: string;
    imageSrc: string;
    imageAlt: string;
    description: string[];
  }> = [
    {
      value: "friendly",
      title: "친절한 선생님",
      imageSrc: "/myPage/firststar.png",
      imageAlt: "친절한 선생님 캐릭터",
      description: [
        "어려운 개념도 쉽고 따뜻하게 설명해 주며,",
        "지치지 않고 학습을 이어갈 수 있도록",
        "늘 온화한 태도로 곁을 지켜줍니다.",
      ],
    },
    {
      value: "strict",
      title: "엄격한 선생님",
      imageSrc: "/myPage/secondstar.png",
      imageAlt: "엄격한 선생님 캐릭터",
      description: [
        "흐트러짐 없는 완벽한 학습을 도와주는",
        "냉철하고 확실한 가이드예요.",
        "핵심만 콕 짚어 명확하게 피드백해 줍니다.",
      ],
    },
    {
      value: "supportive",
      title: "응원하는 선생님",
      imageSrc: "/myPage/thirdstar.png",
      imageAlt: "응원하는 선생님 캐릭터",
      description: [
        "지치고 힘들 때 든든한 에너지가 되어주는",
        "나만의 페이스메이커예요.",
        "긍정적인 자극과 응원으로 배움의 즐거움과",
        "자신감을 불어넣어 줍니다.",
      ],
    },
  ];

  return (
    <div className="w-full lg:flex lg:w-auto lg:items-start lg:gap-[32px]">
      <div className="mb-[47px] grid grid-cols-3 gap-[10px] lg:hidden">
        {teachingStyles.map((teachingStyle) => (
          <button
            key={teachingStyle.value}
            type="button"
            onClick={() => onChange(teachingStyle.value)}
            aria-pressed={selectedStyle === teachingStyle.value}
            className={[
              "flex min-w-0 items-center justify-center rounded-[5px] px-[5px] py-[10px] text-[13px] font-medium leading-[150%] tracking-[-0.325px]",
              selectedStyle === teachingStyle.value
                ? "border-[0.7px] border-[#917DEC] bg-[#13151F] text-[#F5F2FF] shadow-[inset_0_0_20px_rgba(145,125,236,0.6)]"
                : "bg-[#1F212A] text-[#717379]",
            ].join(" ")}
          >
            {teachingStyle.title}
          </button>
        ))}
      </div>

      {teachingStyles.map((teachingStyle) => (
        <div
          key={teachingStyle.value}
          className={
            selectedStyle === teachingStyle.value
              ? "block lg:block"
              : "hidden lg:block"
          }
        >
          <TeachingStyleCard
            title={teachingStyle.title}
            imageSrc={teachingStyle.imageSrc}
            imageAlt={teachingStyle.imageAlt}
            description={teachingStyle.description}
            selected={selectedStyle === teachingStyle.value}
            onSelect={() => onChange(teachingStyle.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default TeachingStyleSelector;
