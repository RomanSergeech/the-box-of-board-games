import { Checkbox } from "@/shared/UI"
import { useShopStore } from "@/shared/store/shop"

import type { TAllGamesIds } from "@/shared/types/main-service/constants"
import type { TFilters } from "../../homePage.types"


interface TGamesProps {
	choosedFilters: TFilters
	filterGamesHandler: ( data: Partial<TFilters> ) => void
}
const Games = ({ choosedFilters, filterGamesHandler }: TGamesProps) => {

   const allGames = useShopStore.getState().allGames

	const changeHandler = ( gameId: TAllGamesIds ) => {
		filterGamesHandler({ games: {
			...choosedFilters.games,
			[gameId]: !choosedFilters.games[gameId]
		} })
	}

	return (
		<>
			{Object.values(allGames || {}).map(game => (
            <li key={game.gameId}>
               <Checkbox
                  checked={choosedFilters.games[game.gameId]}
                  onChange={() => changeHandler(game.gameId)}
               />
               {game.gameName}
            </li>
         ))}
		</>
	)
}

export { Games }