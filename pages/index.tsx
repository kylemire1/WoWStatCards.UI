import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEventHandler, useState } from "react";
import { Layout } from "../components/layout";
import { fetchCharacterStats } from "../lib/react-query/fetchers";

const Home: NextPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);

    const formData = new FormData(formRef.current);
    const characterName = formData.get("characterName");
    const realm = formData.get("realm");

    if (typeof characterName !== "string" || typeof realm !== "string") {
      setSubmitting(false);
      return;
    }

    router.push(`/cards/create?characterName=${characterName}&realm=${realm}`);
    setSubmitting(false);
  };

  return (
    <Layout>
      <div>
        <h1 className='font-bold text-4xl'>Character Finder</h1>
        <p>Find a World of Warcraft character by their name and realm.</p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <fieldset disabled={submitting}>
            <div>
              <div>
                <label htmlFor='characterName'>Character Name</label>
                <br />
                <input id='characterName' name='characterName' type='text' />
              </div>
              <div>
                <label htmlFor='realm'>Realm</label>
                <br />
                <input id='realm' name='realm' type='text' />
              </div>
            </div>
            <div>
              <button type='submit'>Search</button>
            </div>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
