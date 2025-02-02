export const Cookie = {
  set: ({
    name,
    value,
    expires,
    path = "/",
    domain,
    secure,
    SameSite,
  }: {
    name: string;
    value: string;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    SameSite?: "Strict" | "Lax" | "None";
  }) => {
    document.cookie =
      `${name}=${encodeURIComponent(value)}` +
      (expires ? `; expires=${expires.toUTCString()}` : "") +
      `; path=${path}` +
      `; SameSite=${SameSite || "Lax"}` +
      (domain ? `; domain=${domain}` : "") +
      (secure ? "; secure" : "");
  },

  get: (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  },

  delete: (name: string, path = "/", domain?: string) => {
    document.cookie =
      `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}` + (domain ? `; domain=${domain}` : "");
  },
};
