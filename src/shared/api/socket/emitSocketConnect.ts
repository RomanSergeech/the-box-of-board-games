import { Socket } from "socket.io-client"
import { useAlertStore } from "@/shared/store/alert"
import { useUserStore } from "@/shared/store/user"
import { getFriendsArr } from "@/shared/lib/utils"

import type { NavigateFunction } from "react-router-dom"

export const emitSocketConnect = ( socket: Socket, navigate?: NavigateFunction ) => {

	const openId = useUserStore.getState().open_id
	const friends = getFriendsArr()

	socket.emit("socketConnect", openId, friends, ( haveOpenTab: boolean ) => {
		if (haveOpenTab) {

			navigate?.('/')

			useAlertStore.getState().activateAlert({
				text: ['У вас уже есть открытая вкладка']
			})

			useAlertStore.setState({ blockSite: true })
		}
      else {
         socket.on("connect_error", (error) => {
            console.log('connect_error\n', error);
          });
         socket.on('disconnect', (reason) => {
            console.log('disconnect reason\n', reason);
         })
      }
	})

}