import { create } from "zustand"


interface TReconnectState {
	reconnectionAttempt: number
}

interface TReconnectStore extends TReconnectState {
	reconnect: () => void
}

const initialState: TReconnectState = {
	reconnectionAttempt: 0
}

export const useReconnectStore = create<TReconnectStore>(
	(set, get) => ({
		...initialState,

		reconnect: () => {
			set({
            reconnectionAttempt: get().reconnectionAttempt + 1
         })
		}

	})
)