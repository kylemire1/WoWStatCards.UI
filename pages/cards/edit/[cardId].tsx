import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Layout } from "../../../components/layout";
import StatCard from "../../../components/stat-card";
import StatCardError from "../../../components/stat-card-error";
import { StatCardDto } from "../../../lib/generated-api/StatCardApi";
import {
  getStatCard,
  useGetStatCardQuery,
  useUpdateCardMutation,
} from "../../../lib/react-query/fetchers";

type SSRProps = {
  cardId: number;
  dehydratedState: DehydratedState;
};

export type EditCardParams = {
  cardId?: string;
};

export const getServerSideProps: GetServerSideProps<
  SSRProps,
  EditCardParams
> = async (context) => {
  const params = context.query;
  const cardId = params?.cardId;

  if (!cardId || typeof cardId !== "string" || isNaN(+cardId)) {
    return {
      redirect: {
        permanent: false,
        destination: "/cards",
      },
    };
  }

  const queryClient = new QueryClient();
  const numId = +cardId;
  await queryClient.prefetchQuery(["statCard", { id: numId }], getStatCard);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      cardId: numId,
    },
  };
};

const EditCard: NextPage<SSRProps> = (props) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const {
    error: updateError,
    mutateAsync: updateCard,
    isLoading: updateIsLoading,
  } = useUpdateCardMutation({ queryClient });
  const { data: charData, error: charError } = useGetStatCardQuery(
    props?.cardId
  );

  console.log(charData);

  if (!charData || charError instanceof Error) {
    return <StatCardError />;
  }

  const handleUpdateCard: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const cardName = formData.get("card-name");

    if (typeof cardName !== "string") return;

    const statCardDto = new StatCardDto({
      ...charData,
      cardName,
    });

    const result = await updateCard({
      cardId: statCardDto.id,
      statCardDto: statCardDto,
    });

    if (typeof result?.id === "number") {
      router.push("/cards");
    }
  };

  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    cardName,
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
          </StatCard>
        )}
      </Layout.Container>
    </Layout>
  );
};

export default EditCard;
