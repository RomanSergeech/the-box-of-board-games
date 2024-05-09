import { useRoomPageStore } from "@/shared/store/room-page"
import { BecomeHost } from "../become-host/BecomeHost"
import { Player } from "./Player"

import type { TRoomUser, TRoomUsers } from "@/shared/types/main-service/roomNsp.types"



const Players = () => {

	const users = useRoomPageStore(state => makeTheHostFirst(state.users))

   if ( users.length === 1 && users[0]?.openId === '' ) return <></>

	return (
		<>
			{users.map(user => {
            if ( user.openId ) return <Player key={user.openId} user={user} />
            else return <BecomeHost key='becomeHost' />
         })}
		</>
	)
}

function makeTheHostFirst( users: TRoomUsers ) {

   let haveHost = false

   const newUsers = Object.values(users).reduce<TRoomUser[]>((acc, user) => {
      
      if ( user?.host ) {
         acc.unshift(user)
         haveHost = true
      }
      else acc.push(user)

      return acc
   }, [])

   if ( !haveHost ) {
      newUsers.unshift({
         openId: '',
         nickname: '',
         avatar: '',
         color: 'empty',
         reconnecting: false
      })
   }

   return newUsers
}

export { Players }