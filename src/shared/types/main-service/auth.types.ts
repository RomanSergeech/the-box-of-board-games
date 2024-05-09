import { EUserRole } from './constants.js'
import type { TAllGamesIds, TAllItemsIds } from './constants.js'
import type { TBlackList, TBlackMark, TFriends, TProfileComments, TProfileCommonStatistics, TProfileLevel, TProfileSettings, TTransaction } from './user.types.js'
import type { TAllGames, TAllItems, TGamesStatistics } from './mainNsp.types.js'


export interface TUserDto {
   open_id: string

   email: string
   nickname: string
   avatar: string

   auth_with: (keyof TAdditionalRegistrationData)[]

   role: `${EUserRole}`
   profile_level: TProfileLevel

   nickname_color: string

   friends: TFriends | null

   games: TAllGamesIds[]
   items: TAllItemsIds[]

   profile_settings: TProfileSettings

   black_list: TBlackList
   black_mark: TBlackMark

   comments: TProfileComments

   transactions_history: TTransaction[]
   allGames: TAllGames
   allItems: TAllItems

   subscriptionEnded: boolean

   muteTerm: number | null
}

export interface TSomeUserDto {
   open_id: string
   nickname: string
   avatar: string

   isOnline: boolean

   profile_level: TProfileLevel

   games: TAllGamesIds[]
   items: TAllItemsIds[]
   
   games_statistics: TGamesStatistics | null
   common_statistics: TProfileCommonStatistics
   comments: TProfileComments

   wasAlreadySentFriendRequest: boolean

   profile_settings: {
      disallowFriendRequests: boolean
      allowLeavesCommentsOnlyToFriends: boolean
      disableProfileComments: boolean
   }
}

export type TSendActivationCodeRequest = {
   email: string
   nickname?: string
   resend?: true
}
export type TSendActivationCodeResponse = {}

export type TConfirmActivationCodeRequest = {
   email: string
   code: string
   oldEmail?: string
}
export type TConfirmActivationCodeResponse = {}

export type TRegistrationRequest = {
   email: string
   password: string
   nickname: string
}
export type TRegistrationResponse = {
   accessToken: string
   user_dto: TUserDto
}

export type TLoginRequest = {
   email: string
   password: string
}
export type TLoginResponse = {
   accessToken: string
   user_dto: TUserDto
}

export type TVerificationRequest = {
   email: string
   password: string
}
export type TVerificationResponse = {}

export type TChangePasswordRequest = {
   email: string
   password: string
}
export type TChangePasswordResponse = {}



export const enum EOAuthService {
   yandex = 'Yandex',
   vk = 'VK'
}

export type TAdditionalRegistrationData = {
   yandex?: TOAuthServiceData,
   vk?: TOAuthServiceData
}
export type TOAuthServiceData = {
   email: string
   user_id: number
}


export type TYandexOAuthData = {
   access_token: string
   token_type: string
   expires_in: string
   cid: string
}

export type TYandexOAuthApiResponse = {
   id: string,
   login: string,
   client_id: string,
   default_email: string,
   emails: string[],
   psuid: string
}

export type TOAuthResponse<T extends boolean> = T extends true
   ? { auth_with?: (keyof TAdditionalRegistrationData)[] }
   : TRegistrationResponse


export type TVkOAuthData = {
   token: string
   type: string
   uuid: string
}

export type TVkOAuthDataResponse = {
   access_token: string
   access_token_id: string
   user_id: number
   additional_signup_required: boolean
   is_partial: boolean
   is_service: boolean
   source: number
   source_description: string
   email: string
   expires_in: number
}