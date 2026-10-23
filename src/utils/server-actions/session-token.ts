import { cookies } from "next/headers";

const sessionCookieBase = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
});

export const sessionCookieClearOptions = () => ({
  ...sessionCookieBase(),
  maxAge: 0,
});

/**
 * A configured MASTER_KEY overrides the session for development/staging testing.
 * Production always uses the real session cookie.
 */
export const getAccessToken = async () => {
  if (
    ["development", "staging"].includes(process.env.NODE_ENV ?? "") &&
    process.env.MASTER_KEY
  ) {
    return process.env.MASTER_KEY;
  }

  const key = process.env.ACCESS_TOKEN_KEY;
  const jar = await cookies();
  return key ? jar.get(key)?.value : undefined;
};

export const getRefreshToken = async () => {
  const key = process.env.REFRESH_TOKEN_KEY;
  if (!key) return undefined;
  const jar = await cookies();
  return jar.get(key)?.value;
};
