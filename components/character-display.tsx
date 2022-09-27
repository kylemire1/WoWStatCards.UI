import React from 'react'
import Image from 'next/image'
import StatCard from './stat-card'
import SvgBackground from './svg-background'
import { StatDto } from '../lib/generated-api/StatCardApi'
import { camelCaseToTitle } from '../lib/utils'

type CharacterDisplayProps = {
  charData: StatDto
  selectedStats: Array<string>
}
const CharacterDisplay = ({ charData, selectedStats }: CharacterDisplayProps) => {
  const {
    avatarUrl,
    renderUrl,
    characterName: characterName,
    realm,
    factionId,
    ...stats
  } = charData

  const selectedStatEntries = selectedStats.map((statName) => {
    const statKey = statName as keyof typeof stats
    const statValue = stats[statKey]
    if (statValue === undefined || typeof statValue === 'string') return

    return [camelCaseToTitle(statName), Math.round(statValue)]
  })

  return (
    <div>
      <StatCard>
        <SvgBackground />
        <div className='absolute flex items-center top-0 bottom-0 left-10 right-10'>
          {renderUrl ? (
            <Image
              src={renderUrl}
              layout='fill'
              className='drop-shadow-lg'
              alt={`${characterName}'s appearance`}
            />
          ) : null}
          <div className='grid grid-cols-2 gap-28 sm:gap-64 md:gap-72 my-0 mx-auto w-full z-40'>
            <ul className='text-slate-100 text-right flex flex-col gap-2 md:gap-4'>
              <StatItem stat={selectedStatEntries[0]} />
              <StatItem stat={selectedStatEntries[1]} />
              <StatItem stat={selectedStatEntries[2]} />
              <StatItem stat={selectedStatEntries[3]} />
            </ul>
            <ul className='text-slate-100  flex flex-col gap-2 md:gap-4'>
              <StatItem stat={selectedStatEntries[4]} />
              <StatItem stat={selectedStatEntries[5]} />
              <StatItem stat={selectedStatEntries[6]} />
              <StatItem stat={selectedStatEntries[7]} />
            </ul>
          </div>
        </div>
      </StatCard>
    </div>
  )
}

const StatItem = ({
  stat,
}: {
  stat: Array<string | number | undefined> | undefined
}) => {
  if (stat === undefined || stat.length !== 2) return null

  return (
    <li>
      <span className='text-blue-500 font-bold block text-[10px] sm:text-xl md:text-3xl '>
        {stat[0]}
      </span>{' '}
      <span className='text-sm md:text-lg lg:text-xl'>{stat[1]}</span>
    </li>
  )
}

export default CharacterDisplay
