import { type NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("Origin");
  const allowedOrigin = /^https?:\/\/([a-zA-Z0-9-]+)\.code4code\.dev$/;

  const response = NextResponse.json({ ok: true });

  if (origin && allowedOrigin.test(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set("Access-Control-Allow-Origin", "");
  }

  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", "POST");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (request.method === "OPTIONS") {
    return response;
  }

  const credentials = await request.json();

  const res = await fetchConfig("/user/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (res.data) {
    const { access, refresh } = res.data;

    const response = NextResponse.json({ ok: true });

    response.cookies.set("access", access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    response.cookies.set("refresh", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    response.cookies.set("access_token", Math.random().toString(36).substring(2), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    response.cookies.set("refresh_token", Math.random().toString(36).substring(2), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    return response;
  } else {
    return NextResponse.json({ error: res.error || "Couldn't log you in. Try again." }, { status: 400 });
  }
}
