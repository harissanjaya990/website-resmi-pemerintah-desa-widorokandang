import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export function getSessionCookie() {
  return cookies().get("desa_session")?.value ?? null;
}

export async function requireAdminSession() {
  const session = getSessionCookie();
  if (!session) {
    redirect("/login");
  }
  return session;
}
