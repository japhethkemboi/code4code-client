import { type NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";

export async function POST(request: NextRequest) {
  try {
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
        maxAge: 15 * 60,
        path: "/",
        sameSite: "strict",
      });

      response.cookies.set("refresh", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
      });

      return response;
    } else {
      return NextResponse.json({ error: res.error || "Couldn't log you in. Try again." }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}
