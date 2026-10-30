import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function BeritaPage() {
  const news = await prisma.news.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Berita</p>
        <h1 className="section-title mt-2">Berita dan Kegiatan Desa</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((item) => (
          <article key={item.id} className="card overflow-hidden p-0">
            <div className="h-52 bg-gradient-to-br from-emerald-100 to-emerald-300" />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{item.category}</p>
              <h2 className="mt-3 text-xl font-bold text-slate-800">{item.title}</h2>
              <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
              <a href={`/berita/${item.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700">Baca Selengkapnya</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
