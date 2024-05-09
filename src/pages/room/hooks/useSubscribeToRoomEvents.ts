import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"
import { useChatStore } from "@/shared/store/chat"
import { getValidUrl, showAlert } from "@/shared/lib/utils"


export const useSubscribeToRoomEvents = () => {

	const navigate = useNavigate()

	useEffect(() => {

      console.log('roomSocket connect');
      roomSocket.connect()

      roomSocket.on('gameRunned', ({ roomId, gameId }) => {
         localStorage.setItem('gameData', JSON.stringify({ roomId, gameId }))
			navigate(getValidUrl(`/room/${getValidUrl(roomId)}/${gameId}`), { replace: true })
		})

		roomSocket.on('newRoomData', ( newStateData ) => {
			useRoomPageStore.setState(newStateData)
		})

		roomSocket.on('newHost', ( openId ) => {
			useRoomPageStore.getState().newHost(openId)
		})

		roomSocket.on('makeUserANewHost', ( pastHost, newHost ) => {
			useRoomPageStore.getState().makeUserANewHost(pastHost, newHost)
		})

		roomSocket.on('playerReconnecting', ( dataObj ) => {
			useRoomPageStore.getState().playerReconnecting( dataObj )
		})

		roomSocket.on('playersReadiness', ( players, isReady ) => {
			useRoomPageStore.getState().playersReadiness( players, isReady )
		})

		roomSocket.on('addUsers', ( users ) => {
			useRoomPageStore.getState().addUsers(users)
		})

		roomSocket.on('deleteUsers', ( users ) => {
			useRoomPageStore.getState().deleteUsers(users)
		})

		roomSocket.on('kicked', () => {
			navigate('/home')
			showAlert({
				text: ['Вы были удалены из комнаты'],
				textBtn: 'Понятненько'
			}, 4000)
		})

		roomSocket.on('rejectAddToLobby', (userNick) => {
			useRoomPageStore.setState({ userRejectAddToLobby: userNick })
		})

      roomSocket.on('newMessage', ( msg ) => {
         console.log(msg);
			// useChatStore.getState().addNewMessage( msg )
		})

      return () => {
         useChatStore.getState().resetChatData()

         useRoomPageStore.getState().resetRoomData()

         roomSocket.removeAllListeners()

         roomSocket.disconnect()
         console.log('roomSocket disconnect');
      }

	}, [])
}