import { useUserStore } from "@/shared/store/user"
import { classNames, getFriendsArr, showAlert } from "@/shared/lib/utils"
import { Email, OAuth, Password } from "./elements"

import c2 from '../../settingsTab.module.scss'

const MainSettings = () => {
   return (
      <div className={classNames('block', c2.block)} >

         <h2 className="block_title" >Основные</h2>
         
         <Email />

         <OAuth />

         <Password />

         <TwoFactorAuthentication />

         <ResetAvatar />

      </div>
   )
}



const TwoFactorAuthentication = () => {

   const changeHandler = () => {}

   return (
      <div className={c2.setting} >
         <p className={c2.text} >Двухфакторная аутентификация</p>

         <button onClick={changeHandler} >подключить</button>
      </div>
   )
}

const ResetAvatar = () => {

   const changeHandler = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
      e.currentTarget.style.pointerEvents = 'none'

      const friends = getFriendsArr()

      useUserStore.getState().uploadAvatar({ default: true }, friends)
         .then(() => {
            showAlert({
               text: ['Теперь у вас стандартный аватар'],
               textBtn: 'Закрыть'
            }, 4000)
         })
         .catch(() => {
            showAlert({
               text: ['Произошла непредвиденная ошибка'],
               textBtn: 'Закрыть'
            }, 4000)
         })
   }

   return (
      <div className={c2.setting} >
         <p className={c2.text} >Сбросить аватар</p>

         <button onClick={changeHandler} >подтвердить</button>
      </div>
   )
}

export { MainSettings }