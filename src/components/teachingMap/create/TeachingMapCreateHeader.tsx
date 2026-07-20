import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type TeachingMapType = "shortcut" | "deepDive";

type TeachingMapCreateHeaderProps = {
  teachingMapType: TeachingMapType;
};

const TYPE_LABELS: Record<TeachingMapType, string> = {
  shortcut: "Short-cut",
  deepDive: "Deep-dive",
};

const TeachingMapCreateHeader = ({
  teachingMapType,
}: TeachingMapCreateHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/teaching-map");
  };

  return (
    <header>
      <button
        type="button"
        onClick={handleBackClick}
        className="flex items-center gap-1 font-['SUIT_Variable'] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#5D5D5D] transition hover:text-[#8D8E94]"
      >
        <ArrowLeft
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <span>티칭맵 목록으로 이동</span>
      </button>

      <div className="mt-2 flex items-center gap-3">
        <h1 className="font-['SUIT_Variable'] text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#E8E8E8]">
          새 티칭맵 만들기
        </h1>

        <span className="flex h-[42px] items-center justify-center rounded-[5px] border border-[#917DEC] px-5 font-['SUIT_Variable'] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#917DEC]">
          {TYPE_LABELS[teachingMapType]}
        </span>

        <Pencil
          size={28}
          strokeWidth={2}
          className="text-[#2B2C35]"
          aria-hidden="true"
        />
      </div>
    </header>
  );
};

export default TeachingMapCreateHeader;