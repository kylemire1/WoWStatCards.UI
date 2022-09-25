import { useRouter } from "next/router";
import React, { FormEventHandler } from "react";

const HeroSearch = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    console.log("hello?");

    const formData = new FormData(formRef.current);
    const characterName = formData.get("characterName");
    const realm = formData.get("realm");

    if (typeof characterName !== "string" || typeof realm !== "string") {
      return;
    }

    router.push(`/cards/create?characterName=${characterName}&realm=${realm}`);
  };

  return (
    <div className='mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl'>
      <div className='relative overflow-hidden rounded-2xl bg-blue-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20'>
        <div
          aria-hidden='true'
          className='absolute inset-0 -mt-72 sm:-mt-32 md:mt-0'
        >
          <svg
            className='absolute inset-0 h-full w-full'
            preserveAspectRatio='xMidYMid slice'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 1463 360'
          >
            <path
              className='text-blue-400 text-opacity-40'
              fill='currentColor'
              d='M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z'
            />
            <path
              className='text-blue-600 text-opacity-40'
              fill='currentColor'
              d='M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z'
            />
          </svg>
        </div>
        <div className='relative'>
          <div className='sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Character Finder
            </h2>
            <p className='mx-auto mt-6 max-w-2xl text-lg text-slate-100'>
              Find a World of Warcraft character by their name and realm.
            </p>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 sm:mx-auto flex flex-col gap-4 sm:max-w-lg'
          >
            <div className='min-w-0 flex-1'>
              <label htmlFor='characterName' className='sr-only'>
                Character Name
              </label>
              <input
                id='characterName'
                type='characterName'
                name='characterName'
                className='block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500'
                placeholder='Character Name'
                required
              />
            </div>
            <div className='min-w-0 flex-1'>
              <label htmlFor='realm' className='sr-only'>
                Realm
              </label>
              <input
                id='realm'
                type='realm'
                name='realm'
                className='block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500'
                placeholder='Realm'
                required
              />
            </div>
            <div className=''>
              <button
                type='submit'
                className='block w-full rounded-md border border-transparent bg-gray-900 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 sm:px-10'
              >
                Find Character
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
