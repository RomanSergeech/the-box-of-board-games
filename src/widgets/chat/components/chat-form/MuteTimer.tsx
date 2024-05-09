import { memo, useEffect, useRef, useState } from "react"
import { mainSocket } from "@/shared/api/socket"
import { useUserStore } from "@/shared/store/user"
import { getDate } from "@/shared/lib/utils"

import c from './chatForm.module.scss'

interface MuteTimerProps {
   muteTerm: number
}
const MuteTimer = ({muteTerm}: MuteTimerProps) => {

   const [timer, setTimer] = useState(0)

   const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)

   const returnFunc = () => {
      clearTimeout(timerRef.current)
   }

   useEffect(() => {
      if ( muteTerm ) {
         setTimer(muteTerm - Date.now())
      }
   }, [muteTerm])

   useEffect(() => {

      if ( timer > 10_000 * 60_000 || !muteTerm || muteTerm <= 0 ) {
         return returnFunc
      }

      timerRef.current = setTimeout(() => {
         setTimer(prev => {
            const time = prev - 1000
            if ( time <= 1000 ) {
               mainSocket.emit('checkIsUserMuted')
               return 0
            }
            return time
         })
         if ( timer <= 1_000 ) {
            useUserStore.setState({ muteTerm: null })
         }
      }, 1000)

      return returnFunc
   }, [timer])

   if ( muteTerm === null ) return <></>

   return (
      <div className={c.mute_timer} >
         {msToTime(timer, muteTerm)}
      </div>
   )
}

function msToTime( duration: number, muteTerm: number ) {

   if ( duration > 10_000 * 60_000 ) {
      return 'замучен до ' + getDate(muteTerm, 'D M Y') + ' года'
   }

   const date = new Date(duration)

   const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

   let time = date.getMinutes() + " мин. " + date.getSeconds() + ' сек.'

   if ( hours > 0 ) {
      time = getHours(hours) + time
   }

	return time
}

const getHours = ( hours: number ) => {
   if ( hours === 1 || hours > 20 && hours % 10 === 1 ) {
      return hours + ' час '
   } else if ( hours > 1 && hours < 5 || hours > 20 && hours % 10 > 1 && hours % 10 < 5 ) {
      return hours + ' часа '
   } else {
      return hours + ' часов '
   }
}

export const MuteTimerMemo = memo(MuteTimer)