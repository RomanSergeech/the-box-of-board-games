
import { TAllGamesIds } from "./constants.js"
import { TRoomUser } from "./roomNsp.types.js"

export type TRequestCreateGame<GameSettings> = {
   gameId: TAllGamesIds
   roomId: string
   users: Record<string, TRoomUser>
   roomOccupiedColors: string[]
   gameSettings: GameSettings
}
export type TResponseCreateGame = {
   gameCreated: true
}

export type TRequestEndGame<GameStatistics extends Record<string, unknown>[]> = {
   roomId: string
   gameId: TAllGamesIds
   winner: string | null
   players: string[]
   playersGameStatistics: GameStatistics
}

export type TRequestGameStatus = {
   gameId: TAllGamesIds
   roomId: string
}
export type TResponseGameStatus = {
   runned: boolean
}

export type TChatMessage = {
   id: string
	openId: string
	text: string
}

export type TChatAllMessages = TChatMessage[]