import { Link } from "react-router-dom"
import { useUserStore } from "@/shared/store/user"
import { useFriendsStore } from "@/shared/store/friends"
import { showAlert } from "@/shared/lib/utils"

import type { TFocusActions } from "../notificationsWrapper/NotificationsWrapper"
import type { TNotification } from "@/shared/types/main-service/user.types"

interface TFriendRequestNotice {
	notice: TNotification
   focusActions: TFocusActions
	deleteNotice: ( noticeId: string ) => void
}
const FriendRequestNotice = ({ notice, focusActions, deleteNotice }: TFriendRequestNotice) => {

	const nicknameStore = useUserStore(state => state.nickname)
	const openIdStore = useUserStore(state => state.open_id)

	const acceptFriendRequest = () => {

		const isAlreadyFriend = useFriendsStore.getState().friends?.[notice.openId || '']

		if ( isAlreadyFriend ) {
			deleteNotice(notice.id)
			return
		}

		const sender = {
			openId: openIdStore,
			nickname: nicknameStore
		}

		useFriendsStore.getState().acceptFriendRequest(notice.openId || '', sender)
			.catch(() => {
				showAlert({
					text: ['Произошла непредвиденная ошибка'],
					textBtn: 'Закрыть'
				}, 4000)
			})
			.finally(() => {
				deleteNotice(notice.id)
			})
	}

	const rejectFriendRequest = () => {

		const sender = {
			openId: openIdStore,
			nickname: nicknameStore
		}

		useFriendsStore.getState().rejectFriendRequest(notice.openId || '', sender, notice.id)
			.catch(() => {
				showAlert({
					text: ['Произошла непредвиденная ошибка'],
					textBtn: 'Закрыть'
				}, 4000)
			})
			.finally(() => {
				deleteNotice(notice.id)
			})
	}

	return (
		<div className="notice" >

         <Link
            to={`/profile/${notice.openId}`}
            className='nickname'
            {...focusActions}
         >
            {notice.nickname}
         </Link>

			<span className='notice_text'>{notice.text}</span>

			<div className='btns'>

				<button
               className='accept_btn'
               onClick={acceptFriendRequest}
               {...focusActions}
            >
               Принять
            </button>

				<button
               className='reject_btn'
               onClick={rejectFriendRequest} 
               {...focusActions}
            >
               Отклонить
            </button>

			</div>

		</div>
	)
}

export { FriendRequestNotice }