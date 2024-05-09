import { Link } from 'react-router-dom'
import { GetUrl, classNames } from '@/shared/lib/utils'
import { Img, TooltipWrapper } from '@/shared/UI'
import { useShopStore } from '@/shared/store/shop'

import type { TAllGamesIds } from '@/shared/types/main-service/constants'

import c from './userGames.module.scss'

interface UserGamesProps {
   games: TAllGamesIds[]
}
const UserGames = ({ games }: UserGamesProps) => {
   return (
      <div className={classNames('block', c.user_games)} >
         
         <h2 className='block_title' >Настолки</h2>

         <div className={c.games_wrapper} >
            {games.map(gameId => (
               <Game key={gameId} gameId={gameId} />
            ))}
         </div>

      </div>
   )
}

interface TGameProps {
	gameId: TAllGamesIds
}
const Game = ({ gameId }: TGameProps) => {

   const game = useShopStore.getState().allGames?.[gameId]

   const linkHandler = () => {
      setTimeout(() => {
         const elem = document.querySelector('#gameDescriptionButton_'+gameId) as HTMLButtonElement
         elem.scrollIntoView({block: "center", inline: "center"})
         elem?.click()
      }, 0)
   }

	return (
		<div className={c.game} >

         <TooltipWrapper
				orientation={'_top'}
            hoverEffect={true}

				tooltipBody={<>
					<Link
                  to='/shop'
                  onClick={linkHandler}
                  className='tooltip_link'
               >
                  Подробнее
               </Link>
				</>}
			>
				<Img src={GetUrl.games(gameId, 'webp')} width='80px' height='80px' />
			</TooltipWrapper>

			<p>{game?.gameName}</p>

		</div>
	)
}

export { UserGames }