import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/auth/signup") || pathname.startsWith("/auth/signin");

  const isSetupRoute = pathname.startsWith("/setup");

  if (!token && !isAuthRoute) {
    // Not logged in → redirect to signin
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (token && !token?.name && !isSetupRoute) {
    //Account isn't setup yet, so redirect to setup page.
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  if (token && token?.name && isSetupRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && isAuthRoute) {
    // Already logged in → redirect away from signin/signup
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && token?.name && isSetupRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transfer/:path*",
    "/p2p/:path*",
    "/account/:path*",
    "/setup",
    "/auth/signup",
    "/auth/signin",
  ],
};
