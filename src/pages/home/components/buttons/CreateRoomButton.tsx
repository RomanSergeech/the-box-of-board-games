import { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRoomPageStore } from "@/shared/store/room-page"
import { useUserStore } from "@/shared/store/user"
import { mainSocket, roomSocket } from "@/shared/api/socket"
import { showAlert } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { EProfileLevel } from "@/shared/types/main-service/constants"
import { TAllGamesIds } from "@/shared/types/main-service/constants"
import { useAuthStore } from "@/shared/store/auth"
import { useHeaderStore } from "@/shared/store/header"

import c from './button.module.scss'

interface CreateRoomBtnProps {
	children: ReactNode
	isPublic?: boolean
}
const CreateRoomButton = ({ children, isPublic = false }: CreateRoomBtnProps) => {

   const openIdStore = useUserStore(state => state.open_id)
	const nicknameStore = useUserStore(state => state.nickname)
	const avatar = useUserStore(state => state.avatar)
   
   const isAuth = useAuthStore.getState().isAuth
   const activateLoginTab = useHeaderStore.getState().activateLoginTab

	const roomId = `rwd${(+new Date).toString(16)}`

	const navigate = useNavigate()

	const createGameHandler = () => {

		useRoomPageStore.setState({ isPublic })

      const profileLevel = useUserStore.getState().profile_level
      const profileGames = useUserStore.getState().games
      const allGames = useShopStore.getState().allGames

		const data = {
			roomId,
			openId: openIdStore,
			nickname: nicknameStore,
			avatar,
			isPublic,
         availableGames: profileLevel.level === EProfileLevel.level_3
            ? Object.keys(allGames || {}) as TAllGamesIds[]
            : profileGames
		}

		mainSocket.disconnect()
		roomSocket.connect()

		roomSocket.emit('createRoom', data, ({ err }) => {

			if ( err ) {
				navigate('/home')

				showAlert({
					text: ['Что-то пошло не так, попробуйте еще раз'],
					textBtn: 'Ок'
				}, 4000)
				return
			}

         window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

		})
	}

   if ( !isAuth ) {
      return (
         <button className={c.button} onClick={activateLoginTab} >
            {children}
         </button>
      )
   }

	return (
		<Link
			to={`/room/${roomId}`}
			className={c.button}
			onClick={createGameHandler}
		>
			{children}
		</Link>
	)
}

export { CreateRoomButton }