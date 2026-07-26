import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { isExistingUserToken, saveTokens } from "../utils/authToken";

const getParam = (searchParams: URLSearchParams, names: string[]) =>
  names.map((name) => searchParams.get(name)).find(Boolean);

const getCallbackParams = (locationSearch: string, locationHash: string) => {
  const searchParams = new URLSearchParams(locationSearch);
  const hashParams = new URLSearchParams(locationHash.replace(/^#/, ""));

  hashParams.forEach((value, key) => {
    if (!searchParams.has(key)) {
      searchParams.set(key, value);
    }
  });

  return searchParams;
};

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = getCallbackParams(location.search, location.hash);
    const accessToken = getParam(searchParams, [
      "accessToken",
      "access_token",
      "token",
      "ken",
    ]);
    const refreshToken = getParam(searchParams, [
      "refreshToken",
      "refresh_token",
    ]);
    const isNewUser = searchParams.get("isNewUser");
    const code = searchParams.get("code");

    if (!accessToken) {
      alert(
        code
          ? "소셜 로그인 인가 코드는 받았지만 서비스 토큰을 받지 못했습니다."
          : "로그인 토큰을 확인할 수 없습니다.",
      );
      navigate("/signup", { replace: true });
      return;
    }

    saveTokens({ accessToken, refreshToken });
    const nextPath =
      isNewUser === null
        ? isExistingUserToken(accessToken)
          ? "/"
          : "/signup"
        : isNewUser === "true"
          ? "/signup"
          : "/";

    navigate(nextPath, { replace: true });
  }, [location.hash, location.search, navigate]);

  return (
    <main className="flex h-screen items-center justify-center bg-[#090713] font-['SUIT'] text-xl text-violet-50">
      로그인 처리 중...
    </main>
  );
};

export default OAuthCallbackPage;
