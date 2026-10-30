import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function AdministratorsPage() {
  const users = await prisma.user.findMany({ include: { role: true } });

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-black text-slate-800">Manajemen Administrator</h1>
        <form action={createAdmin} className="mt-6 grid gap-4 md:grid-cols-2">
          <input name="username" placeholder="Username" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="email" type="email" placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="password" type="password" placeholder="Password" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <select name="role" className="rounded-xl border border-slate-200 px-4 py-3">
            <option value="SUPER_ADMIN">SUPER ADMIN</option>
            <option value="ADMINISTRATOR">ADMINISTRATOR</option>
          </select>
          <button type="submit" className="btn-primary md:col-span-2">Tambah Administrator</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800">Daftar Administrator</h2>
        <div className="mt-5 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">{user.username}</p>
                  <p className="text-sm text-slate-500">{user.email} · {user.role.name}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-700"}`}>
                  {user.active ? "Aktif" : "Nonaktif"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function createAdmin(formData: FormData) {
  "use server";

  const username = String(formData.get("username") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const roleName = String(formData.get("role") || "ADMINISTRATOR");

  const role = await prisma.role.findUnique({ where: { name: roleName as any } });
  if (!role) throw new Error("Role tidak ditemukan");

  await prisma.user.create({
    data: {
      username,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      roleId: role.id,
      firstLogin: true,
      active: true,
    },
  });

  revalidatePath("/admin/administrators");
  redirect("/admin/administrators");
}
