export default function ApbDesaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">APBDesa</p>
        <h1 className="section-title mt-2">Dokumen Perencanaan dan Keuangan Desa</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          "RPJMDesa",
          "RKPDesa",
          "APBDesa Awal",
          "APBDesa Perubahan",
          "APBDesa Pertanggungjawaban",
        ].map((item) => (
          <div key={item} className="card">
            <h2 className="text-xl font-bold text-slate-800">{item}</h2>
            <p className="mt-3 text-sm text-slate-600">Dokumen dapat dilihat dan diunduh secara langsung melalui website ini.</p>
            <button className="btn-secondary mt-5">Lihat Dokumen</button>
          </div>
        ))}
      </div>
    </div>
  );
}
