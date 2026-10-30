import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const article = await prisma.news.findUnique({
    where: { slug: params.slug },
  });

  if (!article) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="card overflow-hidden p-0">
        <div className="h-72 bg-gradient-to-br from-emerald-100 to-emerald-300" />
        <div className="p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{article.category}</p>
          <h1 className="mt-3 text-4xl font-black text-slate-800">{article.title}</h1>
          <p className="mt-3 text-sm text-slate-500">Penulis: {article.author} · {new Date(article.publishedAt ?? article.createdAt).toLocaleDateString("id-ID")}</p>
          <div className="prose prose-emerald mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </div>
  );
}
