import { TRequestSender } from "./apiNsp.types.js"
import { TSomeUserDto } from "./auth.types.js"
import { EProfileLevel, TAllGamesIds } from "./constants.js"
import { TGamesStatistics } from "./mainNsp.types.js"
import { TBlackList, TDailyTaskData, TDailyTasks, TFriendData, TProfileComment, TProfileLevel, TProfileSettings, TTransaction } from "./user.types.js"

export interface TApiNspClientToServerEvents {

	'api:getSomeUserData': (
      open_id: string,
      callback: SocketCallback<{ userDto: TSomeUserDto }>
   ) => void

	'api:deleteNotifications': (
      notificationsIds: string[]
   ) => void

	'api:uploadAvatar': (
      avatarName: string,
      avatar: { file?: Buffer, default?: true },
      friends: string[],
      callback: SocketCallback<never>
   ) => void

	'api:changeNickname': (
      friends: string[],
      nickname: string,
      callback: SocketCallback<{ nickname: string }>
   ) => void

	'api:saveSettings': (
      settings: TProfileSettings,
      callback: SocketCallback<never>
   ) => void

	'api:deleteProfile': (
      callback: SocketCallback<never>
   ) => void

	'api:sendAFriendRequest': (
      recipientOpenId: string,
      sender: TRequestSender,
      callback: SocketCallback<never>
   ) => void

	'api:acceptFriendRequest': (
      recipientOpenId: string,
      sender: TRequestSender,
      callback: SocketCallback<{ newFriend: TFriendData }>
   ) => void

	'api:rejectFriendRequest': (
      recipientOpenId: string,
      sender: TRequestSender,
      notificationId: string,
      callback: SocketCallback<never>
   ) => void

	'api:deleteFriend': (
      openId: string,
      callback: SocketCallback<never>
   ) => void

	'api:blockUser': (
      openId: string,
      callback: SocketCallback<{
         black_list: TBlackList
         friendOpenId: string
      }>
   ) => void

	'api:unblockUser': (
      openId: string,
      callback: SocketCallback<{ black_list: TBlackList }>
   ) => void

	'api:leaveACommentToTheUser': (
      recipientOpenId: string,
      comment: TProfileComment,
      callback: SocketCallback<never>
   ) => void

	'api:deleteComment': (
      openId: string,
      commentId: string,
      callback: SocketCallback<never>
   ) => void

	'api:getUserProfileSettings': (
      openId: string,
      settings: (keyof TProfileSettings)[],
      callback: SocketCallback<{ profile_settings: Partial<TProfileSettings> }>
   ) => void

   'api:buySubscription': (
      newLevel: Exclude<`${EProfileLevel}`, 'level_1'>,
      choosedSubscriptionTerm: number,
      callback: SocketCallback<{
         balance: number,
         profile_level: TProfileLevel,
         transactions_history: TTransaction[],
         games_statistics: TGamesStatistics,
         daily_tasks: TDailyTasks<TDailyTaskData>,
         order_price: number
      }>
   ) => void

   'api:buyGame': (
      gameId: TAllGamesIds,
      callback: SocketCallback<{
         balance: number,
         games: TAllGamesIds[],
         transactions_history: TTransaction[]
         order_price: number
      }>
   ) => void

   'api:reloadTask': (
      gameId: TAllGamesIds,
      callback: SocketCallback<{
         daily_tasks: TDailyTasks<TDailyTaskData>
      }>
   ) => void

   'api:changeNicknameColor': (
      nicknameColor: string,
      callback: SocketCallback<never>
   ) => void

}
