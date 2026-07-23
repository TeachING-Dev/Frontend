const tikiImage = "/myPage/tiki.svg";
const logoStarImage = "/myPage/logostar.svg";

const MyPageWithdrawalCompletePage = () => {
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
      </section>
    </main>
  );
};

export default MyPageWithdrawalCompletePage;