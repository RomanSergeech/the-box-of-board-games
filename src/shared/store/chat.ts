import { create } from "zustand"
import { devtools } from "zustand/middleware"

import type { TChatMessage, TChatAllMessages } from "@/shared/types/main-service/mainNsp.types"


interface TChatState {
	allMessages: TChatAllMessages
	newMessage: TChatMessage

	online: number
}

interface TChatStore extends TChatState {
	addNewMessage: ( message: TChatMessage ) => void
	deleteMessage: ( msgId: string ) => void
   resetChatData: () => void
}

const initialState: TChatState = {
	allMessages: [],
	newMessage: {id: '', openId: '', avatar: '', profile_level: {level:'level_1', name: ''}, nickname: '', nickname_color: '', text: ''},

	online: 0
}

export const useChatStore = create(
	devtools<TChatStore>((set, get) => ({
		...initialState,

		addNewMessage: ( message ) => {
         const allMessages = structuredClone(get().allMessages)
         allMessages.push(message)
			set({ allMessages })
		},

		deleteMessage: ( msgId ) => {
         const allMessages = structuredClone(get().allMessages)
         allMessages.forEach(msg => {
            if ( msg.id === msgId ) {
               allMessages.splice( allMessages.indexOf(msg), 1 )
            }
         })
			set({ allMessages })
		},

      resetChatData: () => {
         set(initialState)
      }

	}))
)