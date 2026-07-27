import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type TeachingMapType =
  | "shortcut"
  | "deepDive";

type TeachingMapCreateHeaderProps = {
  backPath?: string;
  backLabel?: string;
};

const TeachingMapCreateHeader = ({
  backPath = "/teaching-map",
  backLabel = "티칭맵 목록으로 이동",
}: TeachingMapCreateHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(backPath);
  };

  return (
    <header>
      <button
        type="button"
        onClick={handleBackClick}
        className="flex items-center gap-1 font-['SUIT'] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#5D5D5D] transition-colors hover:text-[#8D8E94]"
      >
        <ArrowLeft
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
        />

        <span>{backLabel}</span>
      </button>
    </header>
  );
};

export default TeachingMapCreateHeader;
