import { Button } from "@/shared/UI"
import { useOutsideClick } from "@/shared/lib/hooks"
import { useSomeUserProfileStore } from "@/shared/store/some-user"
import { useRef, useState } from "react"
import { classNames, showAlert } from "@/shared/lib/utils"

import c from '../../../informationTab.module.scss'

interface BlockUserButtonProps {
   openId: string
   blocked: boolean
}
export const BlockUserButton = ({ openId, blocked }: BlockUserButtonProps) => {

   const [confirm, setConfirm] = useState(false)

	const triggerRef = useRef<HTMLButtonElement>(null)

	const onClose = () => {
		setConfirm(false)
	}

	useOutsideClick({
		elementRef: triggerRef,
		triggerRef: triggerRef,
		enabled: confirm,
		onOutsideClick: onClose
	})

   const confirmHandler = () => {
      setConfirm(true)
   }

   const blockUserHandler = () => {
      setConfirm(false)
		useSomeUserProfileStore.getState().blockUser(openId)
			.catch(() => {
				showAlert({
					text: ['Что-то пошло не так'],
					textBtn: 'Закрыть'
				}, 4000)
			})
	}
   const unblockUserHandler = () => {
      setConfirm(false)
		useSomeUserProfileStore.getState().unblockUser(openId)
			.catch(() => {
				showAlert({
					text: ['Что-то пошло не так'],
					textBtn: 'Закрыть'
				}, 4000)
			})
	}

   return (<>
      {blocked
         ?
            <Button
               borderColor={confirm ? 'main' : 'red'}
               textColor={confirm ? 'main' : 'red_light'}
               ref={triggerRef}
               onClick={confirm ? unblockUserHandler : confirmHandler}
               className={classNames(c.block_user_button, blocked ? c._blocked : '')}
            >
               {!confirm && 'Заблокирован'}
               {confirm && 'Разблокировать'}
            </Button>
         :
            <Button
               borderColor='red'
               textColor={confirm ? 'red_light' : 'text'}
               ref={triggerRef}
               onClick={confirm ? blockUserHandler : confirmHandler}
               className={c.block_user_button}
            >
               {!confirm && 'Заблокировать'}
               {confirm && 'Подтвердить'}
            </Button>
      }
   </>)
}