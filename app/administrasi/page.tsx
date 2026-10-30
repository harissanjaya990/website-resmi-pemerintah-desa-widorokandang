export default function AdministrasiPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Administrasi</p>
        <h1 className="section-title mt-2">Peraturan dan Dokumen Administrasi Desa</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          "Kumpulan Peraturan Desa (PERDES)",
          "Peraturan Kepala Desa (PERKADES)",
          "Surat Keputusan Kepala Desa (SK)",
        ].map((item) => (
          <div key={item} className="card">
            <h2 className="text-xl font-bold text-slate-800">{item}</h2>
            <p className="mt-3 text-sm text-slate-600">Daftar dokumen administratif lengkap dengan kategori, nomor, judul, dan tahun publikasi.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
