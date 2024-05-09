import { ReactNode, Suspense, lazy } from "react"
import { useRoomPageStore } from "@/shared/store/room-page"
import { useUserStore } from "@/shared/store/user"
import { MenGrabber } from "../../UI"
import { classNames } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { TAllGamesIds } from "@/shared/types/main-service/constants"

import c from '../../roomPage.module.scss'

const MonopolySettings = lazy(() => import('../../games-components/monopoly/settings/MonopolySettings'))
const LabyrinthWithBearSettings = lazy(() => import('../../games-components/labyrinth-with-bear/settings/LabyrinthWithBearSettings'))

const GAMES_SETTINGS: Record<TAllGamesIds, (isHost: boolean) => ReactNode> = {
   'monopoly': (isHost: boolean) => <MonopolySettings isHost={isHost} />,
   'labyrinth-with-bear': (isHost: boolean) => <LabyrinthWithBearSettings isHost={isHost} />,
   'balabol': () => <></>,
   'chess': () => <></>,
   'words': () => <></>,
}

const GameSettings = () => {

   const openIdStore = useUserStore.getState().open_id
	const isHost = useRoomPageStore(state => !!state.users[openIdStore]?.host)
	const choosedGame = useRoomPageStore(state => state.choosedGame)

   const allGames = useShopStore.getState().allGames

   if ( !choosedGame ) return <div className={classNames('block', c.game_settings)} ></div>

   return (
      <div className={classNames('block', c.game_settings)} >

         {Object.keys(allGames || {}).map(gameId => (
            choosedGame === gameId && <Suspense key={gameId} >{GAMES_SETTINGS[gameId](isHost)}</Suspense>
         )) }

         {isHost && <MenGrabber /> }

         {!isHost && <p className={c.waiting_start_game} >Ждем начала игры...</p>}
      </div>
   )
}

export { GameSettings }