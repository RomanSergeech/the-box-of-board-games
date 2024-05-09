import { TChatMessage } from "../main-service/game.types.js"
import { EMoveDirection, TConnectToGameData, TGameDataDto, TLog, TMoveDirection, TPosition } from "./labyrinthWithBear.types.js"


export interface TGameClientToServerEvents {

   connectToGame: (
      data: TConnectToGameData,
      callback: (obj: {
         err?: 'Game Not Runned' | 'Access Denied'
         gameData?: TGameDataDto
      }) => void
   ) => void

	newMessage: (
      msg: TChatMessage
   ) => void

   chooseMoveDirection: (
      openId: string,
      direction: TMoveDirection,
      currentMap: string[]
   ) => void

   chooseShotDirection: (
      openId: string,
      direction: `${EMoveDirection}`,
      currentMap: string[]
   ) => void

   checkLabyrinth: (
      currentMap: string[]
   ) => void

   endGame: (
      changeStatistics?: true
   ) => void

   endTurnEvent: () => void

}

export interface TGameServerToClientEvents {

	newGameData: (
      newStateData: Partial<TGameDataDto>
   ) => void

   newMessage: (
      msg: TChatMessage
   ) => void

   addLog: (
      log: TLog
   ) => void

   canMove: (data: {
      openId: string
      direction: TMoveDirection
      newPosition?: TPosition
      log: TLog
   }) => void

   newPosition: (
      openId: string,
      position: TPosition
   ) => void

   checkingLabyrinth: () => void

   labyrinthsNotEqual: ( 
      openId: string
   ) => void

}
