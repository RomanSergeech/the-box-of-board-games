import { Link } from 'react-router-dom'
import { TUserProfileLevel } from '@/shared/store/user'
import { TooltipWrapper } from '@/shared/UI'
import { useWindowWidth } from '@/shared/lib/hooks'

import c from './profileLevel.module.scss'
import { getDate } from '@/shared/lib/utils'

interface ProfileLevelProps {
   profileLevel: TUserProfileLevel
}
const ProfileLevel = ({ profileLevel }: ProfileLevelProps) => {

   const windowWidth = useWindowWidth()

   return (
      <div className={c.profile_level} >

         <span>Уровень профиля:</span>

         <TooltipWrapper
            orientation={windowWidth < 600 ? '_bottom' : '_right'}
            hoverEffect={true}

            tooltipBody={<>
               {profileLevel.date
                  ? <p>до {getDate(profileLevel.date, 'D M Y')}</p>
                  : <p>Можно повысить</p>
               }
               <Link className='tooltip_link' to="/shop" >Перейти в магазин</Link>
            </>}
         >
            <span className={c.status_name} >{profileLevel.name}</span>
         </TooltipWrapper>

      </div>
   )
}

export { ProfileLevel }