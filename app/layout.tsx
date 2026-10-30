import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pemerintah Desa Widorokandang",
  description: "Website resmi Pemerintah Desa Widorokandang, Kecamatan Pati, Kabupaten Pati, Jawa Tengah.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-800 antialiased">
        <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-lg font-bold text-white shadow-lg shadow-emerald-200">
                W
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700">Desa Widorokandang</p>
                <p className="text-sm text-slate-600">Kecamatan Pati</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link href="/" className="transition hover:text-emerald-700">BERANDA</Link>
              <Link href="/profil/sejarah" className="transition hover:text-emerald-700">PROFIL DESA</Link>
              <Link href="/apbdesa" className="transition hover:text-emerald-700">APBDESA</Link>
              <Link href="/struktur" className="transition hover:text-emerald-700">STRUKTURAL</Link>
              <Link href="/administrasi" className="transition hover:text-emerald-700">ADMINISTRASI</Link>
              <Link href="/berita" className="transition hover:text-emerald-700">BERITA</Link>
            </nav>

            <Link href="/login" className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
              Login Admin
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-emerald-100 bg-emerald-900 text-emerald-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold">PEMERINTAH DESA WIDOROKANDANG</h3>
              <p className="mt-3 text-sm text-emerald-100">Desa Widorokandang, Kecamatan Pati, Kabupaten Pati, Jawa Tengah.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Kontak</h4>
              <ul className="mt-3 space-y-2 text-sm text-emerald-100">
                <li>Telepon: +62 812-3456-7890</li>
                <li>WhatsApp: 0812-3456-7890</li>
                <li>Email: widorokandang.pati@gmail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Media Sosial</h4>
              <ul className="mt-3 space-y-2 text-sm text-emerald-100">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
