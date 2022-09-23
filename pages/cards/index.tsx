import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { Layout } from "../../components/layout";
import { listStatCards } from "../../lib/react-query/fetchers";

type SSRProps = {
  dehydratedState: DehydratedState;
};

type CardsServerSideProps = GetServerSideProps<SSRProps>;

export const getServerSideProps: CardsServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["statCards"], listStatCards);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Cards = () => {
  const { error: cardsError, data: cardsData } = useQuery(
    ["statCards"],
    listStatCards
  );

  if (cardsError instanceof Error) {
    <Layout>
      <h1 className='font-bold text-4xl'>Cards</h1>
      <div>
        <h2>Sorry!</h2>
        <p>There was a problem getting your stat cards.</p>
        <p>{cardsError.message}</p>
      </div>
    </Layout>;
  }

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl mb-4'>Cards</h1>
        <div className='flex flex-col w-full gap-4'>
          {cardsData?.map((c) => {
            return (
              <div key={`stat_card_${c.id}`}>
                <div className='grid grid-cols-[75px_1fr] items-center'>
                  <div>
                    <Image src={c.avatarUrl} width='64' height='64' />
                  </div>
                  <div>
                    <h2 className='text-xl font-bold'>{c.cardName}</h2>
                    <ul>
                      <li>Character: {c.characterName}</li>
                      <li>
                        Faction: {c.factionId === 1 ? "Alliance" : "Horde"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout.Container>
    </Layout>
  );
};

export default Cards;
