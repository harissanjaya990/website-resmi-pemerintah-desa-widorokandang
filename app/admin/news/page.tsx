import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function NewsAdminPage() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-black text-slate-800">Kelola Berita dan Pengumuman</h1>
        <form action={createNews} className="mt-6 grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Judul berita" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="category" placeholder="Kategori" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="author" placeholder="Nama penulis" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" required />
          <textarea name="excerpt" placeholder="Ringkasan" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" required />
          <textarea name="content" placeholder="Isi berita" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" rows={6} required />
          <button type="submit" className="btn-primary md:col-span-2">Simpan Berita</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800">Daftar Berita</h2>
        <div className="mt-5 space-y-4">
          {news.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.category} · {item.status}</p>
                </div>
                <form action={deleteNews.bind(null, item.id)}>
                  <button type="submit" className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Hapus</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function createNews(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "");
  const category = String(formData.get("category") || "");
  const author = String(formData.get("author") || "");
  const excerpt = String(formData.get("excerpt") || "");
  const content = String(formData.get("content") || "");

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "berita-baru";

  await prisma.news.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

async function deleteNews(id: string) {
  "use server";
  await prisma.news.delete({ where: { id } });
  revalidatePath("/admin/news");
  redirect("/admin/news");
}
