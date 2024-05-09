import { classNames, getDate, getRandomNum } from '@/shared/lib/utils'
import { useShopStore } from '@/shared/store/shop'

import { EAllGamesIds } from '@/shared/types/main-service/constants'
import type { TCommonStatistics } from '@/shared/store/user'
import type { TAllGames, TGamesStatistics } from '@/shared/types/main-service/mainNsp.types'

import c from './statisticsTab.module.scss'

interface StatisticsTabProps {
   commonStatistics: TCommonStatistics
   gamesStatistics: TGamesStatistics | null
}
export const StatisticsTab = ({ commonStatistics, gamesStatistics }: StatisticsTabProps) => {

   const allGames = useShopStore.getState().allGames

	return (
		<div className={c.statistics} >
			
         <div className={classNames('block', c.block)} >
            <h2 className='block_title' >Общая</h2>

            <p>Вы зарегистрировались : <span>{getDate(commonStatistics?.registerDate || 0, 'Y год, D M в HMS')}</span></p>
            <p>Количество выполненных ежедневных заданий : <span>{commonStatistics?.countCompletedDailyTasks}</span></p>
            <p>Количество всего сыгранных игр : <span>{commonStatistics?.playedGames}</span></p>
            <p>Количество побед во всех играх : <span>{commonStatistics?.countWins}</span></p>
         </div>

         <GameStatistics
            gameName={allGames?.[EAllGamesIds.monopoly]?.gameName}
            statistics={[
               { text: `Количество сыгранных игр : `,
                 value: gamesStatistics?.[EAllGamesIds.monopoly]?.playedGames },
               { text: `Количество побед : `,
                 value: gamesStatistics?.[EAllGamesIds.monopoly]?.countWins },
            ]}
         />

         <GameStatistics
            gameName={allGames?.[EAllGamesIds.labyrinthWithBear]?.gameName}
            statistics={[
               { text: `Количество сыгранных игр : `,
                 value: gamesStatistics?.[EAllGamesIds.labyrinthWithBear]?.playedGames },
               { text: `Количество побед : `,
                 value: gamesStatistics?.[EAllGamesIds.labyrinthWithBear]?.countWins },
            ]}
         />

		</div>
	)
}

interface GameStatisticsProps {
   gameName: TAllGames[keyof TAllGames]['gameName'] | undefined
   statistics: { text: string, value: string | number | undefined }[]
}
const GameStatistics = ({ gameName, statistics }: GameStatisticsProps) => {
   return (
      <div className={classNames('block', c.block)} >

         <h2 className='block_title' >{gameName}</h2>

         {statistics.map((elem) => (
            <p key={elem.text} >
               {elem.text}
               <span className={elem.value === undefined ? c._hide : ''} >{
                  elem.value === undefined ? getRandomNum(0, 99) : elem.value
               }</span>
            </p>
         ))}

      </div>
   )
}
