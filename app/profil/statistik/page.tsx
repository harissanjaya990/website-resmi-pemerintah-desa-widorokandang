export default function StatistikPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Profil Desa</p>
        <h1 className="section-title mt-2">Statistik Kependudukan</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Laki-laki", value: 4200 },
          { label: "Perempuan", value: 4300 },
          { label: "Agama Islam", value: 8200 },
          { label: "Pendidikan SMA", value: 1600 },
        ].map((item) => (
          <div key={item.label} className="card text-center">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-emerald-700">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
