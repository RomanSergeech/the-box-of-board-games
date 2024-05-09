import { useEffect, useRef } from 'react'
import { useChatStore } from '@/shared/store/chat'
import { Message } from './message/Message'

import c from './messages.module.scss'

const Messages = () => {

	const allMessages = useChatStore(state => state.allMessages)

	const messagesElRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const elem = messagesElRef.current

		if ( elem && elem.scrollTop === 0 ) {
			elem.scrollTop = elem.scrollHeight
		}
		else if ( elem && elem.scrollHeight - elem.scrollTop < 700 ) {
			elem.scrollTop = elem.scrollHeight
		}

	}, [allMessages])

	return (
		<div className={c.messages_wrapper} >
			<div className={c.messages} ref={messagesElRef} >

				{allMessages.length > 0 && allMessages.map(message =>
					<Message key={message.id} message={message} />
				)}

			</div>
		</div>
	)
}


export { Messages }