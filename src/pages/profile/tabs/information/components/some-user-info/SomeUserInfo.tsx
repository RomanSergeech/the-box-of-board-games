import { GetUrl, classNames } from "@/shared/lib/utils"
import { OpenId, ProfileLevel } from "../user-info/elements"
import { useSomeUserProfileStore } from "@/shared/store/some-user"
import { Avatar, OnlineStatus } from "@/shared/UI"

import c from './someUserInfo.module.scss'

const SomeUserInfo = () => {

   const { openId, avatar, nickname, profileLevel, isOnline } = useSomeUserProfileStore(state => ({
      openId: state.open_id,
      avatar: state.avatar,
      nickname: state.nickname,
      profileLevel: state.profile_level,
      isOnline: state.isOnline,
      isFriend: state.isFriend
   }))

   return (
      <div className={classNames('block', c.user_info)} >

         <Avatar src={GetUrl.avatars(avatar)} className={c.user_avatar} />

         <div className={c.nickname} >{nickname}</div>

         <OpenId openId={openId} />

         <ProfileLevel profileLevel={profileLevel} />

         <OnlineStatus isOnline={isOnline} className={c.online_status} />

      </div>
   )
}

export { SomeUserInfo }