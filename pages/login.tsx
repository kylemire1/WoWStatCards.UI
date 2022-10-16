import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'components/layout'
import { useLoginMutation } from 'lib/react-query/hooks'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Login = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutateAsync: loginUser, isSuccess: loginIsSuccess } = useLoginMutation({
    queryClient,
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    if (!formRef.current) return
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const email = formData.get('email')
    const password = formData.get('password')

    if (typeof email !== 'string' || typeof password !== 'string') {
      return
    }

    try {
      await loginUser({ email, password })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (loginIsSuccess) {
      router.replace('/')
    }
  }, [loginIsSuccess, router])

  return (
    <Layout>
      <Layout.Container>
        <form ref={formRef} method='POST' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email</label>
            <br />
            <input type='email' name='email' id='email' />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <br />
            <input type='password' name='password' id='password' />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </Layout.Container>
    </Layout>
  )
}

export default Login
