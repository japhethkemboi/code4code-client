import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // CORS handling - allow all subdomains of code4code.dev
  const origin = request.headers.get("origin");
  const allowedOriginPattern = /\.code4code\.dev$/;
  const isAllowedOrigin = origin && allowedOriginPattern.test(origin);

  const response = NextResponse.next();

  // If origin matches the pattern, allow it for CORS
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  // CORS Headers for Methods and Headers
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handling OPTIONS requests (pre-flight)
  if (request.method === "OPTIONS") {
    return response;
  }

  // Token handling: Check if access token exists or refresh token exists to get a new access token
  const access = request.cookies.get("access");
  const refresh = request.cookies.get("refresh");

  if (!access && refresh) {
    const res = await fetch("/api/refresh/");

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect to login if not authenticated and trying to access restricted pages
  if (!access && (request.nextUrl.pathname === "/blog/edit" || request.nextUrl.pathname === "/service/create")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/blog/edit", "/service/create", "/api/:path*"], // Match relevant routes for middleware
};
