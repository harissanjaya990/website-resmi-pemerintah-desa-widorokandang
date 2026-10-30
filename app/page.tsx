import Link from "next/link";
import { ArrowRight, MapPin, Newspaper, Users, Building2, BarChart3, CloudSun, Clock3 } from "lucide-react";
import { getPublicHomeData, getSettingValue } from "@/lib/data";

export default async function HomePage() {
  const { news, announcements, settings, latestGallery } = await getPublicHomeData();
  const siteName = getSettingValue(settings, "site_name", "PEMERINTAH DESA WIDOROKANDANG");
  const address = getSettingValue(settings, "address", "Desa Widorokandang, Kecamatan Pati, Kabupaten Pati, Jawa Tengah");
  const whatsapp = getSettingValue(settings, "whatsapp", "6281234567890");

  return (
    <div>
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="inline-flex rounded-full border border-emerald-300/60 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Website Resmi Desa
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">{siteName}</h1>
            <p className="mt-5 max-w-xl text-lg text-emerald-50">
              Mewujudkan tata kelola pemerintahan desa yang modern, transaparan, dan berorientasi pada pelayanan masyarakat yang prima.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/berita" className="btn-primary bg-white text-emerald-700 hover:bg-emerald-50">Lihat Berita</Link>
              <Link href="/profil/sejarah" className="btn-secondary border-white text-white hover:bg-white/10">Profil Desa</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
            <div className="rounded-2xl bg-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-emerald-100">
                <span>Jam Digital</span>
                <Clock3 className="h-5 w-5" />
              </div>
              <div className="mt-6 text-4xl font-bold">{new Date().toLocaleTimeString("id-ID")}</div>
              <div className="mt-3 text-sm text-emerald-100">{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
              <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white/5 p-3"><p className="text-emerald-100">Cuaca</p><p className="mt-2 font-semibold">Cerah</p></div>
                <div className="rounded-xl bg-white/5 p-3"><p className="text-emerald-100">Lokasi</p><p className="mt-2 font-semibold">Widorokandang</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: "Penduduk", value: "8.500+", icon: Users },
            { title: "Keluarga", value: "2.200+", icon: Building2 },
            { title: "UMKM", value: "42", icon: BarChart3 },
            { title: "Berita", value: `${news.length}+`, icon: Newspaper },
          ].map(({ title, value, icon: Icon }) => (
            <div key={title} className="card text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Icon className="h-7 w-7" /></div>
              <div className="text-3xl font-black text-emerald-700">{value}</div>
              <p className="mt-2 text-slate-600">{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Sambutan Kepala Desa</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-800">Selamat Datang di Desa Widorokandang</h2>
            <p className="mt-4 text-slate-600">
              Desa Widorokandang senantiasa berkomitmen untuk meningkatkan kualitas pelayanan, memberdayakan masyarakat, dan mewujudkan pemerintahan desa yang bersih, transparan, dan akuntabel.
            </p>
            <p className="mt-4 text-slate-600">
              Dengan digitalisasi layanan, kami terus memperbaiki akses informasi, pengelolaan dokumen, dan pelayanan publik agar lebih cepat, mudah, dan tepat sasaran.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3">
              <CloudSun className="h-8 w-8 text-amber-500" />
              <h3 className="text-xl font-bold">Informasi Cuaca</h3>
            </div>
            <p className="mt-4 text-4xl font-black text-emerald-700">28°C</p>
            <p className="mt-2 text-slate-600">Cerah Berawan</p>
            <p className="mt-5 text-sm text-slate-500">Kelembapan 72% · Kecepatan angin 10 km/jam</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Berita Terkini</p>
            <h2 className="section-title mt-2">Berita dan Informasi Desa</h2>
          </div>
          <Link href="/berita" className="text-sm font-semibold text-emerald-700">Lihat Semua</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article key={item.id} className="card overflow-hidden p-0">
              <div className="h-52 bg-gradient-to-br from-emerald-100 to-emerald-300" />
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{item.category}</span>
                <h3 className="mt-3 text-xl font-bold text-slate-800">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
                <Link href={`/berita/${item.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Baca Selengkapnya <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Pengumuman</p>
            <h2 className="section-title mt-2">Pengumuman Desa</h2>
            <div className="mt-6 space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm font-bold text-emerald-700">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-emerald-700" />
              <h3 className="text-xl font-bold">Lokasi Desa</h3>
            </div>
            <p className="mt-4 text-slate-600">{address}</p>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-600">
              <p>Telepon: +62 812-3456-7890</p>
              <p>WhatsApp: {whatsapp}</p>
              <p>Email: widorokandang.pati@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Galeri</p>
          <h2 className="section-title mt-2">Dokumentasi Kegiatan Desa</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {latestGallery.map((item) => (
            <div key={item.id} className="card p-3">
              <div className="h-40 rounded-xl bg-gradient-to-br from-slate-200 to-emerald-200" />
              <p className="mt-4 text-lg font-bold text-slate-800">{item.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

