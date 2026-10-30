import { PrismaClient } from "@prisma/client";
import { readSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  const session = readSession();
  if (!session) redirect("/login");

  const [newsCount, documentCount, galleryCount, adminCount] = await Promise.all([
    prisma.news.count(),
    prisma.document.count(),
    prisma.gallery.count(),
    prisma.user.count(),
  ]);

  const recentLogs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Dashboard Admin</p>
        <h1 className="mt-2 text-3xl font-black text-slate-800">Panel Pengelolaan Desa</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="card">
          <p className="text-sm text-slate-500">Jumlah Berita</p>
          <p className="mt-3 text-3xl font-black text-emerald-700">{newsCount}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Jumlah Dokumen</p>
          <p className="mt-3 text-3xl font-black text-emerald-700">{documentCount}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Jumlah Galeri</p>
          <p className="mt-3 text-3xl font-black text-emerald-700">{galleryCount}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-500">Jumlah Administrator</p>
          <p className="mt-3 text-3xl font-black text-emerald-700">{adminCount}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-slate-800">Aktivitas Terakhir</h2>
        <div className="mt-4 space-y-3">
          {recentLogs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-200 p-3">
              <p className="font-medium text-slate-700">{log.action}</p>
              <p className="text-sm text-slate-500">{log.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

