import { useSomeUserProfileStore } from "@/shared/store/some-user"
import { classNames } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"
import { BlockUserButton, DeleteFriendButton, FriendRequestButton, SendComplaintButton } from "./buttons"

import c from '../../informationTab.module.scss'

const ButtonsBlock = () => {

   const nicknameStore = useUserStore.getState().nickname
   const userData = useSomeUserProfileStore()
   const inBlackList = useUserStore(state => state.black_list.includes(userData.open_id))
   const withBlackMark = useUserStore(state => state.black_mark.includes(userData.open_id))

   if ( userData.nickname === nicknameStore ) {
      return <></>
   }

   return (
      <div className={classNames('block', c.buttons_block)} >

         {!withBlackMark && !inBlackList &&
          (!userData.profile_settings?.disallowFriendRequests || userData.isFriend) &&
          (userData.isFriend
               ?
                  <DeleteFriendButton openId={userData.open_id} />
               :
                  <FriendRequestButton
                     openId={userData.open_id}
                     wasAlreadySentFriendRequest={userData.wasAlreadySentFriendRequest}
                  />
            )
         }

         {!userData.isFriend && (userData.profile_settings?.disallowFriendRequests && !inBlackList) &&
            <button className={c.hidden_button} style={{ pointerEvents: 'none' }} ></button>
         }

         <SendComplaintButton />

         <BlockUserButton openId={userData.open_id} blocked={inBlackList} />

      </div>
   )
}





export { ButtonsBlock }