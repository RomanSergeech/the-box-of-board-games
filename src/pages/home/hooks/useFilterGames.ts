import { useMemo, useState } from "react"
import { useHomePageStore } from "@/shared/store/home-page"
import { useShopStore } from "@/shared/store/shop"

import type { TAllGamesIds } from "@/shared/types/main-service/constants"
import type { TFilters } from "../homePage.types"
import type { TPublishedRoom, TPublishedRooms } from "@/shared/types/main-service/mainNsp.types"


export const useFilterGames = (): {
	choosedFilters: TFilters
	filteredGames: TPublishedRoom[]
	filterGamesHandler: ( data: Partial<TFilters> ) => void
	resetFilters: () => void
} => {

	const publicRooms = useHomePageStore(state => state.rooms)

	const initialFilters = useGetFilters()

	const storageFilters = JSON.parse(localStorage.getItem('roomsFilters') || 'null')

	const [choosedFilters, setChoosedFilters] = useState<TFilters>(storageFilters || initialFilters)

	const filteredGames = useFilterRooms( choosedFilters, publicRooms )

	const filterGamesHandler = ( data: Partial<TFilters> ) => {

		setChoosedFilters(prev => {
			const newFilters = { ...prev, ...data }

			localStorage.setItem('roomsFilters', JSON.stringify(newFilters))

			return newFilters
		})
		
	}

	const resetFilters = () => {
		setChoosedFilters(initialFilters)
		localStorage.removeItem('roomsFilters')
	}

	return {
		choosedFilters,
		filteredGames,
		filterGamesHandler,
		resetFilters
	}

}

const useGetFilters = () => {

   const allGames = useShopStore.getState().allGames

	return useMemo((): TFilters => {

		const filters = {
			games: {},
			countPlayers: {}
		} as TFilters

		Object.values(allGames || {}).forEach(game => (
         filters.games[game.gameId] = false
      ) )

		filters.countPlayers = {
			isChecked: false,
			min: 1,
			max: 10
		}

		return filters

	}, [ allGames ])

}

const useFilterRooms = ( filters: TFilters, rooms: TPublishedRooms ) => {

	return useMemo(() => {

		let roomsData = Object.values(rooms)

		if (filters.countPlayers.isChecked) {
			roomsData =  roomsData.filter(game => game.choosedCountUsers >= filters.countPlayers.min && game.choosedCountUsers <= filters.countPlayers.max)
		}

		if ( Object.values(filters.games).every(value => !value) ) {
			return roomsData
		}

		return roomsData.filter(room => filters.games[room.gameId as TAllGamesIds])

	}, [ filters, rooms ])

}