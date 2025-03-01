import { fetchConfig } from "../fetchConfig";
import { Cookie } from "../utils";

export const login = async (credentials: any): Promise<{ message?: string; error?: string }> => {
  const res = await fetchConfig("/user/token/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (res.status === 200) {
    Cookie.set({
      name: "access_token",
      value: Math.random().toString(36).substring(2),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 15 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    Cookie.set({
      name: "refresh_token",
      value: Math.random().toString(36).substring(2),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
      maxAge: 24 * 60 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });
    return { message: "Logged in." };
  } else {
    return { error: res.error };
  }
};
