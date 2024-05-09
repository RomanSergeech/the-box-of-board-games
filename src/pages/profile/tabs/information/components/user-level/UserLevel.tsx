import { classNames } from '@/shared/lib/utils'
import { formatNumber } from '@/shared/lib/utils'
import { useUserStore } from '@/shared/store/user'
import { ThemesComponents } from '@/shared/UI'

import c from './userLevel.module.scss'

interface UserLevelProps {
   allXp: number
}
const UserLevel = ({ allXp }: UserLevelProps) => {

   const profileTheme = useUserStore(state => state.profileTheme)

   return (
      <div className={classNames('block', c.user_level, c[profileTheme || ''])} >

         <ThemesComponents c={c} />

         <span className={c.title} >Накоплено опыта</span>

         <div className={c.xp} >
            <span>{formatNumber(allXp)} xp</span>
            <span>За всё время</span>
         </div>

      </div>
   )
}

export { UserLevel }