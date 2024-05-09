import { TAllGamesIds } from "./constants.js"
import { TChatMessage } from "./game.types.js"
import { TBlackList, TBlackMark } from "./user.types.js"


export type TUsersMap = Map<string, TRoomUser>
export interface TRoomUsers { [openId: string]: TRoomUser }

export interface TReadyPlayers { [openId: string]: boolean }

export type TRoomChat = Map<string, TChatMessage>

export interface TRoomData<Users> {
	roomId: string
	isPublic: boolean
	published: boolean
	users: Users
   availableGames: TAllGamesIds[]
   runnedGame: TAllGamesIds | null
	choosedGame: TAllGamesIds | null
	choosedCountUsers: number
	gameSettings: TGameSettings
	readyPlayers: TReadyPlayers
	roomName?: string
}

export interface TRoom {
	roomData: TRoomData<TUsersMap>
   chat: TRoomChat
	reconnectTimers: {
		[open_id: string]: ReturnType<typeof setTimeout>
	}
	kickedUsers: { [openId: string]: boolean }
	invitedUsers: { [openId: string]: boolean }
	occupiedColors: { [openId: string]: string }
}

export interface TCreateRoomData {
	roomId: string
	openId: string
	nickname: string
	avatar: string
	isPublic: boolean
   availableGames: TAllGamesIds[]
}

export interface TRoomConnectData {
	roomId: string
	openId: string
	nickname: string
	avatar: string
   blackMark: TBlackMark
   blackList: TBlackList
}

export interface TNewRoomStateData {
	users?: TRoomUsers
	choosedGame?: TAllGamesIds | null
	choosedCountUsers?: number
	readyPlayers?: TReadyPlayers
	gameSettings?: TGameSettings
   availableGames?: TAllGamesIds[]
}


export type TRoomUser = {
   host?: true
   openId: string
   nickname: string
   avatar: string
   color: string
   reconnecting: boolean
}

export type TGameSettings = Record<string, unknown>

export interface TRoomData<Users> {
	roomId: string
	isPublic: boolean
	published: boolean
	users: Users
   availableGames: TAllGamesIds[]
   runnedGame: TAllGamesIds | null
	choosedGame: TAllGamesIds | null
	choosedCountUsers: number
	gameSettings: TGameSettings
	readyPlayers: TReadyPlayers
	roomName?: string
}

export interface TRoomConnectData {
	roomId: string
	openId: string
	nickname: string
	avatar: string
   blackMark: TBlackMark
   blackList: TBlackList
}
