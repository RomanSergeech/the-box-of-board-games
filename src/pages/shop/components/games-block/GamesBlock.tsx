import { GetUrl, classNames } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { Img } from "@/shared/UI"
import { useUserStore } from "@/shared/store/user"
import { DescriptionButton } from "./description-button/DescriptionButton"
import { BuyGameButton } from "./buy-game-button/BuyGameButton"

import type { TAllGames } from "@/shared/types/main-service/mainNsp.types"

import c from './gamesBlock.module.scss'

const GamesBlock = () => {

   const profileGames = useUserStore(state => state.games)
   const allGames = useShopStore(state => state.allGames)

   const { games, gamesDev } = Object.values(allGames || {}).reduce<{ games: TAllGames[keyof TAllGames][], gamesDev: TAllGames[keyof TAllGames][] }>((acc, game) => {
      if ( profileGames.includes(game.gameId) ) {
         acc.games.push(game)
      } else if ( game.cost === null ) {
         acc.gamesDev.push(game)
      } else {
         acc.games.unshift(game)
      }
      return acc
   }, { games: [], gamesDev: [] })

   return (
      <div className={classNames('block', c.game_block)} >

         <h2 className='block_title' >Настолки</h2>
         
         <div className={c.games_wrapper} >

            {games.map(game => (
               <Game key={game.gameId} game={game} />
            ))}

            {gamesDev.map(game => (
               <Game key={game.gameId} game={game} />
            ))}

         </div>
         
      </div>
   )
}

interface GameProps {
   game: TAllGames[keyof TAllGames]
}
const Game = ({ game }: GameProps) => {
   return (
      <div className={c.game} >

         <Img src={GetUrl.games(game.gameId, 'webp')} width='80px' height='80px' />

         <p>{game.gameName}</p>

         <DescriptionButton game={game} />

         <BuyGameButton game={game} />

      </div>
   )
}


export { GamesBlock }