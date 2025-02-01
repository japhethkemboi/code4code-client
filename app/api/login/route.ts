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

    document.cookie = `access=${access}; path=/; max-age=${15 * 60}; secure=${
      process.env.NODE_ENV === "production" ? "true" : "false"
    }; SameSite=Strict; domain=${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`;
    document.cookie = `refresh=${refresh}; path=/; max-age=${24 * 60 * 60}; secure=${
      process.env.NODE_ENV === "production" ? "true" : "false"
    }; SameSite=Lax; domain=${process.env.NEXT_PUBLIC_AUTH_DOMAIN}`;

    return NextResponse.json({ ok: true });
  } else {
    return NextResponse.json({ error: res.error || "Couldn't log you in. Try again." }, { status: 400 });
  }
}
