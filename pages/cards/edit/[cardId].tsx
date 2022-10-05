import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { Layout } from '../../../components/layout'
import StatCard from '../../../components/stat-card'
import StatCardError from '../../../components/stat-card-error'
import SvgBackground from '../../../components/svg-background'
import { StatCardDto, StatDto } from '../../../lib/generated-api/StatCardApi'
import {
  getStatCard,
  useGetCharacterStatsQuery,
  useGetStatCardQuery,
  useUpdateCardMutation,
} from '../../../lib/react-query/fetchers'
import CharacterDisplay from '../../../components/character-display'

type SSRProps = {
  cardId: number
  dehydratedState: DehydratedState
}

export type EditCardParams = {
  cardId?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps, EditCardParams> = async (
  context
) => {
  const params = context.query
  const cardId = params?.cardId

  if (!cardId || typeof cardId !== 'string' || isNaN(+cardId)) {
    return {
      redirect: {
        permanent: false,
        destination: '/cards',
      },
    }
  }

  const queryClient = new QueryClient()
  const numId = +cardId
  await queryClient.prefetchQuery(['statCard', { id: numId }], getStatCard)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      cardId: numId,
    },
  }
}

const EditCard: NextPage<SSRProps> = (props) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()
  const {
    error: updateError,
    mutateAsync: updateCard,
    isLoading: updateIsLoading,
  } = useUpdateCardMutation({ queryClient })
  const { data: charDataFromDb, error: charError } = useGetStatCardQuery(props?.cardId)
  const { data: statData, isLoading: statDataIsLoading } = useGetCharacterStatsQuery({
    characterName: charDataFromDb?.characterName ?? '',
    realm: charDataFromDb?.realm ?? '',
  })
  console.log(charDataFromDb)

  if (
    (!statDataIsLoading && !statData) ||
    charError instanceof Error ||
    !charDataFromDb
  ) {
    return <StatCardError />
  }

  const handleUpdateCard: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const cardName = formData.get('card-name')

    if (typeof cardName !== 'string') return

    const statCardDto = StatCardDto.fromJS({
      ...charDataFromDb,
      cardName,
    })

    const result = await updateCard({
      cardId: statCardDto.id,
      statCardDto: statCardDto,
    })

    if (typeof result?.id === 'number') {
      router.push('/cards')
    }
  }

  const selectedStats = charDataFromDb
    ? Object.entries(charDataFromDb)
        .filter(([key, value]) => {
          console.log([key, value])
          return value !== null && key !== 'id'
        })
        .map(([key]) => key)
    : []

  const charData = {
    ...charDataFromDb,
    ...statData,
  }

  const mergedDataDto = StatDto.fromJS(charData)
  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    cardName,
    ...stats
  } = charData

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Edit</h1>
        {charData && (
          <>
            <CharacterDisplay selectedStats={selectedStats} charData={mergedDataDto} />
            <div className='rounded-lg p-8 my-8 shadow-2xl shadow-slate-300 bg-white'>
              <form ref={formRef} method='post' onSubmit={handleUpdateCard}>
                <fieldset disabled={updateIsLoading}>
                  <div className='my-8'>
                    <label htmlFor='card-name' className='font-bold'>
                      Card Name
                    </label>
                    <br />
                    <input
                      id='card-name'
                      name='card-name'
                      type='text'
                      defaultValue={cardName}
                    />
                  </div>
                  <button type='submit'>Update Card</button>
                </fieldset>
                {updateError instanceof Error && <div>{updateError.message}</div>}
              </form>
            </div>
          </>
        )}
      </Layout.Container>
    </Layout>
  )
}

export default EditCard
