import { classNames, getDate } from '@/shared/lib/utils'
import { useAdminStore } from '@/shared/store/admin'
import { Button } from '@/shared/UI'

import c from './mutedUsers.module.scss'

const MutedUsers = () => {

   const mutedUsers = useAdminStore(state => state.mutedUsers)

   const unmuteUserHandler = ( openId: string ) => {
      useAdminStore.getState().unmuteUser(openId)
   }

   return (
      <div className={classNames('block', c.muted_users)} >
         {mutedUsers.map(user => {
            const term = user.term - Date.now()
            const date = new Date(term)
            const hours = Math.floor((term / (1000 * 60 * 60)) % 24)
            let time = date.getMinutes() + ' мин. ' + date.getSeconds() + ' сек.'
            if ( hours > 0 ) {
               time = getHours(hours) + time
            }
            return (
               <div key={user.open_id} >
                  <p>{user.nickname}</p>
                  <p>{user.open_id}</p>
                  <p>{getDate(user.term, 'd.m.y | HMS')}<br/>еще {time}</p>
                  <p>{user.reason}</p>
                  <Button onClick={() => unmuteUserHandler(user.open_id)} >Размутить</Button>
               </div>
            )
         })}
      </div>
   )
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

export { MutedUsers }