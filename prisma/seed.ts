import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: "SUPER_ADMIN", description: "Full access" },
    { name: "ADMINISTRATOR", description: "Content management" },
  ];

  for (const roleData of roles) {
    await prisma.role.upsert({
      where: { name: roleData.name as any },
      update: {},
      create: roleData,
    });
  }

  const superRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
  const defaultPasswordHash = await bcrypt.hash("Admin01", 10);

  const adminUser = await prisma.user.upsert({
    where: { username: "Admin1" },
    update: {},
    create: {
      username: "Admin1",
      email: "widorokandang.pati@gmail.com",
      passwordHash: defaultPasswordHash,
      firstLogin: true,
      active: true,
      roleId: superRole!.id,
    },
  });

  const defaultSettings = [
    { key: "site_name", value: "PEMERINTAH DESA WIDOROKANDANG", type: "string" },
    { key: "tagline", value: "Desa Widorokandang, Kecamatan Pati, Kabupaten Pati, Jawa Tengah", type: "string" },
    { key: "address", value: "Desa Widorokandang, Kecamatan Pati, Kabupaten Pati, Jawa Tengah", type: "string" },
    { key: "office_phone", value: "+62 812-3456-7890", type: "string" },
    { key: "whatsapp", value: "6281234567890", type: "string" },
    { key: "email", value: "widorokandang.pati@gmail.com", type: "string" },
    { key: "instagram", value: "https://instagram.com", type: "string" },
    { key: "facebook", value: "https://facebook.com", type: "string" },
    { key: "youtube", value: "https://youtube.com", type: "string" },
    { key: "google_maps", value: "https://maps.google.com/?q=Desa+Widorokandang+Pati", type: "string" },
    { key: "latitude", value: "-6.748", type: "string" },
    { key: "longitude", value: "111.053", type: "string" },
    { key: "weather_latitude", value: "-6.748", type: "string" },
    { key: "weather_longitude", value: "111.053", type: "string" },
    { key: "theme_primary", value: "#0f766e", type: "string" },
    { key: "theme_secondary", value: "#d4af37", type: "string" },
  ];

  for (const item of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: item.key },
      update: { value: item.value, type: item.type },
      create: item,
    });
  }

  const sampleNews = [
    {
      title: "Pelantikan dan pembekalan perangkat desa baru",
      slug: "pelantikan-dan-pembekalan-perangkat-desa-baru",
      excerpt: "Kegiatan pelantikan perangkat desa dan pembekalan operasional pelayanan publik.",
      content: "<p>Pelantikan perangkat desa dilaksanakan secara resmi...</p>",
      category: "Berita Desa",
      author: "Admin Desa",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "Program pemberdayaan UMKM desa Widorokandang",
      slug: "program-pemberdayaan-umkm-desa-widorokandang",
      excerpt: "UMKM desa terus berkembang melalui pelatihan dan pendampingan produk lokal.",
      content: "<p>Program UMKM desa bertujuan meningkatkan daya saing produk lokal.</p>",
      category: "Kegiatan",
      author: "Admin Desa",
      status: "PUBLISHED",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    },
  ];

  for (const item of sampleNews) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  await prisma.activityLog.create({
    data: {
      action: "Seed data initialized",
      details: `Default admin ${adminUser.username} created`,
      userId: adminUser.id,
    },
  });

  console.log("Seed complete. Admin1 / Admin01 created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
