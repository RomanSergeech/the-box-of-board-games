import { classNames } from "@/shared/lib/utils"
import { YesNoSetting } from "../../UI"

import c from '../../settingsTab.module.scss'

const NotificationsSettings = () => {
   return (
      <div className={classNames('block', c.block)} >

         <h2 className="block_title" >Уведомления</h2>
         
         <YesNoSetting settingName='notifications' settingText='Включить браузерные уведомления' />

         <YesNoSetting settingName='notificationsSound' settingText='Включить звук уведомлений' />

      </div>
   )
}

export { NotificationsSettings }