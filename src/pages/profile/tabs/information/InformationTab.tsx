import { ButtonsBlock, Comments, SomeUserInfo, UserGames, UserInfo, UserItems, UserLevel } from './components'
import { useAuthStore } from '@/shared/store/auth'

import type { TAllGamesIds, TAllItemsIds } from '@/shared/types/main-service/constants'
import type { TProfileComments } from '@/shared/types/main-service/user.types'
import type { TCommentsSomeUserData } from './components/comments/Comments'

import c from './informationTab.module.scss'

interface InformationTabProps {
   allXp: number
   games: TAllGamesIds[]
   items: TAllItemsIds[]
   comments: TProfileComments
   me: boolean
   someUserData?: TCommentsSomeUserData
}
export const InformationTab = ({ allXp, games, items, comments, me, someUserData }: InformationTabProps) => {

   const isAuth = useAuthStore.getState().isAuth

   return (
      <div className={c.information} >

         {someUserData?.someUserId
            ? <SomeUserInfo />
            : <UserInfo />
         }

         <UserLevel allXp={allXp} />

         {someUserData?.someUserId && isAuth &&
            <ButtonsBlock />
         }

         <UserGames games={games} />

         <UserItems items={items} />

         <Comments
            comments={comments}
            me={me}
            someUserData={someUserData}
         />

      </div>
   )
}
