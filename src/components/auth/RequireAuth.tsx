import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { reissue } from "../../apis/auth";
import {
  clearTokens,
  getStoredAccessToken,
  isExistingUserToken,
  isTokenExpired,
  saveTokens,
} from "../../utils/authToken";

type AuthStatus =
  | "checking"
  | "authenticated"
  | "unauthenticated"
  | "signupRequired";

const getInitialAuthStatus = (): AuthStatus => {
  const accessToken = getStoredAccessToken();

  if (
    !accessToken ||
    isTokenExpired(accessToken)
  ) {
    return "checking";
  }

  return isExistingUserToken(accessToken)
    ? "authenticated"
    : "signupRequired";
};

const RequireAuth = () => {
  const location = useLocation();
  const [authStatus, setAuthStatus] =
    useState<AuthStatus>(getInitialAuthStatus);

  useEffect(() => {
    let ignore = false;

    if (authStatus !== "checking") {
      return;
    }

    const restoreAccessToken = async () => {
      try {
        const reissuedAccessToken = await reissue();

        if (ignore) {
          return;
        }

        saveTokens({ accessToken: reissuedAccessToken });
        setAuthStatus(
          isExistingUserToken(reissuedAccessToken)
            ? "authenticated"
            : "signupRequired",
        );
      } catch (error) {
        if (ignore) {
          return;
        }

        console.error(error);
        clearTokens();
        setAuthStatus("unauthenticated");
      }
    };

    void restoreAccessToken();

    return () => {
      ignore = true;
    };
  }, [authStatus, location.pathname]);

  if (authStatus === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090713] font-['SUIT'] text-xl text-violet-50">
        로그인 확인 중...
      </main>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (authStatus === "signupRequired") {
    return (
      <Navigate
        to="/signup"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;