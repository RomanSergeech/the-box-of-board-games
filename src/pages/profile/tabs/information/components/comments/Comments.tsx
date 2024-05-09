import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, TooltipWrapper } from '@/shared/UI'
import { GetUrl, classNames, getDate } from '@/shared/lib/utils'
import { CommentForm } from './comment-form/CommentForm'
import { useUserStore } from '@/shared/store/user'
import { useWindowWidth } from '@/shared/lib/hooks'
import { useSomeUserProfileStore } from '@/shared/store/some-user'
import { useAuthStore } from '@/shared/store/auth'

import type { TSomeUserDto } from '@/shared/types/main-service/auth.types'
import type { TProfileComment, TProfileComments } from '@/shared/types/main-service/user.types'

import c from './comments.module.scss'

export type TCommentsSomeUserData = {
   someUserId: string
   inBlackList: boolean
   withBlackMark: boolean
   isFriend: boolean
   profile_settings: TSomeUserDto['profile_settings']
}

interface CommentsProps {
   comments: TProfileComments
   me: boolean
   someUserData?: TCommentsSomeUserData
}
const Comments = ({ comments, me, someUserData }: CommentsProps) => {

   const { someUserId, inBlackList, withBlackMark, isFriend, profile_settings } = someUserData || {}

   const isAuth = useAuthStore.getState().isAuth
   const openIdStore = useUserStore.getState().open_id

   if (profile_settings?.disableProfileComments) return <></>

   const commentsForm = () => {

      if ( !isAuth ) {
         return <></>
      }

      if (!someUserId || me || inBlackList || withBlackMark) {
         return <></>
      }

      if (profile_settings?.allowLeavesCommentsOnlyToFriends && !isFriend) {
         return <></>
      }

      const ids = Object.values(comments).reduce<string[]>((acc, comment) => {
         acc.push(comment.openId)
         return acc
      }, [])

      if ( ids.includes(openIdStore) ) {
         return <></>
      }

      return <CommentForm />
   }

   return (
      <div className={classNames('block', c.comments)} >

         <h2 className='block_title' >Комментарии</h2>

         <div className={c.comments_wrapper} >

            {Object.values(comments).map(comment => (
               <Comment key={comment.id} comment={comment} someUserId={someUserId} />
            ))}

            {Object.values(comments).length === 0 && (
               me
                  ? <span>Здесь другие пользователи могут оставить комментарии для вас</span>
                  : <span>Пока пусто</span>
            )}

         </div>

         {commentsForm()}

      </div>
   )
}

interface CommentProps {
   comment: TProfileComment
   someUserId: string | undefined
}
const Comment = ({ comment, someUserId }: CommentProps) => {

   const openIdStore = useUserStore.getState().open_id

   const [confirm, setConfirm] = useState(false)

   const windowWidth = useWindowWidth()

   const deleteComment = () => {
      useSomeUserProfileStore.getState().deleteComment(someUserId || openIdStore, comment.id)
   }

   return (
      <div className={c.comment} >

         <Avatar src={GetUrl.avatars(comment.avatar)} width='40px' height='40px' />

         <TooltipWrapper
            orientation={'_top'}
            className={c.tooltip_wrapper_nickname}
            tooltipBody={
               <Link
                  to={`/profile/${comment.openId}`}
                  className='tooltip_link'
                  onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
               >
                  Профиль
               </Link>
            }
         >
            <p className={c.nickname} >{comment.nickname}</p>
         </TooltipWrapper>

         <p className={c.date} >{getDate(comment.date, 'D M в HM')}</p>

         <p>{comment.text}</p>

         {(!someUserId || openIdStore === comment.openId) &&
            <TooltipWrapper
               orientation={windowWidth < 600 ? '_left' : '_top'}
               className={c.tooltip_wrapper_options}
               onCloseAction={() => setConfirm(false)}
               tooltipBody={
                  confirm
                     ? <span className={c.delete_comment_btn} onClick={deleteComment} >Подтвердить</span>
                     : <span className={c.delete_comment_btn} onClick={() => setConfirm(true)} >Удалить комментарий</span>
               }
            >
               <span className={c.options} >
                  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" ><path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14C0 13.45 0.195833 12.9792 0.5875 12.5875C0.979167 12.1958 1.45 12 2 12C2.55 12 3.02083 12.1958 3.4125 12.5875C3.80417 12.9792 4 13.45 4 14C4 14.55 3.80417 15.0208 3.4125 15.4125C3.02083 15.8042 2.55 16 2 16ZM2 10C1.45 10 0.979167 9.80417 0.5875 9.4125C0.195833 9.02083 0 8.55 0 8C0 7.45 0.195833 6.97917 0.5875 6.5875C0.979167 6.19583 1.45 6 2 6C2.55 6 3.02083 6.19583 3.4125 6.5875C3.80417 6.97917 4 7.45 4 8C4 8.55 3.80417 9.02083 3.4125 9.4125C3.02083 9.80417 2.55 10 2 10ZM2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4Z" fill="#DED500" /></svg>
               </span>
            </TooltipWrapper>
         }

      </div>
   )
}



export { Comments }