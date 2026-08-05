import {
  useNavigate,
  useParams,
} from "react-router-dom";

interface TeachingMapContentHeaderProps {
  title: string;
  createdAt: string;
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
    <header className="px-[30px]">
      <button
        type="button"
        onClick={
          handleBackToTeachingMap
        }
        className="flex items-center gap-[4px] text-[16px] font-normal leading-[24px] tracking-[-0.48px] text-[#717379]"
      >
        <img
          src="/return-button.svg"
          alt=""
          aria-hidden="true"
          className="h-6 w-6 shrink-0"
        />

        <span>
          티칭맵으로 돌아가기
        </span>
      </button>

      <p className="mt-[8px] text-[18px] font-normal italic leading-[18px] tracking-[-0.54px] text-[#B8B9BC]">
        {formatCreatedDate(createdAt)}
      </p>

      <h1 className="mt-[8px] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#FAFAFA]">
        {title}
      </h1>
    </header>
  );
};

export default TeachingMapContentHeader;
