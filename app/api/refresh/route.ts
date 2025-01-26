import { NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh");

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token found. Please log in." }, { status: 401 });
  }

  const lastRefreshTime = parseInt(cookieStore.get("last_refresh_time")?.value || "0", 10);
  const currentTime = Date.now();

  if (lastRefreshTime && currentTime - lastRefreshTime < 300000) {
    return NextResponse.json({ error: "Please wait before trying to refresh again." }, { status: 429 });
  }

  try {
    const res = await fetchConfig("/user/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken.value }),
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

      response.cookies.set("last_refresh_time", currentTime.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60,
        path: "/",
        sameSite: "strict",
      });

      return response;
    } else {
      return NextResponse.json({ error: "Failed to refresh token." }, { status: 401 });
    }
  } catch (error) {
    console.error("Error refreshing token", error);
    return NextResponse.json({ error: "Error refreshing token." }, { status: 500 });
  }
}
