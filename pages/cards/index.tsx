import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Layout } from "../../components/layout";
import {
  listStatCards,
  useDeleteStatCardMutation,
  useGetAllStatCardsQuery,
} from "../../lib/react-query/fetchers";

type SSRProps = {
  dehydratedState: DehydratedState;
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["statCards"], listStatCards);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Cards: NextPage = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCard } = useDeleteStatCardMutation({
    queryClient,
  });
  const { error: cardsError, data: cardsData } = useGetAllStatCardsQuery();

  if (cardsError instanceof Error) {
    return (
      <Layout>
        <h1 className='font-bold text-4xl'>Cards</h1>
        <div>
          <h2>Sorry!</h2>
          <p>There was a problem getting your stat cards.</p>
          <p>{cardsError.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl mb-4'>Cards</h1>
        <div className='flex flex-col w-full gap-4'>
          {cardsData?.map((c) => {
            return (
              <div key={`stat_card_${c.id}`} className='flex gap-4'>
                <Link href={`/card/edit/${c.id}`}>
                  <a className='block rounded-lg shadow-slate-200 shadow-lg hover:outline hover:outline-solid hover:outline-blue-500 outline-2 outline-offset-2 w-min p-4'>
                    <div className='grid grid-cols-[75px_150px] items-center'>
                      <div>
                        <Image
                          alt={c.characterName}
                          src={c.avatarUrl}
                          width='64'
                          height='64'
                        />
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
                  </a>
                </Link>
                <button onClick={() => deleteCard(c.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </Layout.Container>
    </Layout>
  );
};

export default Cards;
