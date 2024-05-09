import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { emitSocketConnect, roomSocket } from "@/shared/api/socket"
import { useUserStore } from "@/shared/store/user"
import { useRoomPageStore } from "@/shared/store/room-page"
import { getValidUrl, showAlert } from "@/shared/lib/utils"
import { useReconnectStore } from "@/shared/store/reconnect"

import type { TRoomConnectData } from "@/shared/types/main-service/roomNsp.types"

export const useEmitRoomConnect = () => {

	const openIdStore = useUserStore.getState().open_id
	const nicknameStore = useUserStore.getState().nickname
	const imgStore = useUserStore.getState().avatar
	const blackList = useUserStore.getState().black_list
	const blackMark = useUserStore.getState().black_mark

   const reconnectionAttempt = useReconnectStore(state => state.reconnectionAttempt)

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {

      console.log('connectToRoom');
      emitSocketConnect(roomSocket, navigate)

		const data: TRoomConnectData = {
         roomId: params.id || '',
         openId: openIdStore,
         nickname: nicknameStore,
         avatar: imgStore,
         blackList,
         blackMark
      }

      roomSocket.emit('connectToRoom', data, ({ err, warning, roomData, chat, gameId }) => {
         if ( err ) {
            let text = ''
            let textBtn = ''
            switch (err) {
               case 'Room Not Found':
                  text = 'Комнаты с таким id не существует',
                  textBtn = 'Закрыть'
                  break;
               case 'Game Runned':
                  navigate(getValidUrl('/room/'+params.id+'/'+gameId))
                  return
               case 'Sth Went Wrong':
                  text = 'Что-то пошло не так',
                  textBtn = 'Закрыть'
                  return
               case 'Not Enough Space':
                  text = 'Не достаточно места в комнате',
                  textBtn = 'Понятненько'
                  break;
               case 'Was Kicked':
                  text = 'Вы были удалены из комнаты',
                  textBtn = 'Понятненько'
                  break;
               case 'There Is Player Who Added You To The Black List':
                  text = 'Вы не можете войти в комнату',
                  textBtn = 'Понятненько'
                  break;
            }
            navigate('/home')
            showAlert({ text: [text], textBtn }, 4000)
            return
         }

         if ( warning ) {
            let text = ''
            let textBtn = ''
            switch (warning) {
               case 'There Is Player From Black List':
                  text = 'В комнате есть игрок из вашего черного списка',
                  textBtn = 'Учту'
                  break;
            }
            showAlert({ text: [text], textBtn }, 4000)
         }

         if (roomData) useRoomPageStore.getState().roomData(roomData)
         console.log(chat);
         // if (chat) useChatStore.setState({ allMessages: chat })
      })

	}, [reconnectionAttempt])
}