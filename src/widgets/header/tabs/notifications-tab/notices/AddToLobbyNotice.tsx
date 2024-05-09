import { Link, useNavigate } from "react-router-dom"
import { useUserStore } from "@/shared/store/user"
import { useNotificationsStore } from "@/shared/store/notifications"
import { mainSocket } from "@/shared/api/socket"

import type { TNotification } from "@/shared/types/main-service/user.types"
import type { TFocusActions } from "../notificationsWrapper/NotificationsWrapper"

interface TAddToLobbyNoticeProps {
	notice: TNotification
   focusActions: TFocusActions
	deleteNotice: ( noticeId: string ) => void
}
const AddToLobbyNotice = ({ notice, focusActions, deleteNotice }: TAddToLobbyNoticeProps) => {

	const nicknameStore = useUserStore(state => state.nickname)

	const notificationsStore = useNotificationsStore(state => state.notifications)
	
	const navigate = useNavigate()

	const acceptAddToLobby = () => {
		navigate(`/room/${notice.roomId}`)
		deleteNotice(notice.id)
	}

	const rejectAddToLobby = () => {
		const sender = notificationsStore[notice.id]
		const userNickname = nicknameStore

      if ( !sender || !sender.openId ) {
         console.error('sender error', sender);
         return
      }

		mainSocket.emit('rejectAddToLobby', sender.openId, userNickname)

		deleteNotice(notice.id)
	}

	return (
		<div className="notice" >

         <Link to={`/profile/${notice.openId}`} className='nickname' {...focusActions} >{notice.nickname}</Link>

			<span className='notice_text'>{notice.text}</span>

			<div className='btns'>
				<button className='accept_btn' onClick={acceptAddToLobby} {...focusActions} >Принять</button>
				<button className='reject_btn' onClick={rejectAddToLobby} {...focusActions} >Отклонить</button>
			</div>

		</div>
	)
}

export { AddToLobbyNotice }