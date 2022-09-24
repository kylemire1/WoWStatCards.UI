import { useIsFetching } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEventHandler } from "react";
import HeroSearch from "../components/hero-search";
import { Layout } from "../components/layout";

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
