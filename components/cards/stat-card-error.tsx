import Link from "next/link";
import React from "react";
import { Layout } from "components/shared/layout";
import StatCard from "./stat-card";

type StatCardErrorProps = { characterName?: string; realm?: string };
const StatCardError = (props: StatCardErrorProps) => {
  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Create</h1>
        <StatCard>
          <div className='text-slate-100 text-center h-full flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-bold'>Sorry!</h2>
            <p>
              There was a problem finding that character.
              <br />
              Please verify you entered the correct name and realm, then{" "}
              <Link href='/'>
                <a className='underline '>try again</a>
              </Link>
              .
            </p>

            {Boolean(props.characterName) && Boolean(props.realm) ? (
              <>
                <br />
                <p>
                  <span className='font-bold'>You entered:</span>
                  <br />
                  <ul>
                    <li>Character Name: {props.characterName}</li>
                    <li>Realm: {props.realm}</li>
                  </ul>
                </p>
              </>
            ) : null}
          </div>
        </StatCard>
      </Layout.Container>
    </Layout>
  );
};

export default StatCardError;
