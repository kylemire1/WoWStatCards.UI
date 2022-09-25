import Link from "next/link";
import React from "react";
import ErrorBoundary from "./error-boundary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>
        <Layout.Container>
          <ul className='flex gap-2 justify-end'>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/cards'>
                <a>Saved Cards</a>
              </Link>
            </li>
          </ul>
        </Layout.Container>
      </nav>
      <main>{children}</main>

      <footer className='text-center mt-24'>
        <span>
          Powered by <span>.Net Core and NEXT.js</span>
        </span>
      </footer>
    </>
  );
};

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-4xl p-4 md:p-2 m-auto'>{children}</div>;
};

Layout.Container = Container;

export { Layout };
