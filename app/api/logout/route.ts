/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  const access = cookieStore.get("access_token");

  if (access) {
    const res = await fetchConfig("/user/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access.value}`,
      },
    });

    if (res.error && res.status !== 401) {
      return NextResponse.json({ error: res.error || "Logout failed. Please try again." }, { status: 400 });
    } else {
      cookieStore.delete("access");
      cookieStore.delete("access_token");
      cookieStore.delete("refresh");
      cookieStore.delete("refresh_token");

      return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    }
  } else {
    cookieStore.delete("access");
    cookieStore.delete("refresh");

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
