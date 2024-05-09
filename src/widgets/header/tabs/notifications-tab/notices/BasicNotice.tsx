import type { TNotification } from '@/shared/types/main-service/user.types'
import type { TFocusActions } from '../notificationsWrapper/NotificationsWrapper'

interface TBasicNoticeProps {
	notice: TNotification
   focusActions: TFocusActions
	deleteNotice: ( noticeId: string ) => void
}
const BasicNotice = ({ notice, focusActions, deleteNotice }: TBasicNoticeProps) => {
	return (
		<div className='notice' >

         <div className="left">
            <button className='delete_btn' onClick={() => deleteNotice(notice.id)} {...focusActions} ></button>

            <span className='nickname'>{notice.nickname}</span>
         </div>

			<span className='notice_text'>{notice.text}</span>

		</div>
	)
}

export { BasicNotice }