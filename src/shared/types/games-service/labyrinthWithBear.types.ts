import { TChatMessage } from "../main-service/game.types.js"
import { TRoomUser } from "../main-service/roomNsp.types.js"

export interface TLabyrinthWithBearGameSettings {
   limitTurnDuration: boolean
   turnDuration: number
   labyrinthSize: 6 | 8 | 10
}

export interface TLabyrinthWithBearGameStatistics {
   [openId: string]: {
      openId: string
      comparisonsCount: number
      hitsCount: number
      wasEatenCount: number
      hitsItselfCount: number
      wasKilledBy: { [openId: string]: number }
   }
}

export const enum EMoveDirection {
   't'='t',
   'r'='r',
   'b'='b',
   'l'='l',
}

export type TMoveDirection = `${EMoveDirection}`

export type TPosition = {
   m: number
   n: number
}

export type TLabyrinthMap = { [mn: string]: boolean }

export type TPlayerLabyrinthData = {
   position: TPosition
   currentMap: string[]
}
export type TLabyrinthsData = {
   [openId: string]: TPlayerLabyrinthData
}

export type TPlayer = TRoomUser

export type TPlayers = Record<string, TPlayer>

export interface TConnectedPlayers { [openId: string]: boolean }

type TEndGameData = { count: number, scores: number }
export type TEndGamePlayerData = {
   openId: string
   nickname: string
   scores: number
   labyrinthMatched: TEndGameData
   comparisons: TEndGameData
   wallsDidntMatch: TEndGameData
   hits: TEndGameData
   hitsItself: TEndGameData
   wasEaten: TEndGameData
   wasKilledBy: { nickname: string, count: number }[]
   neverBeenShot: number
}

export type TEndGame = {
   winner: { openId: string, nickname: string }
   players: TEndGamePlayerData[]
}

export interface TCurrentTurn {
	openId: string
}

export type TGameChat = Map<string, TChatMessage>

export type TLog = {
   id: number
   openId: string
   text: string
   subText?: string
}
export type TLogs = TLog[]

export type TBear = {
   position: TPosition
   bearDirection: TMoveDirection | ''
   currentPlayer: string
}

export interface TGameData {
   roomId: string
   players: TPlayers
   connectedPlayers: TConnectedPlayers
   currentTurn: TCurrentTurn
   sequenceTurns: string[]
   gameSettings: TLabyrinthWithBearGameSettings
   startTime: number
   endGame: TEndGame | null
   turnTimer: NodeJS.Timeout | null
   currentTurnTimer: number
   gameTimer: NodeJS.Timeout | null
	gameRunned: boolean

   chat: TGameChat
   originalMap: TLabyrinthMap
   labyrinthsData: TLabyrinthsData
   bear: TBear
   logs: TLogs
   statistics: TLabyrinthWithBearGameStatistics
}

export type TGameDataDto = Omit<TGameData,
   'gameTimer' | 'turnTimer' | 'gameRunned' | 'chat' | 'labyrinthsData' | 'comparisonsCount' | 'bear' | 'originalMap' | 'statistics'
   > & {
      chat: TChatMessage[]
      playerLabyrinthData: { openId: string, position: TPosition },
   }

export interface TConnectToGameData {
   roomId: string
   openId: string
}
