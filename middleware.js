import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get cookie
  const token = req.cookies.get("authtoken")?.value;

  // Public routes (accessible without login)
  const publicPaths = ["/", "/login"];

  // If no token and trying to access protected route → redirect to login
  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (token) {
    try {
      // Verify & decode token
      const secret = new TextEncoder().encode(process.env.Secretkey);
      const { payload } = await jwtVerify(token, secret);

      const role = payload.role;
      // console.log(payload)
      // If logged in and tries to visit /login → redirect to role-based dashboard
      if (pathname === "/login") {
        if (role === "student") {
          return NextResponse.redirect(new URL("/home", req.url));
        } else if (role === "teacher") {
          return NextResponse.redirect(new URL("/admin", req.url));
        } else if (role === "superadmin") {
          return NextResponse.redirect(new URL("/superadmin", req.url));
        }
      }

      // Prevent role mismatch
      if (role === "student" && pathname.startsWith("/admin") || role === "student" && pathname.startsWith("/superadmin")) {
        return NextResponse.redirect(new URL("/home", req.url));
      }
      if (role === "teacher" && pathname.startsWith("/home") || role === "teacher" && pathname.startsWith("/superadmin")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (role === "superadmin" && pathname.startsWith("/home") || role === "superadmin" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/superadmin", req.url));
      }
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      // Invalid/expired token → redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Match all routes except static files and APIs
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
