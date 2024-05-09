import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"
import { LimitTurnDuration } from "./elements/LimitTurnDuration"
import { TurnDuration } from "./elements/TurnDuration"
import { classNames } from "@/shared/lib/utils"


import c from '../../../roomPage.module.scss'
import { TMonopolyGameSettings } from "@/shared/types/games-service/monopoly.types"


export type TSendSetting = (setting: keyof TMonopolyGameSettings, value: boolean | number) => void

interface TSettingsMonopolyProps {
	isHost: boolean
}
const MonopolySettings = ({ isHost }: TSettingsMonopolyProps) => {

   const gameSettingsStore = useRoomPageStore<Partial<TMonopolyGameSettings>>(state => state.gameSettings)

	const sendSetting: TSendSetting = ( setting, value ) => {
		if ( !isHost ) return

		const settings = { ...gameSettingsStore, [setting]: value }

		useRoomPageStore.getState().setGameSetting( setting, value )

		roomSocket.emit('setSettings', settings)
	}

	return (
		<div className={classNames(c.settings, isHost ? '' : '_disabled')} >

         <LimitTurnDuration
            isHost={isHost}
            settingValue={gameSettingsStore?.limitTurnDuration}
            sendSetting={(value) => sendSetting('limitTurnDuration', value)}
         />

         <TurnDuration
            isHost={isHost}
            settingValue={gameSettingsStore?.turnDuration}
            dependeceSettingActive={gameSettingsStore?.limitTurnDuration}
            sendSetting={(value) => sendSetting('turnDuration', value)}
         />

		</div>
	)
}

export default MonopolySettings