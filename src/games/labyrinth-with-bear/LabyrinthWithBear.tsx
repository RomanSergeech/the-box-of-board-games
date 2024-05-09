import { useEmitGameConnect } from "../_common/hooks"
import { Aside, EndGameBlock, LabyrinthsBlock, LeftBlock } from "./components"
import { useLabyrinthWithBearStore } from "./game.store"
import { useSubscribeToGameEvents } from "./hooks"
import { labyrinthWithBearSocket } from "@/shared/api/socket"

import type { TGameDataDto as TLabyrinthWithBearGameDataDto } from "@/shared/types/games-service/labyrinthWithBear.types"

import './game.scss'


const LabyrinthWithBear = () => {

   useSubscribeToGameEvents()
   
   useEmitGameConnect<TLabyrinthWithBearGameDataDto>(labyrinthWithBearSocket, ({ chat, playerLabyrinthData, ...gameData }) => {

		useLabyrinthWithBearStore.setState(gameData)

      useLabyrinthWithBearStore.getState().addPlayerData(playerLabyrinthData)

   })

   return (
      <div className='LabyrinthWithBear' >

         <LeftBlock />
         
         <LabyrinthsBlock />

         <Aside />

         <EndGameBlock />

      </div>
   )
}

export { LabyrinthWithBear }