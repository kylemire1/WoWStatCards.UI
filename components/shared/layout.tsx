import React from "react";
import { OnlyChildren } from "lib/types";
import Nav from "./nav";

const Layout = ({ children }: OnlyChildren) => {
  return (
    <>
      <Nav />
      <main className='py-24 min-h-[95vh]'>{children}</main>

      <footer className='text-center'>
        <span>
          Powered by <span>.Net Core and NEXT.js</span>
        </span>
      </footer>
    </>
  );
};

export const Container = ({ children }: OnlyChildren) => {
  return <div className='max-w-4xl px-4 md:px-2 m-auto'>{children}</div>;
};

Layout.Container = Container;

export { Layout };
