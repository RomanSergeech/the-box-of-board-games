import { useState, FormEvent, ChangeEvent } from "react"
import { useUserStore } from "@/shared/store/user"
import { showAlert, validateOpenId } from "@/shared/lib/utils"
import { roomSocket } from "@/shared/api/socket"
import { Input, Loader } from "@/shared/UI"
import { useSomeUserProfileStore } from "@/shared/store/some-user"
import { useFriendsStore } from "@/shared/store/friends"

import c from '../../players.module.scss'


const PLACEHOLDER_TEXT = 'Введите Id пользователя'


export const AddPlayerForm = () => {

	const nicknameStore = useUserStore.getState().nickname
	const blackMark = useUserStore.getState().black_mark

	const [value, setValue] = useState('')
	const [loading, setLoading] = useState(false)

	const onChange = ( e: ChangeEvent<HTMLInputElement> ) => {
		const inputValue = e.currentTarget.value

		if (inputValue.length > 8) return

		setValue(e.target.value)
	}

	const onSubmit = async ( e: FormEvent<HTMLFormElement> ) => {
		e.preventDefault()

		if ( !validateOpenId(value) ) {
			showAlert({
				text: ['Не похоже на Id пользователя']
			}, 2000)
			return
		}

      if ( blackMark.includes(value) ) {
			showAlert({
				text: ['Вы не можете добавить данного пользователя']
			}, 2000)
			return
		}

      const isFriend = !!useFriendsStore.getState().friends?.[value]
      
      const {
         allowRequestsToTheRoomOnlyToFriends
      } = await useSomeUserProfileStore.getState().getUserProfileSettings(value, ['allowRequestsToTheRoomOnlyToFriends'])

            
      console.log(allowRequestsToTheRoomOnlyToFriends);
      
      if ( allowRequestsToTheRoomOnlyToFriends && !isFriend ) {
         showAlert({
				text: ['Вы не можете добавить данного пользователя']
			}, 2000)
			return
      }

		setLoading(true)

		roomSocket.emit('requestAddUserToLobby', value, nicknameStore, ({ error }) => {
			setLoading(false)

         switch (error) {
            case 'User Not Online':
               showAlert({
                  text: ['Игрок не онлайн']
               }, 2000)
               return
         }

			setValue('')
			showAlert({
				text: ['Приглашен']
			}, 2000)
		})

	}

	return (
		<form onSubmit={onSubmit} >
			{loading && <div className={c.loader_wrapper} ><Loader fontSize={20} /></div>}
			<Input
				value={value}
				placeholder={PLACEHOLDER_TEXT}
				onChange={onChange}
			/>
			<button className={c.search_btn} >Добавить</button>
		</form>
	)
}
