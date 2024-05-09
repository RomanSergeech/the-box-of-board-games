import { Room } from './Room'

import type { TPublishedRoom } from '@/shared/types/main-service/mainNsp.types'

import c from './rooms.module.scss'

interface RoomsProps {
	filteredGames: TPublishedRoom[]
}
const Rooms = ({ filteredGames }: RoomsProps) => {
	return (
		<div className={c.rooms} >

			<span className='line' ></span>

			<div className={c.rooms_wrapper} >

				{filteredGames.length === 0 && <h3>Пока что нет открытых лобби</h3>}

				{filteredGames.map((game) =>
               <Room key={game.roomId} room={game} />
            )}

			</div>

			<span className='line' ></span>

		</div>
	)
}

export { Rooms }