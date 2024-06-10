import { validateToken } from "@/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  switch (req.nextUrl.pathname) {
    case "/admin/users":
    case "/admin/category":
    case "/admin/sub-category":
    case "/admin/collection":
    case "/admin/product":
      return validateRoleAdmin(req);
    case "/auth/login":
      return validateAuth(req);
    case "/orders":
    case "/orders/:id":
    case "/cart/checkout":
    case "/cart/checkout/confirm":
      return validateSession(req);
    default:
      return NextResponse.next();
  }
}

const validateRoleAdmin = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRole = "ROLE_ADMIN";
  if (session && !session.content.roles.includes(validRole)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const validateSession = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (!session?.success || session === undefined || session === null) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `prevPage=${requestedPage}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

const validateAuth = async (req: NextRequest) => {
  const session = await validateToken(req.cookies.get("token")?.value + "");
  if (session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/admin/users",
    "/admin/category",
    "/admin/sub-category",
    "/admin/collection",
    "/admin/product",
    "/auth/login",
    "/cart/checkout",
    "/cart/checkout/confirm",
    "/orders",
    "/orders/:id",
  ],
};
