import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
        },
      })
    } catch (error) {
      const loginError = error as any
      res
        .status(loginError?.status || 400)
        .end(loginError?.message ?? 'Error logging in to API')
    }
  },
})
