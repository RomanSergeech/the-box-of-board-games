import { EProfileLevel, TAllGamesIds } from "./constants.js"


export interface TMutedUser {
   open_id: string
   nickname: string
   term: number
   reason: string
}

export type TFriendData = {
   open_id: string
   nickname: string
   avatar: string
   online: boolean
}
export type TFriends = Record<string, TFriendData>

export type TProfileLevel = {
   level: `${EProfileLevel}`;
   name: string;
   date?: number;
}

export type TProfileCommonStatistics = {
   registerDate: number
   playedGames: number
   countWins: number
   countCompletedDailyTasks: number
   allXp: number
}

export type TNotification = {
   id: string;
   type:
     | "FRIEND_REQUEST"
     | "FRIEND_REQUEST_ACCEPTED"
     | "FRIEND_REQUEST_REJECTED"
     | "ADD_TO_LOBBY"
     | "NEW_COMMENT"
     | "COMPLETED_DAILY_TASK"
   text: string;
   openId?: string;
   nickname?: string;
   roomId?: string;
}

// Client Type //
export type TDailyTaskData = {
   text: string
   game: TAllGamesIds
   id: string
   canReload: boolean
   reward: {
      money: number;
      xp: number;
  }
}
// Client Type //

export type TDailyTasks<DailyTaskData> = {
   date: string
   reloadCount: number
   tasksToDo: Partial<Record<TAllGamesIds, DailyTaskData>>
   completedTasks: Partial<Record<TAllGamesIds, DailyTaskData>>
}

export type TProfileGameData = {
   gameId: TAllGamesIds
   gameName: string
}

export type TProfileItemData = {
   itemId: string;
   itemName: string;
   cost: number
   description: string;
}

export type TBlackList = string[]
export type TBlackMark = string[]

export type TProfileComment = {
   id: string
   openId: string
   nickname: string
   avatar: string
   text: string
   date: number
}

export type TProfileComments = { [commentId: string]: TProfileComment }

export type TProfileSettings = {
   twoFactorAuthentication: boolean
   notifications: boolean
   notificationsSound: boolean
   disallowFriendRequests: boolean
   allowRequestsToTheRoomOnlyToFriends: boolean
   disableProfileComments: boolean
   allowLeavesCommentsOnlyToFriends: boolean
}

export type TTransaction = {
   date: number
   text: string
   amount: number
}
