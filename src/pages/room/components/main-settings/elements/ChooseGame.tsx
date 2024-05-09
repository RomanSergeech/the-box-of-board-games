import { useRoomPageStore } from '@/shared/store/room-page'
import { roomSocket } from '@/shared/api/socket'
import { OptionButton } from '../../../UI'
import { useShopStore } from '@/shared/store/shop'

import type { TAllGamesIds } from '@/shared/types/main-service/constants'

interface ChooseGameProps {
   disabled: boolean
}
const ChooseGame = ({ disabled }: ChooseGameProps) => {

	const choosedGame = useRoomPageStore(state => state.choosedGame)
   const choosedCountUsers = useRoomPageStore(state => state.choosedCountUsers)
   const availableGames = useRoomPageStore(state => state.availableGames)

   const allGames = useShopStore.getState().allGames

	const chooseGame = ( gameId: TAllGamesIds | undefined ) => {

		if ( disabled || !gameId || choosedGame === gameId ) return

		roomSocket.emit('choosedGame', gameId)
	}

	return (
		<>
			<b>Выберите игру</b>

			<ul>

				{availableGames.includes(allGames?.monopoly.gameId!) &&
               <li>
                  <OptionButton
                     size={2}
                     active={choosedGame === allGames?.monopoly.gameId}
                     disabled={choosedCountUsers > (allGames?.monopoly.countUsersInGame.max || 0)}
                     onClick={() => chooseGame(allGames?.monopoly.gameId)}
                     style={{ position: 'relative' }}
                  >
                     {allGames?.monopoly.gameName}
                     <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(10deg)', opacity: .2 }} width='100%' height="12" viewBox="0 0 135 12" fill="none" ><g clipPath="url(#clip0_418_1718)"><rect width="135" height="12" fill="#222222"/><rect y="-3.46429" width="6" height="23" transform="rotate(-25 0 -3.46429)" fill="#DED500"/><rect x="14" y="-3.46429" width="6" height="23" transform="rotate(-25 14 -3.46429)" fill="#DED500"/><rect x="28" y="-3.46429" width="6" height="23" transform="rotate(-25 28 -3.46429)" fill="#DED500"/><rect x="42" y="-3.46429" width="6" height="23" transform="rotate(-25 42 -3.46429)" fill="#DED500"/><rect x="56" y="-3.46429" width="6" height="23" transform="rotate(-25 56 -3.46429)" fill="#DED500"/><rect x="70" y="-3.46429" width="6" height="23" transform="rotate(-25 70 -3.46429)" fill="#DED500"/><rect x="84" y="-3.46429" width="6" height="23" transform="rotate(-25 84 -3.46429)" fill="#DED500"/><rect x="98" y="-3.46429" width="6" height="23" transform="rotate(-25 98 -3.46429)" fill="#DED500"/><rect x="112" y="-3.46429" width="6" height="23" transform="rotate(-25 112 -3.46429)" fill="#DED500"/><rect x="126" y="-3.46429" width="6" height="23" transform="rotate(-25 126 -3.46429)" fill="#DED500"/></g><defs><clipPath id="clip0_418_1718"><rect width="135" height="12" fill="white"/></clipPath></defs></svg>
                     <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-10deg)', opacity: .2 }} width="100%" height="12" viewBox="0 0 135 12" fill="none" ><g clipPath="url(#clip0_418_1718)"><rect width="135" height="12" fill="#222222"/><rect y="-3.46429" width="6" height="23" transform="rotate(-25 0 -3.46429)" fill="#DED500"/><rect x="14" y="-3.46429" width="6" height="23" transform="rotate(-25 14 -3.46429)" fill="#DED500"/><rect x="28" y="-3.46429" width="6" height="23" transform="rotate(-25 28 -3.46429)" fill="#DED500"/><rect x="42" y="-3.46429" width="6" height="23" transform="rotate(-25 42 -3.46429)" fill="#DED500"/><rect x="56" y="-3.46429" width="6" height="23" transform="rotate(-25 56 -3.46429)" fill="#DED500"/><rect x="70" y="-3.46429" width="6" height="23" transform="rotate(-25 70 -3.46429)" fill="#DED500"/><rect x="84" y="-3.46429" width="6" height="23" transform="rotate(-25 84 -3.46429)" fill="#DED500"/><rect x="98" y="-3.46429" width="6" height="23" transform="rotate(-25 98 -3.46429)" fill="#DED500"/><rect x="112" y="-3.46429" width="6" height="23" transform="rotate(-25 112 -3.46429)" fill="#DED500"/><rect x="126" y="-3.46429" width="6" height="23" transform="rotate(-25 126 -3.46429)" fill="#DED500"/></g><defs><clipPath id="clip0_418_1718"><rect width="135" height="12" fill="white"/></clipPath></defs></svg>
                  </OptionButton>
               </li>
            }

            {availableGames.includes(allGames?.['labyrinth-with-bear'].gameId!) &&
               <li>
                  <OptionButton
                     size={3}
                     active={choosedGame === allGames?.['labyrinth-with-bear'].gameId}
                     disabled={choosedCountUsers > (allGames?.['labyrinth-with-bear'].countUsersInGame.max || 0)}
                     onClick={() => chooseGame(allGames?.['labyrinth-with-bear'].gameId)}
                  >
                     {allGames?.['labyrinth-with-bear'].gameName}
                  </OptionButton>
               </li>
            }

			</ul>
		</>
	)
}

export { ChooseGame }