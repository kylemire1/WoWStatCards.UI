import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>

      <footer className='text-center'>
        <span>
          Powered by <span>.Net Core and NEXT.js</span>
        </span>
      </footer>
    </div>
  );
};

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className='max-w-4xl p-1 m-auto'>{children}</div>;
};

Layout.Container = Container;

export { Layout };
