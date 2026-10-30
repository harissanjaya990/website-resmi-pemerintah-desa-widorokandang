import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const session = readSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <aside className="mb-8 flex flex-wrap gap-3 rounded-2xl border border-emerald-100 bg-white p-3 shadow-soft">
        <a href="/admin" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white">Dashboard</a>
        <a href="/admin/news" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Berita</a>
        <a href="/admin/settings" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Pengaturan</a>
        <a href="/admin/documents" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Dokumen</a>
        <a href="/admin/administrators" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Administrator</a>
        <form action={logoutAction} className="ml-auto">
          <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
            Logout
          </button>
        </form>
      </aside>
      <div>{children}</div>
    </div>
  );
}

async function logoutAction() {
  "use server";
  const { cookies } = await import("next/headers");
  cookies().delete("desa_session");
  redirect("/login");
}
