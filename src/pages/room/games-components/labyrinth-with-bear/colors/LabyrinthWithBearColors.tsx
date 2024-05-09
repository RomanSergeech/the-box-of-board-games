import { useEffect, useState } from 'react'
import { ColorEl } from './ColorEl'
import { roomSocket } from '@/shared/api/socket'
import { useRoomPageStore } from '@/shared/store/room-page'
import { classNames } from '@/shared/lib/utils'

import c from './colors.module.scss'


const MONOPOLY_PLAYERS_COLORS = [
	'red',
	'green',
	'yellow',
	'orange',
	'brown',
	'blue',
	'violet',
	'cyan'
] as const


interface TColorsProps {
   openId: string
}
const LabyrinthWithBearColors = ({ openId }: TColorsProps) => {

	const usersStore = useRoomPageStore(state => state.users)
   const isReady = useRoomPageStore(state => state.readyPlayers[openId])

	const [choosedColor, setChoosedColor] = useState('empty')
	const [occupiedColors, setOccupiedColors] = useState<string[]>([])

	const chooseColor = ( color: string ): void => {

		if ( isReady ) return

		setChoosedColor(color)

		roomSocket.emit('choosedColor', openId, color)
	}

	useEffect(() => {

		let occupiedColors: string[] = []

		Object.values(usersStore).forEach(user => {
			if (user?.color !== 'empty') {
				if (user.openId === openId) {
					setChoosedColor(user.color)
				} else {
					occupiedColors.push(user.color)
				}
			}
		})

		setOccupiedColors(occupiedColors)

	}, [ usersStore ])

	return (
		<div className={classNames(c.colors, isReady ? '_disabled' : '')} >

			{MONOPOLY_PLAYERS_COLORS.map(color => (
				<ColorEl
					key={color}
					color={color}
					choosedColor={choosedColor}
					occupiedColors={occupiedColors}
					chooseColor={chooseColor}
				/>
			))}

			<span
				className={classNames(c.color, 'empty', choosedColor === 'empty' ? '_active' : '')}
				onClick={() => chooseColor('empty')}
			></span>
		
		</div>
	)
}

export { LabyrinthWithBearColors }