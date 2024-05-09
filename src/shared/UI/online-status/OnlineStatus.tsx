import { classNames } from '@/shared/lib/utils'

import c from './onlineStatus.module.scss'

interface OnlineStatusProps {
   isOnline: boolean
   className?: string
}
const OnlineStatus = ({ isOnline, className }: OnlineStatusProps) => {
   return (
      <div className={classNames(c.online_status, className)} >
         {isOnline
            ?
            <>
               <svg className={c.online} width="10" height="10" viewBox="0 0 10 10" fill="none" ><rect width="10" height="10" rx="5" fill="#00FF19"/></svg>
               Онлайн
            </>
            :
            <>
               <svg className={c.offline} width="10" height="10" viewBox="0 0 10 10" fill="none" ><rect width="10" height="10" rx="5" fill="#FF0000"/></svg>
               Не в сети
            </>
         }
      </div>
   )
}

export { OnlineStatus }