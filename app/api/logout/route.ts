import { type NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";
import { cookies } from "next/headers";

export async function POST(_: NextRequest) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access");

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
      cookieStore.delete("refresh");

      return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
    }
  } else {
    cookieStore.delete("access");
    cookieStore.delete("refresh");

    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  }
}
