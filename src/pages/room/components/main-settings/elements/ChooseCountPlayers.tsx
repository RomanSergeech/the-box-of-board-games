import { useRoomPageStore } from '@/shared/store/room-page'
import { roomSocket } from '@/shared/api/socket'
import { OptionButton } from '../../../UI'
import { arrayFromTo } from '@/shared/lib/utils'
import { useShopStore } from '@/shared/store/shop'

interface ChooseCountPlayersProps {
   disabled: boolean
}
const ChooseCountPlayers = ({ disabled }: ChooseCountPlayersProps) => {

   const choosedGame = useRoomPageStore(state => state.choosedGame)
	const choosedCountUsersStore = useRoomPageStore(state => state.choosedCountUsers)
   const usersLength = useRoomPageStore(state => Object.values(state.users).length)

   const allGames = useShopStore.getState().allGames

	const chooseCountPlayers = (choosedCountUsers: number) => {

		if ( disabled || choosedCountUsersStore === choosedCountUsers ) return

		useRoomPageStore.setState({ choosedCountUsers })

		roomSocket.emit('choosedCountUsers', choosedCountUsers)
	}

	return (
		<>
			<b>Количество игроков</b>

			<ul>
            {choosedGame
            ?
               arrayFromTo(
                  allGames?.[choosedGame]?.countUsersInGame.min || 0,
                  allGames?.[choosedGame]?.countUsersInGame.max || 0
               ).map(num =>
                  <li key={num} >
                     <OptionButton
                        active={num === 1 || choosedCountUsersStore === num}
                        onClick={() => chooseCountPlayers(num)}
                        disabled={num === 1 || num < usersLength }
                     >
                        {num}
                     </OptionButton>
                  </li>
               )
            :
               <li>
                  <OptionButton active={true} disabled={true} onClick={()=>{}} > 1 </OptionButton>
               </li>
            }
			</ul>
		</>
	)
}

export { ChooseCountPlayers }