import { Link } from "react-router-dom"
import { useDeleteDataInIndexedDb, useEmitRoomConnect, useSubscribeToRoomEvents } from "./hooks"
import { Logo } from "@/shared/UI"
import { Chat, Footer } from "@/widgets"
import { GameSettings, MainSettings, PlayersBlock } from "./components"
import { MenNotice } from "./UI"
import { roomSocket } from "@/shared/api/socket"
import { usePageCounter } from "@/shared/lib/hooks/yandex-metrika"

import c from './roomPage.module.scss'

const RoomPage = () => {

   usePageCounter()

	useSubscribeToRoomEvents()
	
   useEmitRoomConnect()
   
   useDeleteDataInIndexedDb()

	return (
		<div className='common_layout' >

			<main className={c.main} >

				<MenNotice />

				<div className={c.top}>
					<Link to="/home" className={c.logo} ><Logo /></Link>
					<h1 className='page_title' >Создать игру</h1>
				</div>

            <MainSettings />

            <PlayersBlock />

            <GameSettings />

            <Chat title="Внутренний чат" className={c.chat} socket={roomSocket} />

			</main>

			<Footer className={c.footer} />

		</div>
	)
}

export { RoomPage }