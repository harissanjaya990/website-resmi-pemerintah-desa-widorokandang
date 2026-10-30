import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const form = await request.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");

  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true },
  });

  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
    return NextResponse.json({ success: false, message: "Login gagal" }, { status: 401 });
  }

  const token = Buffer.from(JSON.stringify({ userId: user.id, exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  const res = NextResponse.json({ success: true, redirectTo: user.firstLogin ? "/admin?first_login=1" : "/admin" });
  res.cookies.set("desa_session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  return res;
}
