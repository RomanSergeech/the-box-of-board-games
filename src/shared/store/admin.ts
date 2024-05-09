import { create } from "zustand"
import { adminSocket } from "../api/socket"
import { deleteFromArrayByMutation, showAlert } from "../lib/utils"

import type { TMutedUser } from "../types/main-service/user.types"

interface TAdminState {
   socketConnected: boolean
   mutedUsers: TMutedUser[]
}

interface TAdminStore extends TAdminState {
   deleteChatMessage: ( msgId: string ) => void
   muteUser: (data: { open_id: string, nickname: string, term: number, reason: string } ) => void
   unmuteUser: ( openId: string ) => void
}

const initialState: TAdminState = {
   socketConnected: false,
   mutedUsers: []
}

export const useAdminStore = create<TAdminStore>(
	(set, get) => ({
		...initialState,

      deleteChatMessage: ( msgId ) => {
         adminSocket.emit('deleteChatMessage', msgId)
      },

      muteUser: ( data ) => {
         adminSocket.emit('muteUser', data, ( res, err ) => {
            if ( err ) {
               console.log(err);
               showAlert({
                  text: [err?.message || ''],
                  textBtn: 'Закрыть'
               }, 3000)
            }

            const mutedUser = res?.user

            if ( mutedUser ) {
               showAlert({
                  text: ['Пользователь замучен'],
                  textBtn: 'Закрыть'
               }, 3000)

               const mutedUsers = get().mutedUsers.reduce<TMutedUser[]>((acc, user) => {
                  if ( mutedUser.open_id === user.open_id ) {
                     deleteFromArrayByMutation(acc, user)
                  }
                  return acc
               }, [...get().mutedUsers])

               mutedUsers.push(mutedUser)

               set({ mutedUsers })
            }
         })
      },

      unmuteUser: ( openId ) => {
         adminSocket.emit('unmuteUser', openId, ( res, err ) => {
            if ( err ) {
               console.log(err);
               showAlert({
                  text: [err?.message || ''],
                  textBtn: 'Закрыть'
               }, 3000)
            }

            const openId = res?.openId

            if ( openId ) {
               showAlert({
                  text: ['Пользователь размучен'],
                  textBtn: 'Закрыть'
               }, 2000)

               const mutedUsers = get().mutedUsers.reduce<TMutedUser[]>((acc, user) => {
                  if ( openId === user.open_id ) {
                     deleteFromArrayByMutation(acc, user)
                  }
                  return acc
               }, [...get().mutedUsers])

               set({ mutedUsers })
            }
         })
      }

	})
)
