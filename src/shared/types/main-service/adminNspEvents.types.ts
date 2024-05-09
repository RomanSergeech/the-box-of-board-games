import { TSiteStatistics } from "./adminNsp.types.js"
import { TReport, TReportComment, TTheNews } from "./mainNsp.types.js"
import { TMutedUser } from "./user.types.js"


export interface TAdminNspClientToServerEvents {

   'api:getSiteStatistics': (
      callback: SocketCallback<TSiteStatistics>
   ) => void

   'api:publishTheNews': (
      theNews: Omit<TTheNews&{file: Buffer}, 'id'|'image'>,
      callback: (obj: { err: true }) => void
   ) => void

   'api:deleteTheNews': ( newsId: string ) => void

   'api:commentToReport': (
      data: { reportId: string, message: TReportComment },
      callback: SocketCallback<{ report: TReport | null }>
   ) => void

   deleteCommentReport: (
      data: { reportId: string, commentId: string },
      callback: SocketCallback<{ report: TReport | null }>
   ) => void

   deleteChatMessage: ( msgId: string ) => void

   muteUser: (
      data: TMutedUser,
      callback: SocketCallback<{ user: TMutedUser }>
   ) => void

   unmuteUser: (
      openId: string,
      callback: SocketCallback<{ openId: string }>
   ) => void

}

export interface TAdminNspServerToClientEvents {}