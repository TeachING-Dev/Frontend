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
  }> = [
    {
      value: "friendly",
      title: "친절한 선생님",
      imageSrc: "/myPage/firststar.png",
      imageAlt: "친절한 선생님 캐릭터",
    },
    {
      value: "strict",
      title: "엄격한 선생님",
      imageSrc: "/myPage/secondstar.png",
      imageAlt: "엄격한 선생님 캐릭터",
    },
    {
      value: "supportive",
      title: "응원하는 선생님",
      imageSrc: "/myPage/thirdstar.png",
      imageAlt: "응원하는 선생님 캐릭터",
    },
  ];

  return (
    <div className="flex items-start gap-[32px]">
      {teachingStyles.map((teachingStyle) => (
        <TeachingStyleCard
          key={teachingStyle.value}
          title={teachingStyle.title}
          imageSrc={teachingStyle.imageSrc}
          imageAlt={teachingStyle.imageAlt}
          selected={selectedStyle === teachingStyle.value}
          onSelect={() => onChange(teachingStyle.value)}
        />
      ))}
    </div>
  );
};

export default TeachingStyleSelector;