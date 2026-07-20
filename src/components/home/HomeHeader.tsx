import { ArrowRight } from "lucide-react";

const HomeHeader = () => {
  return (
    <section className="flex flex-col items-center text-center">
      {/* 상단 별 로고 */}
      <img
        src="/home-logo.png"
        alt=""
        aria-hidden="true"
        className="mb-5 h-[210px] w-[450px]"
      />

      {/* 서비스 설명 */}
      <p className="mt-[80px] text-center font-['SUIT'] text-[20px] font-semibold leading-[140%] tracking-[-0.6px] text-[#C1AEFF]">
        TeachING은 링크 속 내용을 분석하여 쉬운 학습 콘텐츠로
        정리해드려요.
      </p>

      {/* 검색창 */}
      <div className="relative mt-8 w-full">
        <input
          type="text"
          placeholder="저장할 url을 붙여넣어주세요."
          className="h-[82px] w-full rounded-[12px] border border-[#917DEC] bg-[#11111B] px-8 pr-24 font-['SUIT'] text-[18px] font-semibold text-white placeholder:text-[#4D4F59] outline-none shadow-[0_0_100px_rgba(145,125,236,0.35)]"
        />

        <button className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#917DEC] transition hover:bg-[#A996FF]">
          <ArrowRight
            size={24}
            strokeWidth={2.5}
            className="text-[#11111B]"
          />
        </button>
      </div>
    </section>
  );
};

export default HomeHeader;