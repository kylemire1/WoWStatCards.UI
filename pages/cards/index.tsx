import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Layout } from 'components/layout'
import { StatCards } from 'lib/react-query/entities'
import {
  QueryKeyEnum,
  useDeleteStatCardMutation,
  useGetAllStatCardsQuery,
} from 'lib/react-query/hooks'

type SSRProps = {
  dehydratedState: DehydratedState
}

export const getServerSideProps: GetServerSideProps<SSRProps> =
  withPageAuthRequired({
    getServerSideProps: async () => {
      const queryClient = new QueryClient()

      await queryClient.prefetchQuery(
        [QueryKeyEnum.StatCardsGetAll],
        StatCards.queries.getAll
      )

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      }
    },
  })

const Cards: NextPage = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteCard } = useDeleteStatCardMutation({
    queryClient,
  })
  const { error: cardsError, data: cardsData } = useGetAllStatCardsQuery()

  if (cardsError instanceof Error) {
    throw cardsError
  }

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl mb-4'>Cards</h1>
        <div className='grid md:grid-cols-2 w-full gap-4'>
          {cardsData?.map((c) => {
            return (
              <div
                key={`stat_card_${c.id}`}
                className='flex flex-col md:flex-row gap-4 bg-white'
              >
                <Link href={`/cards/edit/${c.id}`}>
                  <a className='grow block rounded-lg shadow-slate-200 shadow-lg hover:outline hover:outline-solid hover:outline-blue-500 outline-2 outline-offset-2 p-4'>
                    <div className='grid grid-cols-[75px_1fr] items-center'>
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
                            Faction: {c.factionId === 1 ? 'Alliance' : 'Horde'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                </Link>
                <button
                  className='bg-rose-500 font-bold hover:bg-rose-600'
                  onClick={() => deleteCard(c.id)}
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      </Layout.Container>
    </Layout>
  )
}

export default withPageAuthRequired(Cards)
