import { useIsFetching } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FormEventHandler } from "react";
import { Layout } from "../components/layout";

const Home: NextPage = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const characterName = formData.get("characterName");
    const realm = formData.get("realm");

    if (typeof characterName !== "string" || typeof realm !== "string") {
      return;
    }

    router.push(`/cards/create?characterName=${characterName}&realm=${realm}`);
  };

  return (
    <Layout>
      <Layout.Container>
        <h1 className='font-bold text-4xl'>Character Finder</h1>
        <p>Find a World of Warcraft character by their name and realm.</p>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor='characterName'>Character Name</label>
              <br />
              <input
                id='characterName'
                name='characterName'
                type='text'
                required
              />
            </div>
            <div>
              <label htmlFor='realm'>Realm</label>
              <br />
              <input id='realm' name='realm' type='text' required />
            </div>
          </div>
          <div>
            <button type='submit'>Search</button>
          </div>
        </form>
      </Layout.Container>
    </Layout>
  );
};

export default Home;
