import { useState } from "react"
import { useFriendsStore } from "@/shared/store/friends"
import { Button, Loader } from "@/shared/UI"
import { useUserStore } from "@/shared/store/user"

import c from '../../../informationTab.module.scss'

interface FriendRequestButtonProps {
   openId: string
   wasAlreadySentFriendRequest: boolean
}
export const FriendRequestButton = ({ openId, wasAlreadySentFriendRequest }: FriendRequestButtonProps) => {

	const [loading, setLoading] = useState(false)
	const [isSended, setIsSended] = useState(false)

	const addFriendHandler = () => {
		setLoading(true)

		const sender = {
			openId: useUserStore.getState().open_id,
			nickname: useUserStore.getState().nickname
		}

		useFriendsStore.getState().sendAFriendRequest(openId, sender)
			.then(() => setIsSended(true))
			.catch(() => setIsSended(false))
			.finally(() => setLoading(false))
	}

   return (
      <Button
         borderColor="main"
         disabled={isSended || wasAlreadySentFriendRequest}
         onClick={addFriendHandler}
         className={c.add_delete_friend_button}
      >
         {loading
			? <Loader fontSize={5} />
			: isSended || wasAlreadySentFriendRequest ? <>Отправлено</> : <>Добавить в друзья</>
			}
      </Button>
   )
}