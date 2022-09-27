import { useRouter } from 'next/router'
import React, { FormEventHandler } from 'react'
import SvgBackground from './svg-background'

const HeroSearch = () => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const characterName = formData.get('characterName')
    const realm = formData.get('realm')

    if (typeof characterName !== 'string' || typeof realm !== 'string') {
      return
    }

    router.push(`/cards/create?characterName=${characterName}&realm=${realm}`)
  }

  return (
    <div className='mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl'>
      <div className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 shadow-xl sm:px-12 sm:py-20'>
        <SvgBackground />
        <div className='relative'>
          <div className='sm:text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-blue-500 sm:text-4xl'>
              Warcraft Stat Cards
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
                className='block w-full rounded-md border border-transparent bg-blue-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 sm:px-10'
              >
                Find Character
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HeroSearch
