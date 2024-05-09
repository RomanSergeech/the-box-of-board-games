import { Button } from "@/shared/UI"
import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"

import c from '../../../roomPage.module.scss'

const PublishRoomBtn = () => {

	const isPublished = useRoomPageStore(state => state.published)
   const chooseGame = useRoomPageStore(state => state.choosedGame)
   const choosedCountUsers = useRoomPageStore(state => state.choosedCountUsers)

   const disabled = isPublished || !chooseGame || !choosedCountUsers

	const publishHandler = () => {
      
      if ( isPublished ) return

		const roomName = useRoomPageStore.getState().roomName

      roomSocket.emit('publishRoom', roomName)

      useRoomPageStore.setState({ published: true })
	}

	if ( isPublished ) return <></>

	return (
		<Button
         borderColor="main"
         className={c.publish_room_button}
			onClick={publishHandler}
         disabled={disabled}
		>
			Подтвердить
		</Button>
	)
}

export { PublishRoomBtn }