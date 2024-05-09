import { memo } from 'react'
import { useAuthStore } from '@/shared/store/auth'
import { useNavigate } from 'react-router-dom'
import { classNames, showAlert } from '@/shared/lib/utils'
import { TVkOAuthData } from '@/shared/types/main-service/auth.types'

import c from './buttons.module.scss'


const DOMEN_URL = import.meta.env.VITE_DOMEN_URL

const VK_OAUTH_PAGE_URL = import.meta.env.VITE_VK_OAUTH_PAGE_URL


interface VkButtonProps {
   buttonSize?: 'm' | 'xl' | 's'
}
const VkButton = memo(({ buttonSize = 'xl' }: VkButtonProps) => {

   const navigate = useNavigate()

   const authHandler = () => {
      const w = 640
      const h = 720
      const left = screen.width/2 - w/2;
      const top = screen.height/2 - h/2;

      const vkOAuthPage = window.open(
         VK_OAUTH_PAGE_URL,
         'popup',
         `height=${h}, width=${w}, left=${left}, top=${top}`
      )
      if ( vkOAuthPage ) {
         vkOAuthPage.focus()

         window.addEventListener('message', callback)

         function callback( event: MessageEvent<TVkOAuthData> ) {

////////////////////////////////////////////////////////////////////////////////////////////
            if ( event.origin.includes(DOMEN_URL) ) {
               console.log(event.origin);
            }
////////////////////////////////////////////////////////////////////////////////////////////

            if (event.origin !== DOMEN_URL) {
               return;
            }

            window.removeEventListener('message', callback)

            const payload = event.data

            if ( !payload ) {
               showAlert({
                  text: ['Сервис не отвечает'],
                  textBtn: 'Закрыть'
               }, 3000)
               return
            }

            useAuthStore.getState().oauthVk(payload)
               .then(() => {
                  console.log('authorized');
                  navigate('/home')
               })
               .catch(err => {
                  console.log(err);
                  showAlert({
                     text: [err?.message],
                     textBtn: 'Закрыть'
                  }, 3000)
               })
         }
      }
   }

   return (
      <div className={classNames(c.button_wrapper, c.vk_button, c[buttonSize])} >
         <button
            onClick={authHandler}
            id="VKIDSDKAuthButton"
            className={classNames('VkIdWebSdk__button', 'VkIdWebSdk__button_reset', c[buttonSize])}
         >
            <div className="VkIdWebSdk__button_container">
               <div className="VkIdWebSdk__button_icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M3 13.56C3 8.58197 3 6.09295 4.54648 4.54648C6.09295 3 8.58197 3 13.56 3H14.44C19.418 3 21.907 3 23.4535 4.54648C25 6.09295 25 8.58197 25 13.56V14.44C25 19.418 25 21.907 23.4535 23.4535C21.907 25 19.418 25 14.44 25H13.56C8.58197 25 6.09295 25 4.54648 23.4535C3 21.907 3 19.418 3 14.44V13.56Z" fill="white"/>
                     <path d="M14.7064 18.9002C9.684 18.9002 6.81931 15.4467 6.69995 9.7002H9.21574C9.29838 13.918 11.1531 15.7046 12.6221 16.073V9.7002H14.9911V13.3378C16.4418 13.1813 17.9658 11.5236 18.48 9.7002H20.849C20.4541 11.9472 18.8014 13.6049 17.6262 14.2864C18.8014 14.8389 20.6838 16.2848 21.4 18.9002H18.7923C18.2322 17.1504 16.8366 15.7967 14.9911 15.6125V18.9002H14.7064Z" fill="#0077FF"/>
                  </svg>
               </div>
            </div>
         </button>
      </div>
   )
})

interface VkButtonDummyProps {
   buttonSize?: 'm' | 'xl' | 's'
}
const VkButtonDummy = ({ buttonSize = 'xl' }: VkButtonDummyProps) => {
   return (
      <div className={classNames(c.button_wrapper, c.vk_button, c.button_dummy, c[buttonSize])} >
         <button
            id="VKIDSDKAuthButton"
            className={classNames('VkIdWebSdk__button', 'VkIdWebSdk__button_reset', c[buttonSize])}
         >
            <div className="VkIdWebSdk__button_container">
               <div className="VkIdWebSdk__button_icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M3 13.56C3 8.58197 3 6.09295 4.54648 4.54648C6.09295 3 8.58197 3 13.56 3H14.44C19.418 3 21.907 3 23.4535 4.54648C25 6.09295 25 8.58197 25 13.56V14.44C25 19.418 25 21.907 23.4535 23.4535C21.907 25 19.418 25 14.44 25H13.56C8.58197 25 6.09295 25 4.54648 23.4535C3 21.907 3 19.418 3 14.44V13.56Z" fill="white"/>
                     <path d="M14.7064 18.9002C9.684 18.9002 6.81931 15.4467 6.69995 9.7002H9.21574C9.29838 13.918 11.1531 15.7046 12.6221 16.073V9.7002H14.9911V13.3378C16.4418 13.1813 17.9658 11.5236 18.48 9.7002H20.849C20.4541 11.9472 18.8014 13.6049 17.6262 14.2864C18.8014 14.8389 20.6838 16.2848 21.4 18.9002H18.7923C18.2322 17.1504 16.8366 15.7967 14.9911 15.6125V18.9002H14.7064Z" fill="#0077FF"/>
                  </svg>
               </div>
            </div>
         </button>
         <span>привязан</span>
      </div>
   )
}

export { VkButton, VkButtonDummy }