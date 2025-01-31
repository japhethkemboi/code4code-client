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

      const response = NextResponse.json({ ok: true });

      response.cookies.set("access", access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
        path: "/",
        sameSite: "strict",
        domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      });

      response.cookies.set("refresh", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
        domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      });

      return NextResponse.next();
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
