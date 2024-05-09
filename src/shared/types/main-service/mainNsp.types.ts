import type { TAllGamesIds, TAllItemsIds } from './constants.js'
import type { TDailyTaskData, TDailyTasks, TNotification, TProfileCommonStatistics, TProfileLevel } from './user.types.js'


export type TChatMessage = {
	id: string
	openId: string
	avatar: string
	nickname: string
	nickname_color: string
	profile_level: {
      level: TProfileLevel['level']
      name: string
   }
	text: string
}

export type TChatAllMessages = TChatMessage[]

export interface TPublishedRoomUser {
   host?: true
	openId: string
	nickname: string
	avatar: string
}

export interface TPublishedRoom {
	roomId: string
	gameId: TAllGamesIds
	users: TPublishedRoomUser[]
	choosedCountUsers: number
	roomName?: string
}

export interface TPublishedRooms { [roomId: string]: TPublishedRoom }

export type TTheNews = {
   id: string
   image: string
   title: string
   description: string
}

export type TSubscrition = {
   cost: number
   discount: string
   term: number
}

export type TSubscritions = { [term: number]: TSubscrition }

export type TLevelsSubscritions = {
   [levelName: string]: {
      [term: number]: TSubscrition
   }
}

export type TMainNspConnectData = {
   allMessages: TChatAllMessages
   online: number
   rooms: { [roomId: string]: TPublishedRoom }
   news: TTheNews[]
   subscriptions: TLevelsSubscritions
   notifications?: Record<string, TNotification>
   daily_tasks?: TDailyTasks<TDailyTaskData> | null
   balance?: number
   common_statistics?: TProfileCommonStatistics
   games_statistics?: TGamesStatistics | null
   allGames?: TAllGames
   allItems?: TAllItems
}

type TList = {
   title?: string
   subTitle?: string
   text?: string
   score?: string
   controls?: {
      img: string
      description: { svg: string, text: string }[]
   }
}[]
export type TGameRules = {
   id: number
   last?: true
   lists: [TList, TList] | [TList]
}[]


export type TAllGames = Record<TAllGamesIds, {
   gameId: TAllGamesIds,
   gameName: string,
   countUsersInGame: { min: number, max: number },
   cost: number | null,
   description: {
      comfortableCountPlayers: number
      averageGameDuration: string
      daily_tasks_count: number
      rules: TGameRules
   }
}>

export type TGamesStatistics = Record<TAllGamesIds, Record<string, number>>

export type TItemData = {
   itemId: string,
   itemName: string,
   cost: number,
   description: string,
   games: ('common' | TAllGamesIds)[]
}

export type TAllItems = Record<TAllItemsIds, TItemData>


export type TReportType = 'proposal' | 'error' | 'bug'
export type TReportStausId = 'waiting' | 'reviewed' | 'fixed'

export type TReportComment = {
   id: string
   nickname: string
   text: string
}

export type TReport = {
   id: string
   open_id: string
   type: TReportType
   date: number
   votes: string[]
   status_id: TReportStausId
   message: string
   comments: TReportComment[]
}

export type TReports = TReport[]

export type TReportToSave = {
   type: TReportType
   message: string
}