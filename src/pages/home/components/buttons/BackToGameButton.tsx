import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { mainSocket } from "@/shared/api/socket"
import { classNames, getValidUrl } from "@/shared/lib/utils"

import c from './button.module.scss'
import { useAuthStore } from "@/shared/store/auth"

interface TBackToGameBtnProps {
   children: ReactNode
}
const BackToGameButton = ({ children }: TBackToGameBtnProps) => {

   const isAuth = useAuthStore.getState().isAuth

   const [runned, setRunned] = useState(false)
   
   const { roomId, gameId } = JSON.parse(localStorage.getItem('gameData') || '{}')

   useEffect(() => {
      if ( roomId ) {
         mainSocket.emit('checkRunnedGame', roomId, gameId, (data, error) => {

            if ( !data?.isRunned ) {
               localStorage.removeItem('gameData')
            }

            if ( error || data?.isRunned === undefined ) {
               console.log(error);
               return
            }

            setRunned(data.isRunned)
         })
      }
   }, [roomId])

   if ( !runned ) return <></>
   if ( !isAuth ) return <></>

   return (
      <Link
			to={getValidUrl(`/room/${roomId}/${gameId}`)}
			className={classNames(c.button, c.back_to_game_btn)}
		>
			{children}
		</Link>
   )
}

export { BackToGameButton }