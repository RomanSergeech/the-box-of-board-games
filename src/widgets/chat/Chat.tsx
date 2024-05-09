import { useState } from "react"
import { Socket } from "socket.io-client"
import { ChatForm, Messages, Online } from './components'
import { classNames } from "@/shared/lib/utils"

import c from './chat.module.scss'
import { useAuthStore } from "@/shared/store/auth"

interface ChatProps {
   title: string
   socket: Socket
   className?: string
}
const Chat = ({ title, socket, className }: ChatProps) => {

   const isAuth = useAuthStore.getState().isAuth
	const [activeChat, setActiveChat] = useState(false)

	return (
		<div className={classNames('block', c.chat, className, activeChat ? c._active : '')}>

			<span
				className={c.open_chat_btn}
				onClick={() => setActiveChat(prev => !prev)}
			>
				{activeChat ? 'Закрыть' : 'Чат'}
			</span>

			<h2 className="block_title" >{title}</h2>

         <span className="line"></span>

			<div>

				<Online />

				<Messages />

            {isAuth
               ? <ChatForm socket={socket} />
               : <div className={c.empty_form} ><span className="line"></span></div>
            }

			</div>

		</div>
	)
}

export { Chat }