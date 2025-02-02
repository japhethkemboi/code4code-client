import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("access");
  const refresh = request.cookies.get("refresh");
  if (!access && refresh) {
    const res = await fetch("/api/refresh/");

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return;
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
