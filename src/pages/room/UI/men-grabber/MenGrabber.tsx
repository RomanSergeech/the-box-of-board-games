import { useState, useEffect } from 'react'
import { GrabZone } from './GrabZone'
import { useRoomPageStore } from '@/shared/store/room-page'
import { RunGameButton } from '../'
import { Button } from '@/shared/UI'

import './menGrabber.scss'

const MenGrabber = () => {

	const readyPlayers = useRoomPageStore(state => state.readyPlayers)
	const choosedCountUsers = useRoomPageStore(state => state.choosedCountUsers)

	const [cursorGrabbed, setCursorGrabbed] = useState(false)
	// const [gameOver, setGameOver] = useState(false)

	useEffect(() => {
		if (cursorGrabbed) {
			const appEl = document.querySelector('body') as HTMLElement
         console.log(appEl);
			if (appEl) appEl.style.cursor = "none"

			const el = document.querySelector('.common_layout') as HTMLElement
			if (el) el.style.pointerEvents = "none"
		}
	}, [cursorGrabbed])

	const handleCursorGrabbed = () => {
		setCursorGrabbed(true)
		setTimeout(() => {

			setCursorGrabbed(false)

			const appEl = document.querySelector('body') as HTMLElement
			if (appEl) appEl.style.cursor = "auto"

			const el = document.querySelector('.common_layout ') as HTMLElement
			if (el) el.style.pointerEvents = "all"

		}, 2000 );
	}	

	const arePlayersReady = () => {
		return Object.values(readyPlayers).filter(el => el === true).length >= choosedCountUsers && choosedCountUsers > 1
	}

	return (
		<div className='startGameBtn_wrapper' >

			{arePlayersReady()
			?
				<RunGameButton className="trap-button" >Начать игру</RunGameButton>
			:
				<>
               <Button
                  borderColor='main'
                  textColor={'main'}
                  className='trap-button'
               >
                  {cursorGrabbed ? "Не все готовы" : "Начать игру" }
               </Button>

               <div className="grab-zone-wrapper">
                  <GrabZone
                     onCursorGrabbed={handleCursorGrabbed} 
                     cursorGrabbed={cursorGrabbed}
                     // gameOver={gameOver}
                  />
               </div>
				</>
			}
			
		</div>
	)
}

export { MenGrabber }