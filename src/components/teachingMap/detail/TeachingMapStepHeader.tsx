import {
  useNavigate,
  useParams,
} from "react-router-dom";

interface TeachingMapStepHeaderProps {
  tip: string;
  contentId: number;
  isSourceAvailable: boolean;
}

const TeachingMapStepHeader = ({
  tip,
  contentId,
  isSourceAvailable,
}: TeachingMapStepHeaderProps) => {
  const navigate = useNavigate();

  const { teachingMapId } =
    useParams<{
      teachingMapId: string;
    }>();

  const handleOpenContent = () => {
    if (!teachingMapId || !isSourceAvailable) {
      return;
    }

    navigate(
      `/teaching-map/${teachingMapId}/${contentId}`,
    );
  };

  return (
    <div className="flex h-[67px] items-center justify-between gap-[20px] rounded-t-[10px] bg-[#C1AEFF] px-[29px] py-[10px]">
      <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-normal leading-[160%] tracking-[-0.15px] text-[#0B0A18]">
        {tip}
      </p>

      <button
        type="button"
        onClick={handleOpenContent}
        disabled={!isSourceAvailable}
        className="flex shrink-0 items-center gap-[4px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#0B0A18] disabled:cursor-default disabled:opacity-0"
      >
        <span>자세히 보기</span>

        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M7.5 5L12.5 10L7.5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default TeachingMapStepHeader;
