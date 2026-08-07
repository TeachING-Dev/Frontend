import { useNavigate } from "react-router-dom";

const tikiImage = "/myPage/tiki.svg";
const logoStarImage = "/myPage/logostar.svg";

const MyPageWithdrawalCompletePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[calc(100dvh-64px)] items-center justify-center px-[20px] lg:block lg:min-h-0 lg:px-[160px] lg:pb-[120px]">
      <section className="flex w-full flex-col items-center lg:mx-auto lg:mt-[300px] lg:w-[409px]">
        <img
          src="/Logo.png"
          alt="TeachING"
          className="mb-[100px] h-auto w-[215px] lg:hidden"
        />

        <div className="relative h-[170px] w-[170px] lg:h-[177px] lg:w-[174px]">
          <img
            src={tikiImage}
            alt=""
            className="h-full w-full object-contain"
          />

          <img
            src={logoStarImage}
            alt=""
            className="absolute right-[-8px] top-[-5px] h-[36px] w-[36px] object-contain lg:right-[-24px] lg:top-[-10px] lg:h-[42px] lg:w-[42px]"
          />
        </div>

        <h1 className="mt-[20px] w-full text-center text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-[#FAFAFA] lg:w-[409px] lg:text-[36px] lg:font-bold lg:tracking-[-1.08px]">
          탈퇴가 완료되었습니다.
          <br />
          다음에 또 만나요!
        </h1>

        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-[80px] hidden h-[60px] w-[544px] items-center justify-center rounded-[10px] bg-[#917DEC] p-[10px] font-['SUIT'] text-[20px] font-semibold leading-7 tracking-[-0.6px] text-white transition hover:bg-[#806BDB] lg:flex"
        >
          로그인 페이지로 이동
        </button>
      </section>
    </main>
  );
};

export default MyPageWithdrawalCompletePage;
