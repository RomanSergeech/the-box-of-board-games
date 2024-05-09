import { create } from "zustand"

import type { TPublishedRoom, TPublishedRooms } from "../types/main-service/mainNsp.types"

interface THomePageState {
	rooms: TPublishedRooms
}

interface THomePageStore extends THomePageState {
	addDeletePublicRoom: (data: { roomData?: TPublishedRoom, roomId?: string }) => void
}

const initialState: THomePageState = {
	rooms: {}
}

export const useHomePageStore = create<THomePageStore>(
	(set, get) => ({
		...initialState,

		addDeletePublicRoom: ({ roomData, roomId }) => { 
			const rooms = { ...get().rooms }
			if ( roomData ) rooms[roomData.roomId] = roomData
			if ( roomId ) delete rooms[roomId]
			set({ rooms })
		}

	})
)