import { fetchConfig } from "../fetchConfig";

export const login = async (credentials: any): Promise<{ message?: string; error?: string }> => {
  const res = await fetchConfig("/user/token/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (res.status === 200) {
    return { message: "Logged in." };
  } else {
    return { error: res.error };
  }
};
