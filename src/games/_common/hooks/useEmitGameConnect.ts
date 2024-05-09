import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUserStore } from "@/shared/store/user"
import { emitSocketConnect } from "@/shared/api/socket"
import { useReconnectStore } from "@/shared/store/reconnect"
import { showAlert } from "@/shared/lib/utils"

import type { Socket } from "socket.io-client"


export const useEmitGameConnect = <GameData>(
   socket: Socket,
   onSuccess: ( gameData: GameData ) => void
) => {

   const openIdStore = useUserStore.getState().open_id
	const navigate = useNavigate()
	const params = useParams()

   const reconnectionAttempt = useReconnectStore(state => state.reconnectionAttempt)

	useEffect(() => {

      emitSocketConnect(socket, navigate)

		const data = {
			roomId: params.id || '',
			openId: openIdStore
		}

		socket.emit('connectToGame', data, ({ err, gameData }: { err?: string, gameData: Record<string, unknown> }) => {
	
			if ( err === 'Game Not Runned' ) {
				navigate('/room/'+params.id)
				return
			}

			if ( err ) {
				let text = []
				let textBtn = ''
				switch (err) {
					case 'Access Denied':
						text.push('Игра уже началась, вы не можете присоединиться')
						textBtn = 'Закрыть'
						break;
				}
				navigate('/home')
				showAlert({ text, textBtn }, 4000)
				return
			}

         if ( !gameData ) return
         
         onSuccess(gameData as GameData)
	
		})

	}, [reconnectionAttempt])

}