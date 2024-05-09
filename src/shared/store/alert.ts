import { create } from "zustand"

export interface TAlert {
   text: string[]
	textBtn?: string,
   svg?: TAlertState['svg']
	fixed?: boolean
}

interface TAlertState {
   svg: 'exclamation_mark' | null
	text: string[]
	textBtn: string
	active: boolean | null
   timer: NodeJS.Timeout | null
	fixed: boolean
   blockSite: boolean
   onClickAction: () => void
}

interface TAlertStore extends TAlertState {
	activateAlert: ({ text, textBtn, fixed }: TAlert) => void
	closeAlert: () => void
}

const initialState: TAlertState = {
   svg: null,
	text: [],
	textBtn: '',
	active: null,
   timer: null,
	fixed: false,
   blockSite: false,
   onClickAction: () => {}
}

export const useAlertStore = create<TAlertStore>(
	(set) => ({
		...initialState,

		activateAlert: ( alertData ) => {
			set({
				...alertData,
				active: true
			})
		},

		closeAlert: () => {
			set({ active: false, fixed: false })
		}

	})
)