import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { reissue } from "../apis/auth";
import AuthBrandLogo from "../components/auth/AuthBrandLogo";
import AuthPageLayout from "../components/auth/AuthPageLayout";
import {
  getStoredAccessToken,
  isExistingUserToken,
  saveTokens,
} from "../utils/authToken";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as
    | { skipAutoLogin?: boolean }
    | null;
  const BACKEND_URL =
    import.meta.env.VITE_API_URL ||
    "https://teachingg.site";
  const OAUTH_REDIRECT_URI =
    import.meta.env.VITE_OAUTH_REDIRECT_URI ||
    "http://localhost:5173/oauth2/redirect";
  const REDIRECT_URI = encodeURIComponent(
    OAUTH_REDIRECT_URI,
  );

  useEffect(() => {
    if (locationState?.skipAutoLogin) {
      return;
    }

    const accessToken = getStoredAccessToken();

    if (accessToken && isExistingUserToken(accessToken)) {
      navigate("/", { replace: true });
      return;
    }

    const restoreAccessToken = async () => {
      try {
        const reissuedAccessToken = await reissue();

        saveTokens({ accessToken: reissuedAccessToken });

        if (isExistingUserToken(reissuedAccessToken)) {
          navigate("/", { replace: true });
        }
      } catch {
        // 로그인 페이지에서는 재발급 실패 시 그대로 머무릅니다.
      }
    };

    void restoreAccessToken();
  }, [locationState?.skipAutoLogin, navigate]);

  const handleKakaoLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google?redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 hidden h-[1019.6px] w-full origin-top -translate-x-1/2 scale-[0.8] md:block">
        {/* 로고: 원본 기준 상단 206px */}
        <div className="absolute left-1/2 top-[190px] -translate-x-1/2">
          <img
            src="/logo/login-brand-logo.png"
            alt="TeachING"
            className="h-auto w-[444px]"
          />
        </div>

        {/* 안내 문구: 원본 기준 상단 577px */}
        <div className="absolute left-1/2 top-[577px] flex w-[739px] -translate-x-1/2 flex-col items-center">
          <p className="text-center font-['SUIT'] text-[20px] font-normal leading-[150%] tracking-[-0.6px] text-[#F5F2FF]">
            간편 로그인으로
            <br />
            바로 학습을 시작해보세요 !
          </p>

          <div className="mt-[24px] flex w-[739px] flex-col gap-[15px]">
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="flex h-[60px] w-[739px] items-center justify-center rounded-[5px] bg-[#FDE500] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#13151F]"
            >
              <span className="inline-flex -translate-x-[4px] items-center gap-[8px]">
                <span className="flex h-[30px] w-[30px] items-center justify-center">
                  <img
                    src="/KakaoLoginIcon.svg"
                    alt=""
                    className="h-[30px] w-[30px] translate-y-[2px] shrink-0"
                  />
                </span>

                <span>카카오로 시작하기</span>
              </span>
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-[60px] w-[739px] items-center justify-center rounded-[5px] bg-[#2B2C35] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#A1A1A5]"
            >
              <span className="inline-flex -translate-x-[4px] items-center gap-[8px]">
                <span className="flex h-[30px] w-[30px] items-center justify-center">
                  <img
                    src="/Google.svg"
                    alt=""
                    className="h-[19.7px] w-[19.7px] translate-x-[4px] shrink-0"
                  />
                </span>

                <span className="translate-x-[4px]">Google로 시작하기</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 md:hidden">
        <div className="absolute left-1/2 top-[193px] -translate-x-1/2 [&>div>div>svg]:h-[36.1px] [&>div>div>svg]:w-[214.54px] [&>div>img]:h-[47px] [&>div>img]:w-[42px]">
          <AuthBrandLogo gapClassName="gap-7" />
        </div>

        <div className="absolute bottom-[75px] left-1/2 flex w-[361px] -translate-x-1/2 flex-col gap-[12px]">
          <p className="mb-[8px] text-center font-['SUIT'] text-[14px] font-normal leading-[150%] tracking-[-0.42px] text-[#F5F2FF]">
            간편 로그인으로
            <br />
            바로 학습을 시작해보세요!
          </p>

          <button
            type="button"
            onClick={handleKakaoLogin}
            className="flex h-[50px] w-[361px] items-center justify-center rounded-[5px] bg-[#FDE500] font-['SUIT'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#13151F]"
          >
            <span className="relative h-[30px] w-[178px]">
              <span className="absolute left-0 top-1/2 flex w-[30px] -translate-y-1/2 justify-start">
                <img
                  src="/Kakao.svg"
                  alt=""
                  className="h-[30px] w-[30px] -translate-x-[6px] translate-y-[2px] shrink-0"
                />
              </span>

              <span className="absolute left-[44px] top-1/2 -translate-y-1/2">카카오로 시작하기</span>
            </span>
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[50px] w-[361px] items-center justify-center rounded-[5px] bg-[#2B2C35] font-['SUIT'] text-[16px] font-medium leading-[150%] tracking-[-0.48px] text-[#A1A1A5]"
          >
            <span className="relative h-[30px] w-[178px]">
              <span className="absolute left-0 top-1/2 flex w-[30px] -translate-y-1/2 justify-start">
                <img
                  src="/Google.svg"
                  alt=""
                  className="h-[19.7px] w-[19.7px] shrink-0"
                />
              </span>

              <span className="absolute left-[44px] top-1/2 -translate-y-1/2">Google로 시작하기</span>
            </span>
          </button>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default LoginPage;
