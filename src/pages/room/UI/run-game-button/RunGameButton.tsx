import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"
import { Button } from "@/shared/UI"
import { getValidUrl, showAlert } from "@/shared/lib/utils"


import c from '../../roomPage.module.scss'

interface TRunGameBtnProps {
	children: any
	className: string
}
const RunGameButton = ({ children, ...props }: TRunGameBtnProps) => {

   const roomId = useRoomPageStore(state => state.roomId)
   const choosedGame = useRoomPageStore(state => state.choosedGame)

	const [gameRunned, setGameRunned] = useState(false)

	const navigate = useNavigate()

	const runGame = () => {
		setGameRunned(true)

		roomSocket.emit('createGame', ({ err, gameCreated }) => {

         if ( err ) {
            setGameRunned(false)
         }

			if ( err === 'Room Not Found' ) {
				navigate('/home')
				showAlert({
					text: ['Комнаты с таким id не существует'],
					textBtn: 'Закрыть'
				}, 4000)
				return
			}

			if ( err === 'Already Game Created' ) {
            console.log(err);
				if ( choosedGame ) navigate(`/room/${roomId}/${getValidUrl(choosedGame)}`)
				return
			}

         if ( err === 'Game Is Not Available' ) {
            showAlert({
					text: ['Сервис игры не отвечает'],
					textBtn: 'Попробую позже'
				}, 4000)
				return
			}

         console.log(gameCreated);
         
         if ( gameCreated ) {
            useRoomPageStore.getState().resetRoomData()
            if ( choosedGame ) navigate(`/room/${roomId}/${getValidUrl(choosedGame)}`)
         }

		})

	}

	return (
		<>
			{gameRunned
			? <p className={c.waiting_start_game} >Создаем игровую сессию...</p>
			: <Button borderColor='main' textColor='main' {...props} onClick={runGame} >{children}</Button>
			}
		</>
	)
}

export { RunGameButton }