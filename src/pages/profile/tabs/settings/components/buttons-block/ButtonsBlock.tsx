import { classNames } from "@/shared/lib/utils"
import { SaveSettingsButton } from "./save-settings-button/SaveSettingsButton"
import { DeleteAccountButton } from "./delete-account-button/DeleteAccountButton"

import c from '../../settingsTab.module.scss'

const ButtonsBlock = () => {
   return (
      <div className={classNames('block', c.buttons_block)} >
         
         <SaveSettingsButton />

         <DeleteAccountButton />

      </div>
   )
}

export { ButtonsBlock }