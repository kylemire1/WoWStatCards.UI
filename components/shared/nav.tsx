import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav>
      <ul className='fixed top-0 left-0 z-50 right-0 flex gap-2 justify-end backdrop-filter backdrop-blur-md px-4 py-6 font-bold'>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/login'>
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
  );
};

export default Nav;
