import { create } from "zustand"
import produce from "immer"
import { mainSocket } from "@/shared/api/socket"
import { useSomeUserProfileStore } from "@/shared/store/some-user"

import type { TFriendData, TFriends } from "@/shared/store/user"
import type { TRequestSender } from "@/shared/types/main-service/apiNsp.types"


interface TFriendsState {
	friends: TFriends
}

const initialState: TFriendsState = {
	friends: {}
}

interface TFriendsStore extends TFriendsState {
	friendBecameOnline: ( openId: string ) => void
	friendsBecameOffline: ( friendsOffline: string[] ) => void
	friendChangedAvatar: ( openId: string, avatar: string ) => void
	friendChangedNickname: ( openId: string, nickname: string ) => void
	sendAFriendRequest: ( userOpenId: string, sender: TRequestSender ) => Promise<boolean>
	acceptFriendRequest: ( recipientOpenId: string, sender: TRequestSender) => Promise<boolean>
	rejectFriendRequest: ( recipientOpenId: string, sender: TRequestSender, notificationId: string ) => Promise<boolean>
	deleteFriendRequest: ( openId: string ) => Promise<boolean>
	addNewFriend: ( friend: TFriendData ) => void
	deleteFriend: ( openId: string ) => void
}

export const useFriendsStore = create<TFriendsStore>(
	(set, get) => ({
		...initialState,

		friendBecameOnline: ( openId ) => {
			let friends = { ...get().friends }

         const friend = friends[openId]

			if ( !friend ) return

			friend.online = true

			const openedFriendProfile = useSomeUserProfileStore.getState().open_id === openId

			if ( openedFriendProfile ) {
				useSomeUserProfileStore.setState({ isOnline: true })
			}

			set({ friends })
		},

		friendsBecameOffline: ( friendsOffline ) => {
			let friends = { ...get().friends }

			friendsOffline.forEach(openId => {

            const friend = friends[openId]

            if ( !friend || friend.online === false ) return

				friend.online = false

				const openedFriendProfile = useSomeUserProfileStore.getState().open_id === openId

				if ( openedFriendProfile ) {
					useSomeUserProfileStore.setState({ isOnline: false })
				}
			})

			set({ friends })
		},

		friendChangedAvatar: ( openId, avatar ) => {
			set(produce((state: TFriendsState) => {
            const firend = state.friends?.[openId]
				if ( firend ) {
               const hash = '?'+Date.now()
					firend.avatar = avatar+hash
				}
			}))
		},
		friendChangedNickname: ( openId, nickname ) => {
			set(produce((state: TFriendsState) => {
            const firend = state.friends?.[openId]
				if ( firend ) {
					firend.nickname = nickname
				}
			}))
		},

		sendAFriendRequest: async ( recipientOpenId, sender ) => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:sendAFriendRequest', recipientOpenId, sender, (_, error) => {
					if (error) {
						reject(error)
						return
					}
					resolve(true)
				})

			})
		},

		acceptFriendRequest: async ( recipientOpenId, sender ) => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:acceptFriendRequest', recipientOpenId, sender, (data, error) => {
					if ( error || data?.newFriend === undefined ) {
						reject(true)
						return
					}

					get().addNewFriend(data.newFriend)

					resolve(true)
				})
			})
		},

		rejectFriendRequest: async ( recipientOpenId, sender, notificationId ) => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:rejectFriendRequest', recipientOpenId, sender, notificationId, (_, error) => {
					if ( error ) {
						reject(true)
						return
					}
					resolve(true)
				})

			})
		},

		deleteFriendRequest: async ( openId ) => {
			return new Promise((resolve, reject) => {

				mainSocket.emit('api:deleteFriend', openId, (_, error) => {
					if ( error ) {
						reject(error)
						return
					}

					const friends = { ... get().friends }
					delete friends[openId]
					set({ friends })

					resolve(true)
				})

			})
		},

		addNewFriend: ( friend ) => {
			const friends = { ...get().friends }

			friends[friend.open_id] = friend

			const openedFriendProfile = useSomeUserProfileStore.getState().open_id === friend.open_id

			if ( openedFriendProfile ) {
				useSomeUserProfileStore.setState({ isFriend: true })
			}

			set({ friends })
		},

		deleteFriend: ( openId ) => {
			const friends = { ...get().friends }

			delete friends[openId]

			const openedFriendProfile = useSomeUserProfileStore.getState().open_id === openId

			if ( openedFriendProfile ) {
				useSomeUserProfileStore.setState({ isFriend: false })
			}

			set({ friends })
		},

	})
)