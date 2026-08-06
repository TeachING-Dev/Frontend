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
    <div className="flex h-[32px] items-center justify-between gap-[8px] rounded-t-[5px] bg-[#C1AEFF] px-[10px] py-[5px] lg:h-[67px] lg:gap-[20px] lg:rounded-t-[10px] lg:px-[29px] lg:py-[10px]">
      <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#0B0A18] lg:text-[15px] lg:leading-[160%] lg:tracking-[-0.15px]">
        {tip}
      </p>

      <button
        type="button"
        onClick={handleOpenContent}
        disabled={!isSourceAvailable}
        className="flex shrink-0 items-center gap-[2px] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#0B0A18] disabled:cursor-default disabled:opacity-0 lg:gap-[4px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.48px]"
      >
        <span>자세히 보기</span>

        <svg
          aria-hidden="true"
          width="10"
          height="10"
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
