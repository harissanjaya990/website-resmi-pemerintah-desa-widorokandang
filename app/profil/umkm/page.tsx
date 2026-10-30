export default function UmkmPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Profil Desa</p>
        <h1 className="section-title mt-2">Katalog UMKM dan Produk Unggulan</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "Keripik Pisang", owner: "Ibu Sari", type: "Kuliner" },
          { name: "Tahu Crispy", owner: "Bapak Tono", type: "Makanan" },
          { name: "Produk Anyaman", owner: "Ibu Lestari", type: "Kerajinan" },
        ].map((item) => (
          <div key={item.name} className="card">
            <div className="h-48 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-200" />
            <h2 className="mt-5 text-xl font-bold text-slate-800">{item.name}</h2>
            <p className="mt-2 text-sm text-slate-600">Pemilik: {item.owner}</p>
            <p className="mt-1 text-sm text-slate-600">Jenis Usaha: {item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
