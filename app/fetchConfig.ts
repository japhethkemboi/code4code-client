let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshTokens(): Promise<void> {
  if (!refreshPromise) {
    isRefreshing = true;
    refreshPromise = fetch(`${process.env.REACT_APP_SERVER_URL}/user/token/refresh/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Request-Flag": "token-refresh",
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to refresh token");
        }
      })
      .finally(() => {
        isRefreshing = false;
        refreshPromise = null;
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
      newUrl = `${process.env.REACT_APP_SERVER_URL}${url}`;
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
