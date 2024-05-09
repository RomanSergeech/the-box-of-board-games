import { create } from 'zustand'
import produce from "immer"
import { devtools } from 'zustand/middleware'
import { useAuthStore } from '@/shared/store/auth'
import { mainSocket } from '@/shared/api/socket'
import { showAlert } from '../lib/utils'

import { EProfileLevel, type TAllGamesIds } from '@/shared/types/main-service/constants'
import type { TUserDto } from '@/shared/types/main-service/auth.types'
import type { TMainNspConnectData } from '@/shared/types/main-service/mainNsp.types'
import { TProfileComment } from '../types/main-service/user.types'

export type TProfileSettings = TUserDto['profile_settings']

export type TFriends = TUserDto['friends']
export type TFriendData = Exclude<TFriends, null>[number]

export type TUserProfileLevel = TUserDto['profile_level']
export type TCommonStatistics = TMainNspConnectData['common_statistics']

type TDto = Omit<TUserDto, | 'friends' | 'transactions_history' | 'subscriptions' | 'subscriptionEnded' | 'allGames' | 'allItems' >

interface TUserState extends TDto {
	prevSettings: string
	settingsLoading: boolean
   common_statistics: TMainNspConnectData['common_statistics']
   games_statistics: TMainNspConnectData['games_statistics']
   daily_tasks: TMainNspConnectData['daily_tasks']
   muteTerm: number | null

   profileTheme:
      'day_night' |
      'squares' |
      'vertical_lines' |
      'snowflakes' |
      'snowfall' |
      'car' |
      'virus' |
      null
}

const initialState: TUserState = {
	open_id: '',

	email: '',
	nickname: '',
	avatar: '',

	auth_with: [],

	role: 'User',
	profile_level: {level: EProfileLevel.level_1, name: ''},

   nickname_color: '',

	games: [],
	games_statistics: null,

	items: [],

	common_statistics: {
		registerDate: 0,
		playedGames: 0,
		countWins: 0,
      allXp: 0,
      countCompletedDailyTasks: 0
	},

	profile_settings: {
		twoFactorAuthentication: false,

		notifications: true,
		notificationsSound: false,

		disallowFriendRequests: false,
      allowRequestsToTheRoomOnlyToFriends: false,
      disableProfileComments: false,
      allowLeavesCommentsOnlyToFriends: false
	},

	prevSettings: '',
	settingsLoading: false,

   black_list: [],
   black_mark: [],

   comments: {},

   daily_tasks: null,

   muteTerm: null,

   profileTheme: null
}

interface TUserStore extends TUserState {
	resetUserData: () => void
	saveUserData: (user_dto: TDto) => void
	changeSetting: (setting: keyof TProfileSettings) => void
	deleteProfile: () => Promise<boolean>
	uploadAvatar: ( avatar: { file?: Buffer, default?: true }, friends: string[] ) => Promise<boolean>
	changeNickname: (nickname: string, friends: string[]) => Promise<boolean>
	saveSettings: () => Promise<boolean>
	newComment: ( comment: TProfileComment ) => void
	deleteComment: ( commentId: string ) => void
	reloadTask: ( gameId: TAllGamesIds ) => void
	changeNicknameColor: ( color: string ) => void
	muteUser: ( term: number | null ) => void
}


export const useUserStore = create(
	devtools<TUserStore>((set, get) => ({
		...initialState,

		resetUserData: () => set({ ...initialState }),

		saveUserData: ( user_dto ) => {
			set({ ...user_dto, prevSettings: JSON.stringify(user_dto.profile_settings) })
		},

		changeSetting: ( setting ) => {
			set(produce((state: TUserStore) => {
				state.profile_settings[setting] = !state.profile_settings[setting]
			}))
		},

		deleteProfile: async () => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:deleteProfile', (_, error) => {
					if (error) {
						reject(new Error('Произошла непредвиденная ошибка'))
						return
					}

					useAuthStore.getState().resetData()

					mainSocket.disconnect()

					localStorage.clear()
					sessionStorage.clear()

					set({ ...initialState })
					resolve(true)
				})
			})
		},

		uploadAvatar: async ( avatar, friends ) => {
      
         const avatarName = get().avatar

			return new Promise((resolve, reject) => {
				mainSocket.emit('api:uploadAvatar', avatarName, avatar, friends, (_, error) => {
					if ( error ) {
						reject(true)
						return
					}
               const hash = '?'+Date.now()
					set({ avatar: avatarName+hash })
					resolve(true)
				})
			})
		},

		changeNickname: async ( nickname, friends ) => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:changeNickname', friends, nickname, ( data, error ) => {
					if ( error || data?.nickname === undefined ) {
						reject(true)
						return
					}
					set({ nickname: data.nickname })
					resolve(true)
				})
			})
		},

		saveSettings: async () => {
			set({ settingsLoading: true })

			const settings = get().profile_settings
			const prevSettings = get().prevSettings

			if (JSON.stringify(settings) === prevSettings) return false

			return new Promise((resolve, reject) => {

				mainSocket.emit('api:saveSettings', settings, (_, error) => {
					if ( error ) {
						reject(true)
						return
					}

					set({ settingsLoading: false, prevSettings: JSON.stringify(settings) })

					resolve(true)
				})
			})
		},

		newComment: ( comment ) => {
			const comments = structuredClone(get().comments)
         comments[comment.id] = comment
         set({ comments })
		},

		deleteComment: ( commentId ) => {
			const comments = structuredClone(get().comments)
         delete comments[commentId]
         set({ comments })
		},

		reloadTask: ( gameId ) => {
			mainSocket.emit('api:reloadTask', gameId, (data, error) => {
            if ( error || data === undefined ) {
               showAlert({
                  text: [error.message || ''],
                  textBtn: 'Закрыть',
               }, 2000)
               return
            }

            set({ ...data })
         })
		},

		changeNicknameColor: ( color ) => {

			set({ nickname_color: color })

         mainSocket.emit('api:changeNicknameColor', color, (_, error) => {
            if ( error ) {
               console.error('Цвет не сохранился');
            }
         })
		},

		muteUser: ( term ) => {
			set({ muteTerm: term })
		}

	}))
)