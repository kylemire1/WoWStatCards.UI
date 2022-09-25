import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Layout } from "../../components/layout";
import StatCard from "../../components/stat-card";
import StatCardError from "../../components/stat-card-error";
import { FactionEnum, StatCardDto } from "../../lib/generated-api/StatCardApi";
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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleSaveCard: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const cardName = formData.get("card-name");

    if (typeof cardName !== "string") return;

    const statCardDto = new StatCardDto({
      ...charData,
      cardName,
    });

    const result = await saveCard(statCardDto);

    if (typeof result?.id === "number") {
      router.push("/cards");
    }
  };

  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    ...stats
  } = charData;

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Create</h1>
        {charData && (
          <StatCard>
            <h2 className='text-2xl font-bold'>{characterName}</h2>
            <div className='flex gap-2'>
              <div className='grid grid-cols-3 mb-2 gap-4'>
                {Object.entries(stats).map(([statName, value]) => {
                  return (
                    <div key={`${statName}_${value}`}>
                      <span className='font-bold block'>{statName}</span>
                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>
              <div className='relative render-wrapper w-full max-w-[260px]'>
                <img
                  className='absolute inset-0 h-full object-cover drop-shadow-xl'
                  src={renderUrl}
                  alt={characterName}
                />
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
          </StatCard>
        )}
      </Layout.Container>
    </Layout>
  );
};

export default CreateCards;
