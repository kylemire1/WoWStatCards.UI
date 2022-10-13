import type { NextPage } from "next";
import React from "react";
import HeroSearch from "components/home/hero-search";
import { Layout } from "components/shared/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Layout.Container>
        <HeroSearch />
      </Layout.Container>
    </Layout>
  );
};

export default Home;
