import { useRef, useState } from "react"
import { useFriendsStore } from "@/shared/store/friends"
import { useSomeUserProfileStore } from "@/shared/store/some-user"
import { Button } from "@/shared/UI"
import { useOutsideClick } from "@/shared/lib/hooks"
import { showAlert } from "@/shared/lib/utils"

import c from '../../../informationTab.module.scss'

interface DeleteFriendButtonProps {
   openId: string
}
export const DeleteFriendButton = ({ openId }: DeleteFriendButtonProps) => {

   const [confirm, setConfirm] = useState(false)
	const [isSended, setIsSended] = useState(false)
	const [btnText, setBtnText] = useState('Друг')

	const triggerRef = useRef<HTMLButtonElement>(null)

	const onClose = () => {
		setConfirm(false)
      setBtnText('Друг')
	}

	useOutsideClick({
		elementRef: triggerRef,
		triggerRef: triggerRef,
		enabled: confirm,
		onOutsideClick: onClose
	})

   const confirmHandler = () => {
      setBtnText('Отменить дружбу')
      setConfirm(true)
   }

	const deleteFriendHandler = () => {
		setIsSended(true)

		useFriendsStore.getState().deleteFriendRequest(openId)
			.then(() => {
				setBtnText('Удален')
				setTimeout(() => {
					useSomeUserProfileStore.setState({ isFriend: false })
				}, 1000)
			})
			.catch(() => {
				showAlert({
					text: ['Что-то пошло не так'],
					textBtn: 'Закрыть'
				}, 4000)
			})
	}

   return (
      <>{confirm
         ?
            <Button
               borderColor="red"
               disabled={isSended}
               ref={triggerRef}
               onClick={deleteFriendHandler}
               className={c.add_delete_friend_button}
            >
               {btnText}
            </Button>
         :
            <Button
               borderColor="green"
               onClick={confirmHandler}
               className={c.add_delete_friend_button}
            >
               {btnText}
            </Button>
      }</>
   )
}