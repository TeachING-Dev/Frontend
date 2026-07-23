import { useNavigate } from "react-router-dom";

const TeachingMapHeader = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/teaching-map/create");
  };

  const handleTemporarySaveClick = () => {
    navigate("/teaching-map/drafts");
  };

  return (
    <section className="mb-10 flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-[36px] font-bold leading-[120%] tracking-[-1.08px] text-[#E8E8E8]">
          티칭맵
        </h1>

        <p className="text-[24px] font-semibold leading-[150%] tracking-[-0.72px] text-[#717379]">
          학습 로드맵을 만들고 관리하세요.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCreateClick}
          className="flex h-10 w-[147px] items-center justify-center gap-1 rounded-[5px] bg-[#917DEC] px-2 py-1 font-['SUIT'] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#F5F2FF] transition hover:bg-[#8068E2]"
        >
          <img
            src="/add.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0 object-contain"
          />

          <span>새 티칭맵</span>
        </button>

        <button
          type="button"
          onClick={handleTemporarySaveClick}
          className="flex h-10 w-[147px] items-center justify-center gap-1 rounded-[5px] bg-[#2B2C35] px-2 py-1 font-['SUIT'] text-[18px] font-medium leading-[27px] tracking-[-0.54px] text-[#8D8E94] transition hover:bg-[#35363F]"
        >
          <img
            src="/bookmark.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0 object-contain"
          />

          <span>임시저장</span>
        </button>
      </div>
    </section>
  );
};

export default TeachingMapHeader;
