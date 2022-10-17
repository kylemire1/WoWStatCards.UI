import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CharacterDisplay from '../../components/character-display'
import { Layout } from '../../components/layout'
import StatCardError from '../../components/stat-card-error'
import StatCardForm from '../../components/stat-card-form'
import { StatCardDto } from '../../lib/generated-api/StatCardApi'
import { statCardsFetchers } from '../../lib/react-query/fetchers'
import {
  useSaveStatCardMutation,
  useGetCharacterStatsQuery,
  QueryKeyEnum,
} from '../../lib/react-query/hooks'

type SSRProps = {
  characterName: string
  realm: string
  dehydratedState: DehydratedState
}

type CreateCardParams = {
  characterName?: string
  realm?: string
}

export const getServerSideProps: GetServerSideProps<
  SSRProps,
  CreateCardParams
> = async (context) => {
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

  const queryClient = new QueryClient({})

  await queryClient.prefetchQuery(
    [QueryKeyEnum.getCharacterStats, { characterName, realm }],
    statCardsFetchers.queries.getCharacterStats
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      characterName,
      realm,
    },
  }
}

const CreateCards: NextPage<SSRProps> = (props) => {
  const [cardName, setCardName] = useState('')
  const [selectedStats, setSelectedStats] = useState<Array<string>>([])
  const router = useRouter()
  const {
    error: saveError,
    mutateAsync: saveCard,
    isLoading: saveIsLoading,
  } = useSaveStatCardMutation()
  const { error: charError, data: charData } = useGetCharacterStatsQuery({
    characterName: props.characterName,
    realm: props.realm,
  })

  if (!charData || charError instanceof Error) {
    return <StatCardError characterName={props.characterName} realm={props.realm} />
  }

  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    realm,
    factionId,
    ...stats
  } = charData

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked

    if (checked) {
      setSelectedStats([...selectedStats, e.target.value])
      return
    }

    setSelectedStats([...selectedStats.filter((s) => s !== e.target.value)])
  }

  const handleSaveCard: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (cardName === '' || selectedStats.length === 0) return

    const statCardData: StatCardDto = selectedStats.reduce(
      (prevValue, currValue) => {
        const statCopy: Record<string, number> = { ...stats }
        prevValue[currValue] = statCopy[currValue]

        return prevValue
      },
      {
        cardName,
        characterName,
        avatarUrl,
        renderUrl,
        realm,
        factionId: charData.factionId,
      } as any
    )

    const result = await saveCard(statCardData)

    if (typeof result.id === 'number') {
      router.push('/cards')
    }
  }

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Create</h1>
        {charData && (
          <>
            <CharacterDisplay selectedStats={selectedStats} charData={charData} />
            <div className='rounded-lg p-8 my-8 shadow-2xl shadow-slate-300 bg-white'>
              <StatCardForm
                cardNameValue={cardName}
                statData={stats}
                selectedStats={selectedStats}
                handleNameChange={handleNameChange}
                handleStatCheckboxChange={handleCheckbox}
                handleFormSubmit={handleSaveCard}
                disableAllInputs={saveIsLoading}
                error={saveError}
              />
            </div>
          </>
        )}
      </Layout.Container>
    </Layout>
  )
}

export default CreateCards
