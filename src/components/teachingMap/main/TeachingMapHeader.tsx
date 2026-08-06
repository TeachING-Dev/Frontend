import { useNavigate } from "react-router-dom";

const leftPointIcon = "/myPage/leftpoint.svg";

const TeachingMapHeader = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/teaching-map/create");
  };

  const handleTemporarySaveClick = () => {
    navigate("/teaching-map/drafts");
  };

  return (
    <section className="relative mb-[10px] flex items-start justify-between lg:mb-10">
      <button
        type="button"
        aria-label="알림으로 이동"
        onClick={() => navigate("/notifications")}
        className="absolute right-0 top-[-44px] flex h-6 w-6 items-center justify-center lg:hidden"
      >
        <img
          src="/icon/Alarm.svg"
          alt=""
          aria-hidden="true"
          className="h-6 w-6 object-contain"
        />
      </button>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-[5px]">
          <button
            type="button"
            aria-label="홈으로 이동"
            onClick={() => navigate("/")}
            className="hidden h-12 w-12 shrink-0 items-center justify-center lg:flex"
          >
            <img
              src={leftPointIcon}
              alt=""
              aria-hidden="true"
              className="h-12 w-12"
            />
          </button>

          <h1 className="text-[24px] font-medium leading-[150%] tracking-[-0.6px] text-[#FAFAFA] capitalize lg:text-[36px] lg:font-bold lg:leading-[120%] lg:tracking-[-1.08px] lg:text-[#E8E8E8]">
            티칭맵
          </h1>
        </div>

        <p className="whitespace-nowrap text-[14px] font-normal leading-[150%] tracking-[-0.35px] text-[#A1A1A5] lg:ml-[53px] lg:text-[20px] lg:font-semibold lg:tracking-[-0.72px] lg:text-[#717379]">
          학습 로드맵을 만들고 관리하세요.
        </p>
      </div>

      <div className="mt-[2px] flex items-center gap-1 lg:mt-0 lg:gap-3">
        <button
          type="button"
          onClick={handleCreateClick}
          className="flex h-8 w-auto items-center justify-center gap-0 rounded-[5px] bg-[#917DEC] px-[5px] py-1 font-['SUIT'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#FAFAFA] transition hover:bg-[#8068E2] lg:h-10 lg:w-[147px] lg:gap-1 lg:px-2 lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.54px] lg:text-[#F5F2FF]"
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
          className="flex h-8 w-auto items-center justify-center gap-0 rounded-[5px] bg-[#2B2C35] px-[5px] py-1 font-['SUIT'] text-[12px] font-medium leading-[135%] tracking-[-0.3px] text-[#717379] transition hover:bg-[#35363F] lg:h-10 lg:w-[147px] lg:gap-1 lg:px-2 lg:text-[18px] lg:leading-[27px] lg:tracking-[-0.54px] lg:text-[#8D8E94]"
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