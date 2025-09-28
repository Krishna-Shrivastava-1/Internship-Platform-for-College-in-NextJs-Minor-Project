// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("authtoken")?.value;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login"];

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.Secretkey);
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role;

      if (pathname === "/login") {
        if (role === "student") return NextResponse.redirect("/home");
        if (role === "teacher") return NextResponse.redirect("/admin");
      }

      if (role === "student" && pathname.startsWith("/admin")) return NextResponse.redirect("/home");
      if (role === "teacher" && pathname.startsWith("/home")) return NextResponse.redirect("/admin");

    } catch {
      // invalid token → redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|static|favicon.ico).*)"] };
