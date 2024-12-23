import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/details/")) {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=2628000, max-age=2628000, stale-while-revalidate=604800",
    );
  }

  return response;
}

export const config = {
  matcher: "/details/:path*",
};
