import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardMetrics() {
  const [newsCount, documentCount, galleryCount, adminCount] = await Promise.all([
    prisma.news.count(),
    prisma.document.count(),
    prisma.gallery.count(),
    prisma.user.count(),
  ]);

  return {
    newsCount,
    documentCount,
    galleryCount,
    adminCount,
  };
}

export async function getLatestActivity() {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}
