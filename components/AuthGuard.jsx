'use client'

import { useWholeApp } from "./AuthContextAPI"
import axios from "axios"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const AuthGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { fetchedUserData } = useWholeApp()
  const [token, setToken] = useState(undefined) // undefined = still loading

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const resp = await axios.get('/api/auth/user', { withCredentials: true })
        setToken(resp?.data?.user || null)
      } catch {
        setToken(null)
      }
    }
    fetchToken()
  }, [pathname])

  useEffect(() => {
    if (token === undefined || fetchedUserData === undefined) return // still loading

    const isPublicPage = pathname === '/login' || pathname === '/'
    const isLoggedIn = !!token?.id
    const role = fetchedUserData?.user?.role
// console.log(role)
    // No token → redirect immediately
    if (!isLoggedIn && !isPublicPage) {
      router.replace('/login')
      return
    }

    // Logged in trying to access login → redirect based on role
    if (isLoggedIn && pathname === '/login') {
      if (role === 'student') router.replace('/home')
      else if (role === 'teacher') router.replace('/admin')
      else if (role === 'superadmin') router.replace('/superadmin')
      return
    }

    // Role-based protection
   if (
  role === 'student' &&
  (pathname.startsWith('/admin') || pathname.startsWith('/superadmin'))
) {
  router.replace('/home')
}

if (
  role === 'teacher' &&
  (pathname.startsWith('/home') || pathname.startsWith('/superadmin'))
) {
  router.replace('/admin')
}

if (
  role === 'superadmin' &&
  (pathname.startsWith('/home') || pathname.startsWith('/admin'))
) {
  router.replace('/superadmin')
}


  }, [token, fetchedUserData, pathname, router])

  // Block UI until auth resolves
  if (token === undefined) return null

  return null
}

export default AuthGuard
