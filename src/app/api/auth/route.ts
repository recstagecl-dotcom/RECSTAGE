import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    return NextResponse.json({ ok: false, error: "Server config missing" }, { status: 500 });
  }

  if (password === correct) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_auth", "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
