import { useRef } from "react"
import { useEmitGameConnect } from "../_common/hooks"
import { Chips, Fields, Center, Right, Left } from "./components"
import { useMonopolyStore } from "./game.store"
import { useSubscribeToGameEvents, useGamepad } from "./hooks"
import { monopolySocket } from "@/shared/api/socket"

import type { TGameData as TMonopolyGameData } from "@/shared/types/games-service/monopoly.types"

import c from './monopoly.module.scss'

const Monopoly = () => {

   const elRef = useRef<HTMLDivElement>(null)

	useSubscribeToGameEvents()

   useEmitGameConnect(monopolySocket, ( gameData ) => {
		useMonopolyStore.getState().gameData( gameData as TMonopolyGameData )
   })

   useGamepad()

   console.log('Monopoly render');
	return (
		<div className={c.monopoly} ref={elRef} >

         <Left />

         <div className={c.game_body} >
            <Fields />
            <Center />
            <Chips />
         </div>

         <Right />

      </div>
	)
}

export { Monopoly }