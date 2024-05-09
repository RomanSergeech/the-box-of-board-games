import { create } from "zustand"
import { mainSocket, roomSocket } from "@/shared/api/socket"
import { useFriendsStore } from "@/shared/store/friends"
import { TProfileSettings, useUserStore } from "./user"
import { showAlert } from "../lib/utils"

import { EProfileLevel } from "@/shared/types/main-service/constants"
import type { TProfileComment } from "@/shared/types/main-service/user.types"
import type { TSomeUserDto } from "../types/main-service/auth.types"


export interface TUserProfileState extends TSomeUserDto {
	loading: boolean
	isOnline: boolean
	isFriend: boolean
	userNotFound: boolean
}

interface TUserProfileStore extends TUserProfileState {
	getUserData: ( openId: string ) => void
   blockUser: ( openId: string ) => Promise<void>
   unblockUser: ( openId: string ) => Promise<void>
   newComment: ( comment: TProfileComment ) => void
   getUserProfileSettings: ( openId: string, settings: (keyof TProfileSettings)[] ) => Promise<Partial<TProfileSettings>>
   leaveACommentToTheUser: ( openId: string, comment: TProfileComment ) => void
   deleteComment: ( openId: string, commentId: string ) => void
}

const initialState: TUserProfileState = {
	open_id: '',
	avatar: '',
	nickname: '',
	profile_level: {
		date: 0,
		level: EProfileLevel.level_1,
		name: '',
	},
	items: [],
	common_statistics: {
		registerDate: 0,
		playedGames: 0,
		countWins: 0,
      allXp: 0,
      countCompletedDailyTasks: 0
	},
	games_statistics: null,
	games: [],

	wasAlreadySentFriendRequest: false,

   profile_settings: {
		disallowFriendRequests: false,
      disableProfileComments: false,
      allowLeavesCommentsOnlyToFriends: false
	},

	isOnline: false,
	isFriend: false,

	loading: false,
	userNotFound: false,

   comments: {}
}

export const useSomeUserProfileStore = create<TUserProfileStore>(
	( set, get ) => ({
		...initialState,

		getUserData: async ( openId ) => {

			set({ loading: true })

			mainSocket.emit('api:getSomeUserData', openId, ( data, error ) => {

				if ( error || data?.userDto === undefined ) {
					set({
                  userNotFound: true,
                  loading: false
               })
					return
				}

				const isFriend = !!useFriendsStore.getState().friends?.[data.userDto.open_id]

				set({
					...data.userDto,
               open_id: data.userDto.open_id,
					isFriend,
					loading: false,
					userNotFound: false
				})
			})

		},
      
      blockUser: async ( openId ) => {
         return new Promise((resolve, reject) => {

				mainSocket.emit('api:blockUser', openId, (data, error) => {
					if (error || data === undefined) {
						reject(error)
						return
					}

               if ( data.friendOpenId ) {
                  useFriendsStore.getState().deleteFriend(data.friendOpenId)
               }

               useUserStore.setState({ black_list: data.black_list })

					resolve()
				})

			})
      },
      
      unblockUser: async ( openId ) => {
         return new Promise((resolve, reject) => {

				mainSocket.emit('api:unblockUser', openId, (data, error) => {
					if (error || data === undefined) {
						reject(error)
						return
					}
               
               useUserStore.setState({ black_list: data.black_list })

					resolve()
				})

			})
      },

      newComment: ( comment ) => {
			const comments = structuredClone(get().comments)
         comments[comment.id] = comment
         set({ comments })
		},

      getUserProfileSettings: ( openId, settings ) => {
			return new Promise((resolve, reject) => {

            console.log(openId, settings);
            
				roomSocket.emit('api:getUserProfileSettings', openId, settings, (data, error) => {

					if (error || data === undefined) {
						reject(error)
						return
					}

               resolve(data.profile_settings)
				})

			})
		},

      leaveACommentToTheUser: ( openId, comment ) => {
         mainSocket.emit('api:leaveACommentToTheUser', openId, comment, (_, error) => {

            if ( error ) {
               showAlert({
                  text: ['Произошла непредвиденная ошибка'],
                  textBtn: 'Закрыть'
               }, 4000)
               return
            }

            useSomeUserProfileStore.getState().newComment(comment)
         })
      },

      deleteComment: ( openId, commentId ) => {
         mainSocket.emit('api:deleteComment', openId, commentId, (_, error) => {

            if (error) {
               showAlert({
                  text: ['Произошла непредвиденная ошибка'],
                  textBtn: 'Закрыть'
               }, 4000)
               return
            }

            const openIdStore = useUserStore.getState().open_id

            if (openIdStore === openId) {
               useUserStore.getState().deleteComment(commentId)
            }
            else {
               const comments = structuredClone(get().comments)
               delete comments[commentId]
               set({ comments })
            }
         })
		},

	})
)