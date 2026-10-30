import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPublicHomeData() {
  const [news, announcements, settings, galleries] = await Promise.all([
    prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 4,
    }),
    prisma.announcement.findMany({
      where: { active: true },
      orderBy: { publishDate: "desc" },
      take: 3,
    }),
    prisma.setting.findMany(),
    prisma.gallery.findMany({ orderBy: { createdAt: "desc" }, take: 4 }),
  ]);

  return { news, announcements, settings, galleries };
}

export function getSettingValue(settings: { key: string; value: string }[], key: string, fallback = "") {
  return settings.find((item) => item.key === key)?.value ?? fallback;
}
