import {
  useNavigate,
  useParams,
} from "react-router-dom";

interface TeachingMapContentHeaderProps {
  title: string;
  createdAt: string;
  originalUrl?: string;
}

const formatCreatedDate = (createdAt: string) => {
  if (!createdAt) {
    return "";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TeachingMapContentHeader = ({
  title,
  createdAt,
  originalUrl = "",
}: TeachingMapContentHeaderProps) => {
  const navigate = useNavigate();

  const { teachingMapId } =
    useParams<{
      teachingMapId: string;
      contentId: string;
    }>();

  const handleBackToTeachingMap = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    if (!teachingMapId) {
      navigate("/teaching-map");
      return;
    }

    navigate(
      `/teaching-map/${teachingMapId}`,
    );
  };

  return (
    <header className="px-[30px] max-lg:px-[16px]">
      <button
        type="button"
        onClick={
          handleBackToTeachingMap
        }
        className="flex items-center gap-[4px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#717379] max-lg:text-[10px] max-lg:leading-[15px]"
      >
        <img
          src="/return-button.svg"
          alt=""
          aria-hidden="true"
          className="h-6 w-6 shrink-0 max-lg:h-[14px] max-lg:w-[14px]"
        />

        <span>
          티칭맵으로 돌아가기
        </span>
      </button>

      <p className="mt-[8px] text-[18px] font-normal italic leading-[18px] tracking-[-0.54px] text-[#B8B9BC] max-lg:text-[12px] max-lg:leading-[15px]">
        {formatCreatedDate(createdAt)}
      </p>

      <h1 className="mt-[8px] break-words text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#FAFAFA] max-lg:text-[20px] max-lg:leading-[30px]">
        {title}
      </h1>

      <div className="mt-[8px] hidden justify-end max-lg:flex">
        <button
          type="button"
          disabled={!originalUrl}
          onClick={() => originalUrl && window.open(originalUrl, "_blank", "noopener,noreferrer")}
          className="flex h-[31px] w-[106px] items-center justify-center gap-[5px] rounded-[5px] bg-[#1F212A] p-[5px] disabled:opacity-50"
        >
          <img src="/globe.svg" alt="" className="h-[16px] w-[16px]" />
          <span className="whitespace-nowrap text-[14px] leading-[21px] text-[#F5F2FF]">원문으로 이동</span>
        </button>
      </div>
    </header>
  );
};

export default TeachingMapContentHeader;
