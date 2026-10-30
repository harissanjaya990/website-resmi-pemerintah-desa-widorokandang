import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4),
});

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="grid overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-soft md:grid-cols-2">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-10 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">Akses Admin</p>
          <h1 className="mt-6 text-4xl font-black">Login Administrator</h1>
          <p className="mt-4 text-emerald-100">Gunakan akun resmi untuk mengelola konten dan administrasi desa.</p>
        </div>
        <div className="p-8 md:p-10">
          <form action={loginAction} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
              <input name="username" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-emerald-500" placeholder="Admin1" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" name="password" className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-emerald-500" placeholder="********" required />
            </div>
            <button className="btn-primary w-full" type="submit">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
}

async function loginAction(formData: FormData) {
  "use server";

  const prisma = new PrismaClient();
  const safeData = loginSchema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  const user = await prisma.user.findUnique({
    where: { username: safeData.username },
    include: { role: true },
  });

  if (!user || !user.active) {
    redirect("/login?error=invalid");
  }

  const valid = await bcrypt.compare(safeData.password, user.passwordHash);
  if (!valid) {
    redirect("/login?error=invalid");
  }

  const token = Buffer.from(JSON.stringify({ userId: user.id, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  cookies().set("desa_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  if (user.firstLogin) {
    redirect("/admin?first_login=1");
  }

  redirect("/admin");
}

