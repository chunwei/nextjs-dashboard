import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login'
  },
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')
      if (isOnDashboard) {
        return isLoggedIn
      }

      if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl))
      }

      return true
    }
  }
}
