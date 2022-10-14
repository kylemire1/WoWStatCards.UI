import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { accountClient } from 'lib/generated-api/api-clients'
import type { NextAuthOptions } from 'next-auth/core/types'

// import GithubProvider from 'next-auth/providers/github'
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log({ credentials, req })
        if (!credentials?.email || !credentials.password) return null

        // Add logic here to look up the user from the credentials supplied
        const response = await accountClient.login(credentials)
        console.log({ response })
        if (response.isSuccess) {
          // Any object returned will be saved in `user` property of the JWT
          return response.result
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, accessToken: token.accessToken }
    },
  },
}
export default NextAuth(authOptions)
