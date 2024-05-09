import { AdditionalSettings, ButtonsBlock, ExperimentalSettings, MainSettings, NotificationsSettings, ProfileSettings } from './components'

import c from './settingsTab.module.scss'

export const SettingsTab = () => {

	return (
		<div className={c.settings} >
			
         <MainSettings />

         <NotificationsSettings />

         <ProfileSettings />

         <AdditionalSettings />

         <ExperimentalSettings />

         <ButtonsBlock />

		</div>
	)
}
