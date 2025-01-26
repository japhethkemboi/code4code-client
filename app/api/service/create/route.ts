import { NextRequest, NextResponse } from "next/server";
import { fetchConfig } from "@/app/fetchConfig";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const service = await request.json();
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
  }

  const res = await fetchConfig("/service/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(service),
  });

  if (res.data) {
    return NextResponse.json({ data: res.data }, { status: 201 });
  } else {
    return NextResponse.json({ error: res.error || "Service creation failed." }, { status: 400 });
  }
}
