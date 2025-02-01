import Cookies from "js-cookie";
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

    Cookies.set("access", access, {
      path: "/",
      maxAge: 15 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    });

    Cookies.set("refresh", refresh, {
      path: "/",
      maxAge: 24 * 60 * 60,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    });

    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: res.error || "Couldn't log you in. Try again." }, { status: 400 });
  }
}
