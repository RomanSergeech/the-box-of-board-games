import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface THeaderState {
	activeMenu: boolean
	activeLogin: boolean
}

interface THeaderStore extends THeaderState {
	activateLoginTab: () => void
}

const initialState: THeaderState = {
	activeMenu: false,
	activeLogin: false,
}

export const useHeaderStore = create(
	devtools<THeaderStore>((set) => ({
		...initialState,

		activateLoginTab: () => {
         set({
            activeMenu: true,
            activeLogin: true
         })
      }

	}))
)