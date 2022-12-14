import React, { useState } from 'react'
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Layout } from 'components/layout'
import StatCardError from 'components/stat-card-error'
import { CharacterStats, StatCardDto } from 'lib/generated-api/StatCardApi'
import CharacterDisplay from 'components/character-display'
import StatCardForm from 'components/stat-card-form'
import { HIDDEN_STAT_NAMES } from 'lib/constants'
import {
  useUpdateCardMutation,
  useGetStatCardQuery,
  useGetCharacterStatsQuery,
  QueryKeyEnum,
} from 'lib/react-query/hooks'
import { StatDto } from 'lib/generated-api/custom-types'
import { StatCards } from 'lib/react-query/entities'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'

type SSRProps = {
  cardId: number
  dehydratedState: DehydratedState
}

export type EditCardParams = {
  cardId?: string
}

export const getServerSideProps: GetServerSideProps<SSRProps, EditCardParams> =
  withPageAuthRequired({
    getServerSideProps: async (context) => {
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
      await queryClient.prefetchQuery(
        [QueryKeyEnum.StatCardsGet, { id: numId }],
        StatCards.queries.get
      )

      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          cardId: numId,
        },
      }
    },
  })

const EditCard: NextPage<SSRProps> = (props) => {
  const { user } = useUser()
  const router = useRouter()
  const queryClient = useQueryClient()
  const {
    error: updateError,
    mutateAsync: updateCard,
    isLoading: updateIsLoading,
  } = useUpdateCardMutation({ queryClient })
  const { data: charDataFromDb, error: charError } = useGetStatCardQuery(
    props?.cardId
  )
  const { data: statData, isLoading: statDataIsLoading } =
    useGetCharacterStatsQuery({
      characterName: charDataFromDb?.characterName ?? '',
      realm: charDataFromDb?.realm ?? '',
    })
  const [cardNameInputValue, setCardNameInputValue] = useState(
    charDataFromDb?.cardName ?? ''
  )
  const [selectedStatsForUpdate, setSelectedStatsForUpdate] = useState<
    Array<string>
  >(
    charDataFromDb
      ? Object.entries(charDataFromDb)
          .filter(([key, value]) => {
            return value !== null && !HIDDEN_STAT_NAMES.includes(key)
          })
          .map(([key]) => key)
      : []
  )

  if (
    (!statDataIsLoading && !statData) ||
    charError instanceof Error ||
    !charDataFromDb
  ) {
    return <StatCardError />
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNameInputValue(e.target.value)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked

    if (checked) {
      setSelectedStatsForUpdate([...selectedStatsForUpdate, e.target.value])
      return
    }

    setSelectedStatsForUpdate([
      ...selectedStatsForUpdate.filter((s) => s !== e.target.value),
    ])
  }

  const handleUpdateCard: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault()

    if (!statData || !charDataFromDb.id) return

    const updatedStatCardData: StatCardDto = selectedStatsForUpdate.reduce(
      (prevValue, currValue) => {
        const statCopy = { ...statData }
        prevValue[currValue] = statCopy[currValue as keyof CharacterStats]

        return prevValue
      },
      {
        id: charDataFromDb.id,
        cardName: charDataFromDb.cardName,
        characterName: charDataFromDb.characterName,
        avatarUrl: charDataFromDb.avatarUrl,
        renderUrl: charDataFromDb.renderUrl,
        realm: charDataFromDb.realm,
        factionId: charDataFromDb.factionId,
      } as any
    )

    const statCardDto: StatCardDto = {
      ...updatedStatCardData,
      cardName: cardNameInputValue,
      userEmail: user?.email ?? '',
    }

    const result = await updateCard({
      cardId: statCardDto.id,
      statCardDto: statCardDto,
    })

    if (typeof result?.id === 'number') {
      router.push('/cards')
    }
  }

  const charData = {
    ...charDataFromDb,
    ...statData,
  }

  const mergedDataDto: StatDto = charData
  const { avatarUrl, renderUrl, cardName, id, factionId, realm, ...stats } =
    charData

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Edit</h1>
        {charData && (
          <>
            <CharacterDisplay
              selectedStats={selectedStatsForUpdate}
              charData={mergedDataDto}
            />
            <div className='rounded-lg p-8 my-8 shadow-2xl shadow-slate-300 bg-white'>
              <StatCardForm
                cardNameValue={cardNameInputValue}
                statData={stats}
                selectedStats={selectedStatsForUpdate}
                handleNameChange={handleNameChange}
                handleStatCheckboxChange={handleCheckbox}
                handleFormSubmit={handleUpdateCard}
                disableAllInputs={updateIsLoading}
                defaultChecked={(statName) => {
                  return (
                    charDataFromDb[statName as keyof typeof charDataFromDb] !==
                      null && statName !== 'id'
                  )
                }}
                error={updateError}
              />
            </div>
          </>
        )}
      </Layout.Container>
    </Layout>
  )
}

export default withPageAuthRequired(EditCard)
