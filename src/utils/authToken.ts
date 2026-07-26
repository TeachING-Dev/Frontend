export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_KEY) ||
  import.meta.env.VITE_ACCESS_TOKEN ||
  "";

export const getStoredAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_KEY) || "";

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_KEY) || "";

export const hasStoredToken = () =>
  Boolean(
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
      localStorage.getItem(REFRESH_TOKEN_KEY),
  );

type JwtPayload = {
  role?: string;
  user_role?: string;
  userRole?: string;
  userrole?: string;
  exp?: number;
};

const decodeBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  return atob(paddedBase64);
};

export const getTokenPayload = (token: string): JwtPayload | null => {
  try {
    const [, payload] = token.replace(/^Bearer\s+/i, "").split(".");

    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload)) as JwtPayload;
  } catch {
    return null;
  }
};

export const getTokenRole = (token: string) => {
  const payload = getTokenPayload(token);

  return (
    payload?.user_role ||
    payload?.userRole ||
    payload?.userrole ||
    payload?.role ||
    ""
  );
};

export const isExistingUserToken = (token: string) =>
  getTokenRole(token) === "ROLE_USER";

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken?: string | null;
  refreshToken?: string | null;
}) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const normalizeBearerToken = (token: string) => {
  const normalizedToken = token.trim();

  return normalizedToken.startsWith("Bearer ")
    ? normalizedToken
    : `Bearer ${normalizedToken}`;
};
