"use client";

import { useWholeApp } from "./AuthContextAPI";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { fetchedUserData,userId } = useWholeApp();

  const [token, setToken] = useState(undefined); // undefined = still checking

  // Check token on mount + route change
  useEffect(() => {
    const fetchAuthorizeToken = async () => {
      try {
        const resp = await axios.get("/api/auth/user");
        setToken(resp?.data?.user || null);
      } catch {
        setToken(null);
      }
    };
    fetchAuthorizeToken();
  }, [pathname,userId]);

  useEffect(() => {
    if (token === undefined || fetchedUserData === null) return; // still checking

    const isPublicPage = pathname === "/login" || pathname === "/";
    const isLoggedIn = !!token?.id;
    const role = fetchedUserData?.user?.role;

    // Not logged in → block access
    if (!isLoggedIn && !isPublicPage) {
      router.replace("/login");
      return;
    }

    // Logged in but tries to visit /login
    if (isLoggedIn && pathname === "/login") {
      if (role === "student") router.replace("/home");
      else if (role === "teacher") router.replace("/admin");
      else if (role === "superadmin") router.replace("/superadmin");
      return;
    }

    // Role mismatches
    if (role === "student" && pathname.startsWith("/admin")) router.replace("/home");
    if (role === "teacher" && pathname.startsWith("/home")) router.replace("/admin");
    if (role === "superadmin" && (pathname.startsWith("/home") || pathname.startsWith("/admin")))
      router.replace("/superadmin");
  }, [token, fetchedUserData, pathname, router]);

  // Show nothing while checking
  if (token === undefined) {
    return null
  }

  return null;
};

export default AuthGuard;
