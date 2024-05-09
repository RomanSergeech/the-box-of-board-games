import { VkButton, YandexButton } from '@/widgets/oauth-buttons'
import { useWindowWidth } from '@/shared/lib/hooks'

import c from './socialsAuth.module.scss'


const RULES_URL = import.meta.env.VITE_DOCUMENTS_SUBDOMEN_URL + '/rules'


export const SocialsAuth = () => {

   const windowWidth = useWindowWidth()

   return (
      <div className={c.socials} >

         <div className={c.buttons} >

            <YandexButton buttonSize={windowWidth > 1000 ? 'xl' : 'm'} />

            <VkButton buttonSize={windowWidth > 1000 ? 'xl' : 'm'} />

         </div>

         <p>При регистрации через сервис<br/> вы соглашаетесь с <a
               href={RULES_URL}
               target="_blank"
               tabIndex={9}
            >
               Правилами сайта
            </a>
         </p>

      </div>
   )
}
