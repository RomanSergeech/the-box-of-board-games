import { TAllGamesIds } from "@/shared/types/main-service/constants"

type Tkeys<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type TFilters = {
	games: Tkeys<Record<TAllGamesIds, boolean>>
	countPlayers: {
		isChecked: boolean
		min: number,
		max: number
	}
}