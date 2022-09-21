import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Layout } from "../../components/layout";
import { fetchCharacterStats } from "../../lib/react-query/fetchers";

type SSRProps = {
  characterName: string;
  realm: string;
  dehydratedState: DehydratedState;
};

type Params = {
  characterName?: string;
  realm?: string;
};

type CreateServerSideProps = GetServerSideProps<SSRProps, Params>;

export const getServerSideProps: CreateServerSideProps = async (context) => {
  const params = context.query;
  const characterName = params?.characterName;
  const realm = params?.realm;

  if (typeof characterName !== "string" || typeof realm !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["characterStats", { characterName, realm }],
    fetchCharacterStats
  );
  console.log(queryClient);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      characterName,
      realm,
    },
  };
};

const Create: NextPage<SSRProps> = ({ characterName, realm }) => {
  const { isLoading, error, data } = useQuery(
    ["characterStats", { characterName, realm }],
    fetchCharacterStats
  );

  return (
    <Layout>
      <h1 className='font-bold text-4xl'>Create</h1>
      <div>{JSON.stringify(data, null, 2)}</div>
    </Layout>
  );
};

export default Create;
