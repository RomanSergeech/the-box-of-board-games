import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { TRoomData, TRoomUser, TRoomUsers } from "@/shared/types/main-service/roomNsp.types"
import type { TAllGamesIds } from "../types/main-service/constants"

export type TGameSettings = Record<string, unknown>

export interface TRoomPageState extends Omit<TRoomData<TRoomUsers>, 'gameSettings' | 'choosedGame' > {
   gameSettings: TGameSettings | {}
	userRejectAddToLobby: string
   choosedGame: TAllGamesIds | null
}

const initialState: TRoomPageState = {
	roomId: '',
	isPublic: false,
	published: false,
	users: {},
   availableGames: [],
   runnedGame: null,
	choosedGame: null,
	roomName: '',
	gameSettings: {},
	readyPlayers: {},
	choosedCountUsers: 0,
	userRejectAddToLobby: ''
}

interface TRoomPageStore extends TRoomPageState {

	roomData: ( roomData: TRoomData<TRoomUsers> ) => void

	newHost: ( openId: string ) => void

	makeUserANewHost: ( pastHost: string, newHost: string ) => void

	addUsers: ( users: TRoomUser[] ) => void
	deleteUsers: ( users: string[] ) => void

	playerReconnecting: (dataObj: { openId: string, reconnecting: boolean }) => void

	playersReadiness: ( players: string[], isReady: boolean ) => void

	setGameSetting: <T extends Record<string, unknown>>(
                     setting: keyof T,
                     value: T[keyof T]
                  ) => void

	resetRoomData: () => void
}

export const useRoomPageStore = create(
	devtools<TRoomPageStore>((set, get) => ({
		...initialState,

		roomData: ( roomData ) => {
			set({
				...roomData,
				gameSettings: {...get().gameSettings, ...roomData.gameSettings }
			})
		},

		newHost: ( openId ) => {
         const users = get().users
         const user = users[openId]
         if ( !user ) return
         user.host = true
			set({ users })
		},

		makeUserANewHost: ( pastHost, newHost ) => {
         const users = get().users
         const user = users[newHost]
         if ( !user ) return
         delete users[pastHost]?.host
         user.host = true
			set({ users })
		},

		addUsers: ( users ) => {
			const usersStore = { ...get().users }
         users.forEach(user => {
            usersStore[user.openId] = user
         })
			set({ users: usersStore })
		},

      deleteUsers: ( users ) => {
         const usersStore = { ...get().users }
         users.forEach(openId => {
            delete usersStore[openId]
         })
			set({ users: usersStore })
      },

		playerReconnecting: ({ openId, reconnecting }) => {
         const users = get().users
         const user = users[openId]
			if ( !users || !user ) return
         user.reconnecting = reconnecting
         set({ users })
		},

		playersReadiness: ( players, isReady ) => {
         const readyPlayers = { ...get().readyPlayers }
         players.forEach(openId => {
            readyPlayers[openId] = isReady
         })
			set({ readyPlayers })
		},

		setGameSetting: ( setting, value ) => {
			set({ gameSettings: { ...get().gameSettings, [setting]: value } })
		},

		resetRoomData: () => {
			set(initialState)
		}

	}))
)