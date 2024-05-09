import { KeyboardEvent, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { useUserStore } from '@/shared/store/user'
import { TChatMessage } from '@/shared/types/main-service/mainNsp.types'
import { MuteTimerMemo } from './MuteTimer'

import c from './chatForm.module.scss'
import { mainSocket } from '@/shared/api/socket'

interface ChatFormProps {
   socket: Socket
}
const ChatForm = ({ socket }: ChatFormProps) => {

	const openId = useUserStore(state => state.open_id)
	const profile_level = useUserStore(state => state.profile_level)
	const avatar = useUserStore(state => state.avatar)
	const nicknameStore = useUserStore(state => state.nickname)
	const nicknameColor = useUserStore(state => state.nickname_color)

   const muteTerm = useUserStore(state => state.muteTerm)

	const [text, setText] = useState('')

   const messageDealy = useRef<NodeJS.Timeout | undefined>(undefined)
   const messagesPerSecond = useRef<number>(0)

	const addChatMessage = (e: any): void => {
		e.preventDefault()

      if ( muteTerm ) {
         setText('')
         return
      }

		const msg: TChatMessage = {
			id: `chat${(+new Date).toString(16)}|${openId}`,
			openId: openId,
			avatar: avatar,
			nickname: nicknameStore,
         nickname_color: nicknameColor,
			profile_level: {
            level: profile_level.level,
            name: profile_level.name
         },
			text: text
		}

		if (text !== '') {
			socket.emit('newMessage', msg)
			setText('')

         clearTimeout(messageDealy.current)

         messageDealy.current = setTimeout(() => {
            messagesPerSecond.current = 0
         }, 1_500)

         messagesPerSecond.current += 1

         if ( messagesPerSecond.current >= 5 ) {
            messagesPerSecond.current = 0
            const term = 5 * 60_000 + Date.now()
            mainSocket.emit('autoMuteUser',
               term,
               useUserStore.getState().nickname
            )
            useUserStore.getState().muteUser(term)
         }
		}
	}

	const enterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			addChatMessage(e)
		}
	}

   const placeholder = muteTerm ? ''
      : 'Если хотите написать что-то в чат,\n то вам сюда'

	return (
		<form className={c.form} onSubmit={addChatMessage} >

         {muteTerm && <MuteTimerMemo muteTerm={muteTerm} />}
	
			<textarea
				rows={2}
				maxLength={300}
				value={text}
				onChange={e => setText(e.target.value)}
				onKeyDown={enterHandler}
				placeholder={placeholder}
            autoComplete="off"
			/>

			<button>
				<svg width="19" height="24" viewBox="0 0 19 24" fill="none" ><path d="M19 7C19 5.62 17.88 4.5 16.5 4.5C16.33 4.5 16.16 4.52 16 4.55V4C16 2.62 14.88 1.5 13.5 1.5C13.27 1.5 13.04 1.53 12.83 1.59C12.46 0.66 11.56 0 10.5 0C9.27 0 8.25 0.89 8.04 2.06C7.87 2.02 7.69 2 7.5 2C6.12 2 5 3.12 5 4.5V10.39C4.66 10.08 4.24 9.85 3.78 9.73L3.01 9.52C2.18 9.29 1.31 9.61 0.820004 10.35C0.440004 10.92 0.420004 11.66 0.670004 12.3L3.23 18.73C4.49 21.91 7.57 24 11 24C15.42 24 19 20.42 19 16V7ZM17 16C17 19.31 14.31 22 11 22C8.39 22 6.05 20.41 5.09 17.99L2.49 11.45L3.02 11.59C3.48 11.71 3.85 12.05 4.02 12.49L5 15H7V4.5C7 4.22 7.22 4 7.5 4C7.78 4 8 4.22 8 4.5V12H10V2.5C10 2.22 10.22 2 10.5 2C10.78 2 11 2.22 11 2.5V12H13V4C13 3.72 13.22 3.5 13.5 3.5C13.78 3.5 14 3.72 14 4V12H16V7C16 6.72 16.22 6.5 16.5 6.5C16.78 6.5 17 6.72 17 7V16Z" fill="white"/></svg>
			</button>

		</form>
	)
}

export { ChatForm }