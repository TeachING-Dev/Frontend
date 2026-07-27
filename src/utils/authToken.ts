export const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_KEY) || "";

export const getStoredAccessToken = () =>
  getAccessToken();

export const hasStoredToken = () =>
  Boolean(getAccessToken());

type JwtPayload = {
  role?: string;
  user_role?: string;
  userRole?: string;
  userrole?: string;
  roles?: string[];
  authorities?: Array<
    string | { authority?: string }
  >;
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

  const singleRole =
    payload?.user_role ||
    payload?.userRole ||
    payload?.userrole ||
    payload?.role;

  if (singleRole) {
    return singleRole;
  }

  if (payload?.roles?.length) {
    return payload.roles[0];
  }

  const firstAuthority =
    payload?.authorities?.[0];

  return typeof firstAuthority === "string"
    ? firstAuthority
    : firstAuthority?.authority || "";
};

export const isTokenExpired = (token: string) => {
  const payload = getTokenPayload(token);

  if (!payload?.exp) {
    return false;
  }

  return payload.exp * 1000 <= Date.now();
};

export const isExistingUserToken = (token: string) => {
  if (!token || isTokenExpired(token)) {
    return false;
  }

  const role = getTokenRole(token).toUpperCase();

  return (
    role === "ROLE_USER" ||
    role === "USER"
  );
};

export const saveTokens = ({
  accessToken,
}: {
  accessToken?: string | null;
}) => {
  if (accessToken) {
    localStorage.setItem(
      ACCESS_TOKEN_KEY,
      accessToken.replace(/^Bearer\s+/i, ""),
    );
  }
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const normalizeBearerToken = (token: string) => {
  const normalizedToken = token.trim();

  return normalizedToken.startsWith("Bearer ")
    ? normalizedToken
    : `Bearer ${normalizedToken}`;
};