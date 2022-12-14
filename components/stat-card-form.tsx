import { useUser } from '@auth0/nextjs-auth0'
import { HIDDEN_STAT_NAMES } from 'lib/constants'
import React from 'react'
import { camelCaseToTitle } from '../lib/utils'
import ErrorAlert from './error-alert'

type StatCardFormProps<T extends object> = {
  cardNameValue: string
  statData: T
  selectedStats: Array<string>
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleStatCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFormSubmit: React.FormEventHandler<HTMLFormElement>
  maxChecked?: number
  disableAllInputs?: boolean
  defaultChecked?: (statName: string) => boolean
  error?: unknown
}
function StatCardForm<T extends object>({
  cardNameValue,
  handleFormSubmit,
  disableAllInputs,
  handleNameChange,
  handleStatCheckboxChange,
  statData,
  selectedStats,
  defaultChecked,
  maxChecked = 8,
  error,
}: StatCardFormProps<T>) {
  const { user } = useUser()
  return (
    <form method='post' onSubmit={handleFormSubmit}>
      <fieldset disabled={disableAllInputs}>
        <div className='my-8'>
          <label htmlFor='card-name' className='font-bold'>
            Card Name
          </label>
          <br />
          <input
            value={cardNameValue}
            onChange={handleNameChange}
            id='card-name'
            name='card-name'
            type='text'
            className='rounded w-full focus:ring-offset-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:ring-offset-white'
          />
        </div>
        <fieldset className='mb-4'>
          <legend className='mb-4'>
            Stats to Display (Choose up to {maxChecked})
          </legend>
          <div className='grid gap-2 md:grid-cols-2'>
            {Object.keys(statData)
              .filter((s) => !HIDDEN_STAT_NAMES.includes(s))
              .map((statName) => {
                return (
                  <label
                    key={`stat_${statName}`}
                    className={
                      !selectedStats.includes(statName) &&
                      selectedStats.length === maxChecked
                        ? 'opacity-50'
                        : 'opacity-100'
                    }
                  >
                    <input
                      type='checkbox'
                      name={statName}
                      value={statName}
                      className='mr-2 disabled:opacity-50'
                      onChange={handleStatCheckboxChange}
                      disabled={
                        !selectedStats.includes(statName) &&
                        selectedStats.length === maxChecked
                      }
                      defaultChecked={
                        defaultChecked ? defaultChecked(statName) : undefined
                      }
                    />
                    {camelCaseToTitle(statName)}
                  </label>
                )
              })}
          </div>
        </fieldset>
        <button
          className={`focus:ring-blue-500 focus:outline-none focus:border-transparent  focus:ring focus:ring-offset-2 focus-ring-offset-white disabled:opacity-50 ${
            !user ? 'opacity-50' : null
          }`}
          type='submit'
        >
          Save Card
        </button>
      </fieldset>
      {error instanceof Error && <ErrorAlert>{error.message}</ErrorAlert>}
    </form>
  )
}

export default StatCardForm
