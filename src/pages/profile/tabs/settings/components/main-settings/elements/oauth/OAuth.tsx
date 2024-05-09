import { VkButton, VkButtonDummy, YandexButton, YandexButtonDummy } from '@/widgets/oauth-buttons'
import { useUserStore } from '@/shared/store/user'
import { useWindowWidth } from '@/shared/lib/hooks'

import c1 from './oauth.module.scss'
import c2 from '../../../../settingsTab.module.scss'

const OAuth = () => {

   const authWith = useUserStore.getState().auth_with

   const windowWidth = useWindowWidth()

   return (
      <div className={c2.setting} >

         <p className={c2.text} >Привязать сервис</p>

         <div className={c1.buttons_wrapper} >

            {authWith.includes('yandex')
               ? <YandexButtonDummy buttonSize={windowWidth > 1000 ? 'm' : 's'} />
               : <YandexButton buttonSize={windowWidth > 1000 ? 'm' : 's'} />
            }

            {authWith.includes('vk')
               ? <VkButtonDummy buttonSize={windowWidth > 1000 ? 'm' : 's'} />
               : <VkButton buttonSize={windowWidth > 1000 ? 'm' : 's'} />
            }

         </div>
      </div>
   )
}

export { OAuth }