import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchConfig } from "./app/fetchConfig";

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("access");
  const refresh = request.cookies.get("refresh");

  if (!access && refresh) {
    const res = await fetchConfig("/user/token/refresh/", { method: "POST", credentials: "include" });

    if (res.data) {
      const { access, refresh } = res.data;

      document.cookie = `access=${access}; path=/; max-age=${15 * 60}; secure=${
        process.env.NODE_ENV === "production" ? "true" : "false"
      }; SameSite=Strict; domain=${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`;
      document.cookie = `refresh=${refresh}; path=/; max-age=${24 * 60 * 60}; secure=${
        process.env.NODE_ENV === "production" ? "true" : "false"
      }; SameSite=Lax; domain=${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`;

      return NextResponse.json({ ok: true });
    }
  }

  if (!access && (request.nextUrl.pathname === "/blog/edit" || request.nextUrl.pathname === "/service/create")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/edit", "/service/create"],
};
