import React from 'react'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <ul className='fixed top-0 left-0 z-50 right-0 flex gap-2 justify-end backdrop-filter backdrop-blur-md px-4 py-6 font-bold'>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href='/api/auth/signin'>
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href='/cards'>
              <a>Saved Cards</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main className='py-24 min-h-[95vh]'>{children}</main>

      <footer className='text-center'>
        <span>
          Powered by <span>.Net Core and NEXT.js</span>
        </span>
      </footer>
    </>
  )
}

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-4xl px-4 md:px-2 m-auto'>{children}</div>
}

Layout.Container = Container

export { Layout }
