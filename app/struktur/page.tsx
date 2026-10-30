import Link from "next/link";

export default function StrukturPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Struktural</p>
        <h1 className="section-title mt-2">Struktur Organisasi Desa</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          "Struktur Pemerintah Desa",
          "Struktur Organisasi BPD",
          "Struktur Organisasi RT dan RW",
          "Struktur Organisasi LPMD",
          "Struktur Organisasi Karang Taruna",
          "Struktur Organisasi PKK",
        ].map((item) => (
          <div key={item} className="card">
            <div className="h-52 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-300" />
            <h2 className="mt-5 text-xl font-bold text-slate-800">{item}</h2>
            <p className="mt-3 text-sm text-slate-600">Bagan struktur organisasi dan daftar perangkat desa yang bertanggung jawab.</p>
            <Link href="/admin/structures" className="mt-5 inline-block text-sm font-semibold text-emerald-700">Kelola Struktur</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
