import { useNotificationsStore } from '@/shared/store/notifications'
import { AddToLobbyNotice, BasicNotice, FriendRequestNotice } from '../notices'
import { Button } from '@/shared/UI'

import './notificationsWrapper.scss'

export type TFocusActions = Record<'onFocus', () => void>

interface TNotificationsWrapperProps {
	trigger: HTMLDivElement | null
   wrapperRef: React.RefObject<HTMLLIElement>
}
const NotificationsWrapper = ({ trigger, wrapperRef }: TNotificationsWrapperProps) => {

	const notifications = useNotificationsStore(state => Object.values(state.notifications))

	const deleteNotice = ( noticeId: string ): void => {
		if ( notifications.length === 1 ) {
			trigger?.click()
		}
		useNotificationsStore.getState().deleteNotification(noticeId)
	}

	const clearAll = () => {
		useNotificationsStore.getState().clearAll()
		trigger?.click()
	}

   const focusActions: TFocusActions = {
      onFocus: () => {
         wrapperRef.current?.classList.add('_active')
         wrapperRef.current?.querySelector('#notifications_tab')?.classList.add('_active')
      }
   }
   const onBlur = () => {
      wrapperRef.current?.classList.remove('_active')
      wrapperRef.current?.querySelector('#notifications_tab')?.classList.remove('_active')
   }

	let count = 0

	return (
		<div className='notifications_wrapper'>
			
			{notifications.map(notice => {
				while (count < 2) {
					count++

					switch (notice.type) {

						case 'FRIEND_REQUEST':
							return <FriendRequestNotice key={notice.id} notice={notice} focusActions={focusActions} deleteNotice={deleteNotice} />

						case 'ADD_TO_LOBBY':
							return <AddToLobbyNotice key={notice.id} notice={notice} focusActions={focusActions} deleteNotice={deleteNotice} />

						default:
							return <BasicNotice key={notice.id} notice={notice} focusActions={focusActions} deleteNotice={deleteNotice} />
					}
				}

				return ''
			})}

			<div className='btns_wrapper' >
            {notifications.length > 2 &&
               <div className='else_notices'>{`+${notifications.length - 2}`}</div>
            }

            {notifications.length > 0 &&
               <Button
                  className='clear_all_btn'
                  onClick={clearAll}
                  onBlur={onBlur}
               >
                  Закрыть все
               </Button>
            }
         </div>

		</div>
	)
}

export { NotificationsWrapper }