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
        className="flex items-center gap-1 font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#A1A1A5] transition-colors hover:text-[#8D8E94] lg:text-[18px] lg:font-medium lg:leading-[27px] lg:tracking-[-0.54px] lg:text-[#5D5D5D]"
      >
        <img src="/return-button.svg" alt="" aria-hidden="true" className="h-[14px] w-[14px] lg:h-5 lg:w-5" />

        <span>{backLabel}</span>
      </button>
    </header>
  );
};

export default TeachingMapCreateHeader;
