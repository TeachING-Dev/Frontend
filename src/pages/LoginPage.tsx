import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const BACKEND_URL = "https://teachingg.site";
  const REDIRECT_URI = encodeURIComponent(
    "http://localhost:5173/oauth/callback",
  );

  useEffect(() => {
    const accessToken = getStoredAccessToken();

    if (
      accessToken &&
      isExistingUserToken(accessToken)
    ) {
      navigate("/", { replace: true });
      return;
    }

    const restoreAccessToken = async () => {
      try {
        const reissuedAccessToken =
          await reissue();

        saveTokens({
          accessToken: reissuedAccessToken,
        });

        if (
          isExistingUserToken(
            reissuedAccessToken,
          )
        ) {
          navigate("/", { replace: true });
        }
      } catch {
        // 로그인 페이지에서는 재발급 실패 시 그대로 머무릅니다.
      }
    };

    void restoreAccessToken();
  }, [navigate]);

  const handleKakaoLogin = () => {
    window.location.href =
      `${BACKEND_URL}/oauth2/authorization/kakao` +
      `?redirect_uri=${REDIRECT_URI}`;
  };

  const handleGoogleLogin = () => {
    window.location.href =
      `${BACKEND_URL}/oauth2/authorization/google` +
      `?redirect_uri=${REDIRECT_URI}`;
  };

  return (
    <AuthPageLayout contentClassName="relative min-h-screen">
      <div className="absolute left-1/2 top-0 h-[1019.6px] w-full origin-top -translate-x-1/2 scale-[0.75]">
        {/* 별 아이콘: 원본 기준 상단 206px */}
        <div className="absolute left-1/2 top-[206px] -translate-x-1/2">
          <AuthBrandLogo />
        </div>

        {/* 안내 문구: 원본 기준 상단 577px */}
        <div className="absolute left-1/2 top-[577px] flex w-[739px] -translate-x-1/2 flex-col items-center">
          <p className="text-center font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#F5F2FF]">
            간편 로그인으로
            <br />
            바로 학습을 시작해보세요!
          </p>

          <div className="mt-[24px] flex w-[739px] flex-col gap-[10px]">
            <button
              type="button"
              onClick={handleKakaoLogin}
              className="flex h-[60px] w-[739px] items-center gap-[14px] rounded-[5px] bg-[#FDE500] pl-[280px] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#13151F]"
            >
              <span className="flex w-[30px] justify-center">
                <img
                  src="/Kakao.svg"
                  alt=""
                  className="h-[30px] w-[30px] shrink-0"
                />
              </span>

              <span>카카오로 시작하기</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-[60px] w-[739px] items-center gap-[14px] rounded-[5px] bg-[#2B2C35] pl-[280px] font-['SUIT_Variable'] text-[20px] font-medium leading-[150%] tracking-[-0.6px] text-[#A1A1A5]"
            >
              <span className="flex w-[30px] justify-center">
                <img
                  src="/Google.svg"
                  alt=""
                  className="h-[19.7px] w-[19.7px] shrink-0"
                />
              </span>

              <span>Google로 시작하기</span>
            </button>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default LoginPage;