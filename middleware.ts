import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const path = new URL(request.url).pathname;
  if (path.startsWith("/admin") || path.startsWith("/admin/")) {
    const cookie = request.headers.get("cookie") || "";
    if (!cookie.includes("desa_session=")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
