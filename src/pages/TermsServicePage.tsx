import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const serviceTermsContent = `제 1장
제 1 조 (목적)
이 약관은 "TeachING(이하 "서비스")"의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
① "TeachING"란 회원이 웹페이지 등의 콘텐츠 URL을 입력하여 요약·저장하고, 이를 "티칭맵" 형태로 학습·관리할 수 있도록 제공하는 일체의 제반 서비스를 의미합니다.
② "회원"이란 이 약관에 동의하고 카카오, 구글 등 소셜 계정을 통해 회사와 서비스 이용계약을 체결한 자를 말합니다.
③ "티칭맵"이란 회원이 저장한 콘텐츠를 학습할 수 있도록 서비스가 제공하는 학습 콘텐츠 단위를 말합니다.
④ "닉네임"이란 회원 식별을 위해 회원이 설정하는 명칭을 말합니다.

제3조 (약관의 효력 및 변경)
① 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
② 회사는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있으며, 개정 시 적용일자 및 개정사유를 명시하여 적용일자 최소 7일(회원에게 불리한 변경의 경우 30일) 전부터 공지합니다.
③ 회원이 개정 약관에 동의하지 않는 경우 회원은 이용계약을 해지할 수 있으며, 공지 후에도 별도의 의사표시 없이 서비스를 계속 이용하는 경우 개정 약관에 동의한 것으로 봅니다.

제 2장

제4조 (회원가입)
① 이용계약은 이용자가 약관 내용에 동의하고 카카오 또는 구글 소셜 로그인을 통해 정보를 제공한 후, 닉네임을 설정하고 회원가입을 신청함에 대해 회사가 이를 승낙함으로써 체결됩니다.
② 회사는 다음 각 호에 해당하는 신청에 대해서는 승낙을 거부하거나 사후에 이용계약을 해지할 수 있습니다.
③ 만 14세 미만 아동이 가입을 신청하는 경우
④ 실명이 아니거나 타인의 정보를 도용한 경우
⑤ 이미 회원으로 등록된 자가 중복 신청하는 경우
⑥ 서비스 운영을 고의로 방해할 목적으로 신청한 경우

제5조 (개인정보의 보호)
회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며, 개인정보의 수집·이용·보호에 관한 사항은 별도로 공지하는 "개인정보처리방침"에 따릅니다.

제 3장 계약당사자의 의무

제5조 (개인정보의 보호) 회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며, 개인정보의 수집·이용·보호에 관한 사항은 별도로 공지하는 "개인정보처리방침"에 따릅니다.
①  회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며, 개인정보의 수집·이용·보호에 관한 사항은 별도로 공지하는 "개인정보처리방침"에 따릅니다.

제6조 (회사의 의무)
회사는 관련 법령과 이 약관이 금지하는 행위를 하지 않으며, 계속적·안정적으로 서비스를 제공하기 위해 노력합니다.
회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위한 보안시스템을 구축합니다.

제7조 (회사의 의무) 회원은 다음 행위를 하여서는 안 됩니다.
타인의 정보 도용 또는 허위 정보 등록
회사가 게시한 정보의 무단 변경, 회사 및 제3자의 저작권 등 지식재산권 침해
회사 및 제3자의 명예를 손상시키거나 업무를 방해하는 행위
저장한 콘텐츠(URL, 요약본 등)를 본래 목적 외 상업적으로 이용하거나 제3자에게 제공하는 행위
기타 불법적이거나 부당한 행위

제4장 서비스의 이용

제8조 (서비스의 제공 및 변경)
① 회사는 다음과 같은 서비스를 제공합니다.
② URL 기반 콘텐츠 저장 및 요약 서비스
③ 티칭맵을 통한 학습 콘텐츠 제공 서비스
④ 저장한 지식의 보관함(라이브러리) 관리 서비스
⑤ 기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스
⑥ 회사는 운영상, 기술상의 필요에 따라 제공하는 서비스의 전부 또는 일부를 변경할 수 있으며, 이 경우 변경 내용 및 적용일자를 사전에 공지합니다.
제9조 (서비스 이용시간)
서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. 다만, 시스템 점검 등 필요한 경우 서비스 제공을 일시 중단할 수 있습니다.
제10조 (서비스 이용의 제한 및 중지)
회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 회사는 사전 통지 후 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다.

제5장 계약해지 및 이용제한

제11조 (회원 탈퇴 및 자격 상실)
회원은 언제든지 서비스 내 탈퇴 기능을 통해 이용계약 해지(탈퇴)를 신청할 수 있으며, 회사는 관련 법령이 정하는 바에 따라 이를 즉시 처리합니다.
회원 탈퇴 시 회원이 저장한 콘텐츠 및 개인정보는 관련 법령 및 개인정보처리방침에 따라 처리됩니다.

제6장 기타
제12조 (저작권의 귀속 및 이용제한)
회사가 작성한 저작물에 대한 저작권 및 기타 지식재산권은 회사에 귀속합니다.
회원이 서비스 내에 저장·게시한 콘텐츠의 저작권은 원저작자 또는 회원 본인에게 있으며, 회사는 서비스 제공 목적 범위 내에서만 이를 이용합니다.
제13조 (면책조항)
회사는 천재지변, 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
회사는 회원이 저장한 원본 URL 콘텐츠의 정확성, 신뢰성에 대해 보증하지 않으며, 이로 인해 발생한 손해에 대해 책임을 지지 않습니다.
제14조 (분쟁해결 및 재판관할)
회사와 회원 간 발생한 분쟁에 대해서는 대한민국 법을 적용하며, 관할법원은 민사소송법상의 관할법원으로 합니다. 저작권 및 기타 지식재산권은 회사에 귀속합니다.
회원이 서비스 내에 저장·게시한 콘텐츠의 저작권은 원저작자 또는 회원 본인에게 있으며, 회사는 서비스 제공 목적 범위 내에서만 이를 이용합니다.`;

const formattedServiceTermsContent = serviceTermsContent
  .replace(/^(제\s*\d+장[^\n]*)\n/gm, "$1\n\n")
  .replace(/\n(제\s*\d+\s*조[^\n]*|제\d+조[^\n]*)/g, "\n\n$1")
  .replace(/\n{3,}/g, "\n\n");

const TermsServicePage = () => {
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
          <span>[필수] 티칭 이용약관</span>
        </button>

        <div className="inline-flex self-stretch items-center justify-start gap-[7.5px] px-0 py-[7.5px] max-md:py-0">
          <h1 className="font-['SUIT'] text-[28px] font-bold leading-[150%] tracking-[-0.84px] text-neutral-300 max-md:text-[16px] max-md:font-normal max-md:tracking-[-0.48px]">
            서비스 이용약관 (필수)
          </h1>
        </div>

        <article className="mt-6 w-full pb-[72px] max-md:mt-5 max-md:pb-10">
          <p className="whitespace-pre-wrap font-['SUIT'] text-[18px] font-medium leading-[150%] tracking-[-0.54px] text-zinc-500 max-md:text-[13px] max-md:font-normal max-md:leading-[150%] max-md:tracking-[-0.39px]">
            {formattedServiceTermsContent}
          </p>
        </article>
      </section>
    </main>
  );
};

export default TermsServicePage;
