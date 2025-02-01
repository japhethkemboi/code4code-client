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
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60,
      path: "/",
      sameSite: "strict",
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    });

    response.cookies.set("refresh", refresh, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    });

    return response;
  } else {
    return NextResponse.json({ error: res.error || "Couldn't log you in. Try again." }, { status: 400 });
  }
}
