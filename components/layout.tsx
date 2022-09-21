import Link from "next/link";
import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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
