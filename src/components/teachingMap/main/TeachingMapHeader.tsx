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
    <section className="mb-5 flex items-start justify-between lg:mb-10">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-[5px]">
          <h1 className="text-[24px] font-medium leading-[135%] tracking-[-0.6px] text-[#E8E8E8] lg:text-[36px] lg:font-bold lg:leading-[120%] lg:tracking-[-1.08px]">
            티칭맵
          </h1>
        </div>

        <p className="text-[13px] font-normal leading-[140%] tracking-[-0.26px] text-[#717379] lg:text-[20px] lg:font-semibold lg:leading-[150%] lg:tracking-[-0.72px]">
          학습 로드맵을 만들고 관리하세요.
        </p>
      </div>

      <div className="flex items-center gap-[5px] lg:gap-3">
        <button
          type="button"
          onClick={handleCreateClick}
          className="flex h-[26px] w-[70px] items-center justify-center gap-[2px] rounded-[5px] bg-[#917DEC] p-[5px] font-['SUIT'] text-[11px] font-medium leading-4 tracking-[-0.22px] text-[#F5F2FF] transition hover:bg-[#8068E2] lg:h-10 lg:w-[147px] lg:gap-1 lg:px-2 lg:py-1 lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.54px]"
        >
          <img
            src="/add.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 shrink-0 object-contain lg:h-6 lg:w-6"
          />

          <span>새 티칭맵</span>
        </button>

        <button
          type="button"
          onClick={handleTemporarySaveClick}
          className="flex h-[26px] w-[70px] items-center justify-center gap-[2px] rounded-[5px] bg-[#2B2C35] p-[5px] font-['SUIT'] text-[11px] font-medium leading-4 tracking-[-0.22px] text-[#8D8E94] transition hover:bg-[#35363F] lg:h-10 lg:w-[147px] lg:gap-1 lg:px-2 lg:py-1 lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.54px]"
        >
          <img
            src="/bookmark.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-4 shrink-0 object-contain lg:h-6 lg:w-6"
          />

          <span>임시저장</span>
        </button>
      </div>
    </section>
  );
};

export default TeachingMapHeader;
