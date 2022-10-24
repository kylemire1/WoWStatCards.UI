import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import React from 'react'

const Nav = () => {
  const { user, isLoading } = useUser()

  return (
    <nav>
      <ul className='fixed top-0 left-0 z-50 right-0 flex gap-2 justify-end backdrop-filter backdrop-blur-md px-4 py-6 font-bold'>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        {user ? (
          <li>
            <Link href='/cards'>
              <a>Saved Cards</a>
            </Link>
          </li>
        ) : null}
        <li>
          {!isLoading && !user ? (
            <Link href='/api/auth/login'>
              <a>Login</a>
            </Link>
          ) : null}
          {user ? (
            <Link href='/api/auth/logout'>
              <a>Logout</a>
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  )
}

export default Nav
