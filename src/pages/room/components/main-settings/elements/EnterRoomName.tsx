import { Input } from '@/shared/UI'
import { useRoomPageStore } from '@/shared/store/room-page'
import { useState } from 'react'


interface ChooseGameProps {
   disabled: boolean
}
const EnterRoomName = ({ disabled }: ChooseGameProps) => {

	const isPublished = useRoomPageStore(state => state.published)

   const roomName = useRoomPageStore.getState().roomName

	const [value, setValue] = useState(roomName)

	const roomNameHandler = (e: React.FocusEvent<HTMLInputElement>) => {

		if ( isPublished ) return

		useRoomPageStore.setState({ roomName: e.currentTarget.value })
	}

	const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

		if ( isPublished ) return

		/^\D{0,20}$/.test(e.target.value) && setValue(e.currentTarget.value)
	}

	return (
		<>
			<b>Название комнаты</b>

			<ul>

				<li>
               <Input
                  disabled={disabled}
                  value={value}
                  onChange={changeValueHandler}
                  onBlur={roomNameHandler}
               />
            </li>

			</ul>
		</>
	)
}

export { EnterRoomName }