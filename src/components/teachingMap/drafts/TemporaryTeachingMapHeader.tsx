import { useNavigate } from "react-router-dom";

const TemporaryTeachingMapHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => navigate("/teaching-map")}
        className="flex w-fit items-center gap-1 font-['SUIT'] text-[10px] font-normal leading-[14px] tracking-[-0.2px] text-[#A1A1A5] transition-colors hover:text-[#8D8E94] lg:text-[18px] lg:font-medium lg:leading-[27px] lg:tracking-[-0.54px] lg:text-[#5D5D5D]"
      >
        <img
          src="/return-button.svg"
          alt=""
          aria-hidden="true"
          className="h-[14px] w-[14px] shrink-0 lg:h-5 lg:w-5"
        />
        <span>티칭맵 목록으로 이동</span>
      </button>

      <h1 className="text-[24px] font-medium leading-[135%] tracking-[-0.6px] text-[#E8E8E8] lg:text-[36px] lg:font-bold lg:leading-[120%] lg:tracking-[-1.08px]">
        임시 보관함
      </h1>

      <p className="text-[13px] font-normal leading-[140%] tracking-[-0.26px] text-[#717379] lg:text-[24px] lg:font-semibold lg:leading-[150%] lg:tracking-[-0.72px]">
        학습 로드맵을 만들고 관리하세요.
      </p>
    </section>
  );
};

export default TemporaryTeachingMapHeader;
