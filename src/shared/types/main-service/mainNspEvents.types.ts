import type { TAllGamesIds } from "./constants.js"
import type { TChatMessage, TMainNspConnectData, TPublishedRoom, TReportStausId, TReportToSave, TReportType, TReports, TTheNews } from "./mainNsp.types.js"
import type { TBlackMark, TFriendData, TNotification, TProfileComment } from "./user.types.js"


export interface TMainNspClientToServerEvents {

	mainNspConnect: (
      isAuth: boolean,
		callback: SocketCallback<TMainNspConnectData>
	) => void

   checkFriendsBecameOffline: (
		friends: string[],
		callback: ( friendsOffline: string[], currentOnline: number ) => void
	) => void

	newMessage: (
      msg: TChatMessage
   ) => void

	rejectAddToLobby: (
      senderOpenId: string,
      nickname: string
   ) => void

   checkRunnedGame: (
      roomId: string,
      gameId: TAllGamesIds,
      callback: SocketCallback<{ isRunned: boolean }>
   ) => void

   checkIsUserMuted: () => void

   autoMuteUser: (
      term: number,
      nickname: string
   ) => void

   saveReport: (
      report: TReportToSave,
      callback: SocketCallback<{ success: boolean }>
   ) => void

   getReports: (
      reportType: TReportType,
      callback: SocketCallback<{ reports: TReports }>
   ) => void

   deleteReport: (
      reportId: string,
      callback: SocketCallback<{ success: boolean }>
   ) => void

   changeReportStatus: (
      reportId: string,
      statusId: TReportStausId,
      callback: SocketCallback<{ success: boolean }>
   ) => void

   sendReportVote: (
      reportId: string,
      vote: boolean,
      callback: SocketCallback<{ votes: string[] }>
   ) => void

}

export interface TMainNspServerToClientEvents {

	currentOnline: (
      currentOnline: number
   ) => void

	newMessage: (
      msg: TChatMessage
   ) => void

	addDeletePublicRoom: ( data: {
      roomData?: TPublishedRoom
      roomId?: string
   } ) => void

	friendBecameOnline: (
      openId: string
   ) => void

	addNotification: (
      notification: TNotification
   ) => void

	deleteNotification: (
      notification: TNotification
   ) => void

	friendRequestAccepted: (
      newFriend: TFriendData,
      notification: TNotification
   ) => void

	deleteFriend: (
      openId: string
   ) => void

	friendChangedAvatar: ( data: {
      openId: string
      avatar: string
   } ) => void
   
	friendChangedNickname: ( data: {
      openId: string
      nickname: string
   } ) => void
   
	newBlackMark: (
      black_mark: TBlackMark
   ) => void

	newComment: (
      comment: TProfileComment
   ) => void

   publishedTheNews: (
      theNews: TTheNews
   ) => void

   deleteTheNews: (
      newsId: string
   ) => void

   deleteChatMessage: (
      msgId: string
   ) => void

   muteUser: (
      term: number
   ) => void

   unmuteUser: () => void

}