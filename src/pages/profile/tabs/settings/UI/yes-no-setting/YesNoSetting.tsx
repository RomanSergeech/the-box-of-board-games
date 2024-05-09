import { TProfileSettings, useUserStore } from "@/shared/store/user"

import c1 from './yesNo.module.scss'
import c2 from '../../settingsTab.module.scss'

interface YesNoSettingProps {
	settingName: keyof TProfileSettings
	settingText: string
}
const YesNoSetting = ({ settingName, settingText }: YesNoSettingProps) => {

	const settingsStore = useUserStore(state => state.profile_settings)

	const handlerSettings = () => {
		useUserStore.getState().changeSetting(settingName)
	}

	return (
		<div className={c2.setting} >
			<p className={c2.text} >{settingText}</p>

			<div className={c1.YesNo} >

				<button
					className={settingsStore[settingName] ? c1._active_answer : ''}
					onClick={handlerSettings}
				>
					Да<svg width="80px" hanging="80px" viewBox="0 0 70 40"><path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" /></svg>
				</button>

				<button
					className={!settingsStore[settingName] ? c1._active_answer : ''}
					onClick={handlerSettings}
				>
					Нет<svg width="80px" hanging="80px" viewBox="0 0 70 40"><path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" /></svg>
				</button>

			</div>
		</div>
	)
}

export { YesNoSetting }