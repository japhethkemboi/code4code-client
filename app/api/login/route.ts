import { type NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";

export async function POST(request: NextRequest) {
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

    response.cookies.set("fake_access", Math.random().toString(36).substring(2), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 15 * 60,
      path: "/",
      domain: process.env.NODE_ENV === "production" ? process.env.AUTH_DOMAIN : undefined,
    });

    response.cookies.set("fake_refresh", Math.random().toString(36).substring(2), {
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
