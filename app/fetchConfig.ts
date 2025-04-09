let refreshPromise: Promise<boolean> | undefined;
let isRefreshing = false;

async function refreshTokens(): Promise<boolean> {
  if (refreshPromise === undefined) {
    isRefreshing = true;

    refreshPromise = fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/token/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Request-Flag": "token-refresh",
      },
    })
      .then(async (res) => {
        isRefreshing = false;

        if (res.status === 200) {
          return true;
        } else return false;
      })
      .catch((err) => {
        isRefreshing = false;
        console.error("Token refresh failed:", err);
        return false;
      });
  }

  return refreshPromise;
}

export const fetchConfig = async (
  url: string,
  options: RequestInit = {},
  retry: boolean = true
): Promise<{
  data?: any;
  blob?: Blob;
  error?: string;
  status: number;
  headers?: Headers;
}> => {
  try {
    let newUrl = url;

    try {
      new URL(url);
    } catch {
      newUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    }

    if (!options.credentials) options.credentials = "include";

    if (!options.method) options.method = "GET";

    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const response = await fetch(newUrl, options);

    if (response.status === 401 && retry) {
      try {
        await refreshTokens();
        return fetchConfig(url, options, false);
      } catch (err) {
        return {
          error: "Session expired. Please log in again.",
          status: 401,
        };
      }
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/octet-stream")) {
      const blobData = await response.blob();
      return { blob: blobData, status: response.status, headers: response.headers };
    }

    try {
      const responseData = await response.json();
      if (response.ok) {
        return { data: responseData, status: response.status };
      }
      return {
        error: responseData?.error || responseData?.detail || responseData?.details || "An error occurred.",
        status: response.status,
      };
    } catch {
      if (response.ok) return { status: response.status };
      return {
        error: "An error occurred.",
        status: response.status,
      };
    }
  } catch {
    return {
      error: "A network error occurred.",
      status: 0,
    };
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
