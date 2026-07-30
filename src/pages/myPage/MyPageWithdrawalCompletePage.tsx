import { useNavigate } from "react-router-dom";

const tikiImage = "/myPage/tiki.svg";
const logoStarImage = "/myPage/logostar.svg";

const MyPageWithdrawalCompletePage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-full justify-center px-[160px] pb-[120px]">
      <section className="mt-[300px] flex w-[409px] flex-col items-center">
        <div className="relative h-[177px] w-[174px]">
          <img
            src={tikiImage}
            alt=""
            className="h-[177px] w-[174px] object-contain"
          />

          <img
            src={logoStarImage}
            alt=""
            className="absolute right-[-24px] top-[-10px] h-[42px] w-[42px] object-contain"
          />
        </div>

        <h1 className="mt-[20px] w-[409px] text-center text-[36px] font-bold leading-[150%] tracking-[-1.08px] text-[#FAFAFA]">
          탈퇴가 완료되었습니다.
          <br />
          다음에 또 만나요!
        </h1>

        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          className="mt-[136px] flex h-[60px] w-[544px] items-center justify-center rounded-[10px] bg-[#917DEC] p-[10px] font-['SUIT'] text-[20px] font-semibold leading-7 tracking-[-0.6px] text-white transition hover:bg-[#806BDB]"
        >
          로그인 페이지로 이동
        </button>
      </section>
    </main>
  );
};

export default MyPageWithdrawalCompletePage;