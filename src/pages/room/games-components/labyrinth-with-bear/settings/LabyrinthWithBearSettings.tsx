import { roomSocket } from "@/shared/api/socket"
import { useRoomPageStore } from "@/shared/store/room-page"
import { LimitTurnDuration } from "./elements/LimitTurnDuration"
import { TurnDuration } from "./elements/TurnDuration"
import { LabyrinthWidth } from "./elements/LabyrinthWidth"
import { classNames } from "@/shared/lib/utils"

import { TLabyrinthWithBearGameSettings } from "@/shared/types/games-service/labyrinthWithBear.types"

import c from '../../../roomPage.module.scss'


export type TSendSetting = (setting: keyof TLabyrinthWithBearGameSettings, value: boolean | number) => void

interface LabyrinthWithBearSettingsProps {
	isHost: boolean
}
const LabyrinthWithBearSettings = ({ isHost }: LabyrinthWithBearSettingsProps) => {

   const gameSettingsStore = useRoomPageStore<Partial<TLabyrinthWithBearGameSettings>>(state => state.gameSettings)

	const sendSetting: TSendSetting = ( setting, value ) => {
		if ( !isHost ) return

		const settings = {...gameSettingsStore, [setting]: value}

		useRoomPageStore.getState().setGameSetting( setting, value )

		roomSocket.emit('setSettings', settings)
	}

	return (
		<div className={classNames(c.settings, isHost ? '' : '_disabled')} >

         <LabyrinthWidth
            isHost={isHost}
            settingValue={gameSettingsStore?.labyrinthSize}
            sendSetting={(value) => sendSetting('labyrinthSize', value)}
         />

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

export default LabyrinthWithBearSettings