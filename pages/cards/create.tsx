import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { Layout } from '../../components/layout'
import { FactionEnum, StatCardDto } from '../../lib/generated-api/StatCardApi'
import {
  fetchCharacterStats,
  useGetCharacterStatsQuery,
  useSaveStatCardMutation,
} from '../../lib/react-query/fetchers'

type SSRProps = {
  characterName: string
  realm: string
  dehydratedState: DehydratedState
}

export type Params = {
  characterName?: string
  realm?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps, Params> = async (
  context
) => {
  const params = context.query
  const characterName = params?.characterName
  const realm = params?.realm

  if (typeof characterName !== 'string' || typeof realm !== 'string') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    ['characterStats', { characterName, realm }],
    fetchCharacterStats
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      characterName,
      realm,
    },
  }
}

const CreateCards: NextPage<SSRProps> = ({ characterName, realm }) => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const {
    error: saveError,
    mutateAsync: saveCard,
    isLoading: saveIsLoading,
  } = useSaveStatCardMutation()
  const { error: charError, data: charData } = useGetCharacterStatsQuery({
    characterName,
    realm,
  })

  if (!charData || charError instanceof Error) {
    return (
      <Layout>
        <Layout.Container>
          <h1 className='font-bold text-4xl'>Create</h1>
          <Wrapper>
            <h2 className='text-2xl font-bold'>Sorry!</h2>
            <p>
              There was a problem finding that character. Please verify you entered the
              correct name and realm, then try again.
            </p>
            {charError instanceof Error && <p>Error Message: {charError.message}</p>}
            <br />
            <p>
              <span className='font-bold'>You entered:</span>
              <br />
              <ul>
                <li>Character Name: {characterName}</li>
                <li>Realm: {realm}</li>
              </ul>
            </p>
          </Wrapper>
        </Layout.Container>
      </Layout>
    )
  }

  const handleSaveCard: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const cardName = formData.get('card-name')

    if (typeof cardName !== 'string') return

    const statCardDto = new StatCardDto({
      ...charData,
      cardName,
      factionId: FactionEnum.Alliance,
    })

    return saveCard(statCardDto).then((r) => {
      if (typeof r.id === 'number') {
        router.push('/cards')
      }
    })
  }

  const { avatarUrl, renderUrl, characterName: charName, ...stats } = charData

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Create</h1>
        {charData && (
          <Wrapper>
            <h2 className='text-2xl font-bold'>{characterName}</h2>
            <div className='flex gap-2'>
              <div className='grid grid-cols-3 mb-2 gap-4'>
                {Object.entries(stats).map(([statName, value]) => {
                  return (
                    <div key={`${statName}_${value}`}>
                      <span className='font-bold block'>{statName}</span>
                      <span>{value}</span>
                    </div>
                  )
                })}
              </div>
              <div className='relative render-wrapper'>
                <Image src={renderUrl} alt={charName} width={275} height={485} />
              </div>
            </div>

            <form ref={formRef} method='post' onSubmit={handleSaveCard}>
              <fieldset disabled={saveIsLoading}>
                <div className='my-8'>
                  <label htmlFor='card-name' className='font-bold'>
                    Card Name
                  </label>
                  <br />
                  <input id='card-name' name='card-name' type='text' />
                </div>
                <button type='submit'>Save Card</button>
              </fieldset>
              {saveError instanceof Error && <div>{saveError.message}</div>}
            </form>
          </Wrapper>
        )}
      </Layout.Container>
    </Layout>
  )
}

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className='border border-solid rounded-lg border-black p-8'>{children}</div>
)

export default CreateCards
