import { cookies } from "next/headers";

export function readSession() {
  return cookies().get("desa_session")?.value ?? null;
}

export async function requireLogin() {
  const value = readSession();
  if (!value) {
    throw new Error("Unauthorized");
  }
  return value;
}
