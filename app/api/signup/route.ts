import { fetchConfig } from "@/app/fetchConfig";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await request.json();
    const res = await fetchConfig("/user/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.data) {
      return NextResponse.json({ profile: res.data }, { status: 200 });
    } else {
      return NextResponse.json({ error: res.error || "Couldn't sign you up. Try again." }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 });
  }
}
