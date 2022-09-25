import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Layout } from "../../components/layout";
import StatCard from "../../components/stat-card";
import StatCardError from "../../components/stat-card-error";
import SvgBackground from "../../components/svg-background";
import { StatCardDto } from "../../lib/generated-api/StatCardApi";
import {
  fetchCharacterStats,
  useGetCharacterStatsQuery,
  useSaveStatCardMutation,
} from "../../lib/react-query/fetchers";

type SSRProps = {
  characterName: string;
  realm: string;
  dehydratedState: DehydratedState;
};

type CreateCardParams = {
  characterName?: string;
  realm?: string;
};

export const getServerSideProps: GetServerSideProps<
  SSRProps,
  CreateCardParams
> = async (context) => {
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      characterName,
      realm,
    },
  };
};

const CreateCards: NextPage<SSRProps> = (props) => {
  const [cardName, setCardName] = useState("");
  const [selectedStats, setSelectedStats] = useState<Array<string>>([]);
  const router = useRouter();
  const {
    error: saveError,
    mutateAsync: saveCard,
    isLoading: saveIsLoading,
  } = useSaveStatCardMutation();
  const { error: charError, data: charData } = useGetCharacterStatsQuery({
    characterName: props.characterName,
    realm: props.realm,
  });

  if (!charData || charError instanceof Error) {
    return (
      <StatCardError characterName={props.characterName} realm={props.realm} />
    );
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectedStats([...selectedStats, e.target.value]);
      return;
    }

    setSelectedStats([...selectedStats.filter((s) => s !== e.target.value)]);
  };

  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    ...stats
  } = charData;

  const handleSaveCard: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (cardName === "" || selectedStats.length === 0) return;

    const statCardData = selectedStats.reduce<Record<string, number | string>>(
      (prevValue, currValue) => {
        const statCopy: Record<string, number> = { ...stats };
        prevValue[currValue] = statCopy[currValue];

        return prevValue;
      },
      {
        cardName,
        characterName,
        avatarUrl,
        renderUrl,
        factionId: charData.factionId,
      }
    );

    const statCardDto = StatCardDto.fromJS(statCardData);

    const result = await saveCard(statCardDto);

    if (typeof result.id === "number") {
      router.push("/cards");
    }
  };

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Create</h1>
        {charData && (
          <>
            <StatCard>
              <SvgBackground />
              <div className='absolute top-0 bottom-0 left-8 right-8'>
                <Image
                  src={renderUrl}
                  layout='fill'
                  className='drop-shadow-lg'
                />
              </div>
            </StatCard>
            <div className='rounded-lg p-8 my-8 shadow-2xl shadow-slate-300 bg-white'>
              <form method='post' onSubmit={handleSaveCard}>
                <fieldset disabled={saveIsLoading}>
                  <div className='my-8'>
                    <label htmlFor='card-name' className='font-bold'>
                      Card Name
                    </label>
                    <br />
                    <input
                      onChange={handleNameChange}
                      id='card-name'
                      name='card-name'
                      type='text'
                      className='rounded w-full focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-white'
                    />
                  </div>
                  <fieldset className='mb-4'>
                    <legend className='mb-4'>
                      Stats to Display (Choose up to 8)
                    </legend>
                    <div className='grid gap-2 md:grid-cols-2'>
                      {Object.keys(stats).map((statName) => {
                        return (
                          <label key={`stat_${statName}`}>
                            <input
                              type='checkbox'
                              name={statName}
                              value={statName}
                              className='mr-2'
                              onChange={handleCheckbox}
                            />
                            {statName // insert a space before all caps
                              .replace(/([A-Z])/g, " $1")
                              // uppercase the first character
                              .replace(/^./, function (str) {
                                return str.toUpperCase();
                              })}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <button
                    className='focus:ring-blue-500 focus:outline-none focus:border-transparent  focus:ring focus:ring-offset-2 focus-ring-offset-white'
                    type='submit'
                  >
                    Save Card
                  </button>
                </fieldset>
                {saveError instanceof Error && <div>{saveError.message}</div>}
              </form>
            </div>
          </>
        )}
      </Layout.Container>
    </Layout>
  );
};

export default CreateCards;
