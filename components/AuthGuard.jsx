'use client'

import { useWholeApp } from "./AuthContextAPI"



const { default: axios } = require("axios")
const { useRouter, usePathname } = require("next/navigation")
const { useEffect, useState } = require("react")


const AuthGuard = () => {
  const router = useRouter()
  const pathname = usePathname()
     const [token, settoken] = useState(null)
  const { fetchedUserData } = useWholeApp()
  // console.log(fetchedUserData)

  useEffect(() => {
    const fetchAuthorizeToken = async () => {
      try {
        const resp = await axios.get('/api/auth/user')
        settoken(resp?.data?.user)
      } catch (error) {
        console.error('Token fetch error:', error)
        settoken(null)
      }
    }
    fetchAuthorizeToken()
  }, [pathname])
useEffect(() => {
  // 1. Still loading → do nothing
  if (token === null || fetchedUserData === null) return;

  const isPublicPage = pathname === '/login' ||pathname === '/';
  const isLoggedIn = !!token?.id; // true if token exists
  const role = fetchedUserData?.user?.role;
  // 2. If NOT logged in
  if (!isLoggedIn) {
    if (!isPublicPage) {
      router.push('/login'); // always go to login first
    }
    return;
  }

  // 3. If logged in but tries to visit login page → send to home
  if (isLoggedIn && pathname === '/login') {
    if (role === 'student') {
      router.push('/home');
    } else if (role === 'teacher') {
      router.push('/admin');
    }
    return;
  }

 if (role === 'student' && pathname.startsWith('/admin')) {
    router.push('/home');
  } else if (role === 'teacher' && pathname.startsWith('/home')) {
    router.push('/admin');
  }

}, [token, fetchedUserData, pathname, router]);

  return null

}
export default AuthGuard