import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const eventTermsContent = `수신 목적
이벤트·프로모션·할인 혜택 안내, 신규 서비스(티칭맵 기능 등) 출시 안내, 서비스 관련 공지 및 뉴스레터 발송

수집 항목
이메일, SMS(문자메시지)

수신 동의 유효 기간
동의일로부터 회원 탈퇴 또는 수신 거부(동의 철회) 시까지

수신 동의 철회 방법
서비스 내 [마이페이지 > 알림 설정] 또는 수신한 메일·SMS 내 수신거부 링크를 통해 언제든지 철회 가능

미동의 시 안내
본 동의는 선택사항이며, 동의하지 않아도 서비스 이용에 제한이 없습니다. 단, 동의하지 않을 경우 이벤트·혜택 정보를 받아보실 수 없습니다.`;

const TermsEventPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const signupState = location.state;

  return (
    <main className="min-h-screen overflow-y-auto bg-[#0B0A18] text-[#D0D0D2]">
      <section className="mx-auto w-full max-w-[1440px] px-[120px] py-0 max-md:px-4">
        <button
          type="button"
          onClick={() =>
            navigate("/signup", {
              state: {
                ...(signupState && typeof signupState === "object"
                  ? signupState
                  : {}),
                step: "terms",
              },
            })
          }
          className="mb-[25.5px] mt-[33px] flex items-center gap-[7.5px] font-['SUIT'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-[#E8E8E8] max-md:ml-1 max-md:mt-[72px] max-md:gap-2 max-md:text-[16px] max-md:font-normal max-md:tracking-[-0.48px]"
        >
          <img
            src="/Chevron-down.svg"
            alt=""
            aria-hidden="true"
            className="size-12 max-md:hidden"
          />
          <img
            src="/Chevron-down-mobile.svg"
            alt=""
            aria-hidden="true"
            className="hidden size-6 max-md:block"
          />
          <span>[TeachING] 이벤트·혜택 안내 수신 동의</span>
        </button>

        <div className="inline-flex self-stretch items-center justify-start gap-[7.5px] px-0 py-[7.5px] max-md:py-0">
          <h1 className="font-['SUIT'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-neutral-300 max-md:text-[16px] max-md:font-normal max-md:tracking-[-0.48px]">
            회사는 신규 기능, 이벤트, 할인 혜택, 프로모션 등의 정보를 이메일 및 SMS(문자메시지)로 안내해 드리고자 합니다.
          </h1>
        </div>

        <article className="mt-6 w-full pb-[72px] max-md:mt-5 max-md:pb-10">
          <p className="whitespace-pre-wrap font-['SUIT'] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-zinc-500 max-md:text-[13px] max-md:font-normal max-md:leading-[150%] max-md:tracking-[-0.39px]">
            {eventTermsContent}
          </p>
        </article>
      </section>
    </main>
  );
};

export default TermsEventPage;
