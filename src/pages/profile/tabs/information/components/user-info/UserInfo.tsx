import { classNames } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"
import { Nickname, UserAvatar, OpenId, ProfileLevel } from "./elements"
import { ThemesComponents } from "@/shared/UI"

import c from './userInfo.module.scss'

const UserInfo = () => {

   const openId = useUserStore.getState().open_id
   const profileLevel = useUserStore.getState().profile_level
   const profileTheme = useUserStore(state => state.profileTheme)

   return (
      // <div className={classNames('block', c.user_info)} >
      <div className={classNames(
         'block',
         c[profileTheme || ''],
         profileTheme === 'day_night' ? c._sun : '',
         profileTheme === 'car' ? c._car : '',
         profileTheme === 'virus' ? c._virus : '',
         c.user_info
      )} >

         <ThemesComponents c={c} />

         <UserAvatar />

         <Nickname />

         <OpenId openId={openId} />

         <ProfileLevel profileLevel={profileLevel} />

      </div>
   )
}

export { UserInfo }