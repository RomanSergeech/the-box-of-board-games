import { classNames } from "@/shared/lib/utils"
import { YesNoSetting } from "../../UI"

import c from '../../settingsTab.module.scss'

const ProfileSettings = () => {
   return (
      <div className={classNames('block', c.block)} >

         <h2 className="block_title" >Профиль</h2>

         <YesNoSetting settingName='disallowFriendRequests' settingText='Запретить заявки в друзья' />

         <YesNoSetting settingName='allowRequestsToTheRoomOnlyToFriends' settingText='В лобби могут приглашать только друзья' />

         <YesNoSetting settingName='allowLeavesCommentsOnlyToFriends' settingText='Коментарии могут оставлять только друзья' />

         <YesNoSetting settingName='disableProfileComments' settingText='Отключить комментарии' />

      </div>
   )
}



export { ProfileSettings }