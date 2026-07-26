import {
  useNavigate,
  useParams,
} from "react-router-dom";

const TeachingMapContentHeader = () => {
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

      <p className="mt-[8px] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#B8B9BC]">
        2026-05-10
      </p>

      <h1 className="mt-[8px] text-[24px] font-bold leading-[36px] tracking-[-0.24px] text-[#FAFAFA]">
        Node.js의 이벤트 루프(Event Loop)
        완벽 이해하기
      </h1>
    </header>
  );
};

export default TeachingMapContentHeader;
