import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { reissue } from "../apis/auth";
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
    let ignore = false;

    const completeOAuthLogin = async () => {
      const searchParams = getCallbackParams(
        location.search,
        location.hash,
      );
      const callbackAccessToken = getParam(
        searchParams,
        [
          "accessToken",
          "access_token",
          "token",
        ],
      );
      const isNewUser =
        searchParams.get("isNewUser");

      try {
        const accessToken =
          callbackAccessToken ||
          (await reissue());

        if (ignore) {
          return;
        }

        saveTokens({ accessToken });

        const nextPath =
          isNewUser === "true" ||
          (isNewUser === null &&
            !isExistingUserToken(
              accessToken,
            ))
            ? "/signup"
            : "/";

        navigate(nextPath, {
          replace: true,
        });
      } catch {
        if (ignore) {
          return;
        }

        alert(
          "로그인 인증 정보를 발급받지 못했습니다. 다시 로그인해주세요.",
        );
        navigate("/login", {
          replace: true,
        });
      }
    };

    void completeOAuthLogin();

    return () => {
      ignore = true;
    };
  }, [location.hash, location.search, navigate]);

  return (
    <main className="flex h-screen items-center justify-center bg-[#090713] font-['SUIT'] text-xl text-violet-50">
      로그인 처리 중...
    </main>
  );
};

export default OAuthCallbackPage;