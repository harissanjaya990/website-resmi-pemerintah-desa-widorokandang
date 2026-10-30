import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function SettingsPage() {
  const settings = await prisma.setting.findMany();

  return (
    <div className="card">
      <h1 className="text-3xl font-black text-slate-800">Pengaturan Website</h1>
      <form action={saveSettings} className="mt-6 grid gap-4 md:grid-cols-2">
        <input name="site_name" defaultValue={getSetting(settings, "site_name")} placeholder="Nama website" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="tagline" defaultValue={getSetting(settings, "tagline")} placeholder="Tagline" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="address" defaultValue={getSetting(settings, "address")} placeholder="Alamat kantor desa" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" />
        <input name="office_phone" defaultValue={getSetting(settings, "office_phone")} placeholder="Nomor telepon" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="whatsapp" defaultValue={getSetting(settings, "whatsapp")} placeholder="Nomor WhatsApp" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="email" defaultValue={getSetting(settings, "email")} placeholder="Email resmi" className="rounded-xl border border-slate-200 px-4 py-3 md:col-span-2" />
        <input name="instagram" defaultValue={getSetting(settings, "instagram")} placeholder="Instagram" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="facebook" defaultValue={getSetting(settings, "facebook")} placeholder="Facebook" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="youtube" defaultValue={getSetting(settings, "youtube")} placeholder="YouTube" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="latitude" defaultValue={getSetting(settings, "latitude")} placeholder="Latitude" className="rounded-xl border border-slate-200 px-4 py-3" />
        <input name="longitude" defaultValue={getSetting(settings, "longitude")} placeholder="Longitude" className="rounded-xl border border-slate-200 px-4 py-3" />
        <button type="submit" className="btn-primary md:col-span-2">Simpan Pengaturan</button>
      </form>
    </div>
  );
}

function getSetting(settings: any[], key: string) {
  return settings.find((item) => item.key === key)?.value ?? "";
}

async function saveSettings(formData: FormData) {
  "use server";

  const keys = [
    "site_name",
    "tagline",
    "address",
    "office_phone",
    "whatsapp",
    "email",
    "instagram",
    "facebook",
    "youtube",
    "latitude",
    "longitude",
  ];

  for (const key of keys) {
    const value = String(formData.get(key) || "");
    await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value, type: "string" },
    });
  }

  revalidatePath("/admin/settings");
  redirect("/admin/settings");
}
