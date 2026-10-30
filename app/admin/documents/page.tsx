import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({ include: { category: true } });

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-3xl font-black text-slate-800">Kelola Dokumen Desa</h1>
        <form action={createDocument} className="mt-6 grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Judul dokumen" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="number" placeholder="Nomor dokumen" className="rounded-xl border border-slate-200 px-4 py-3" />
          <input name="year" type="number" placeholder="Tahun" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <input name="fileUrl" placeholder="URL file PDF" className="rounded-xl border border-slate-200 px-4 py-3" required />
          <textarea name="description" placeholder="Keterangan" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" />
          <button type="submit" className="btn-primary md:col-span-2">Simpan Dokumen</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-slate-800">Daftar Dokumen</h2>
        <div className="mt-5 space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-slate-200 p-4">
              <p className="font-bold text-slate-800">{doc.title}</p>
              <p className="text-sm text-slate-500">{doc.number} · {doc.year}</p>
              <a href={doc.fileUrl} target="_blank" className="mt-3 inline-block text-sm font-semibold text-emerald-700">Lihat PDF</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function createDocument(formData: FormData) {
  "use server";

  const title = String(formData.get("title") || "");
  const number = String(formData.get("number") || "");
  const year = Number(formData.get("year") || new Date().getFullYear());
  const fileUrl = String(formData.get("fileUrl") || "");
  const description = String(formData.get("description") || "");

  await prisma.document.create({
    data: {
      title,
      number,
      year,
      fileUrl,
      description,
    },
  });

  revalidatePath("/admin/documents");
  redirect("/admin/documents");
}
