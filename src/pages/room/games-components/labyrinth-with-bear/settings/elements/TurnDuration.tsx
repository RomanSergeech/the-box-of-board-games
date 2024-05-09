import { OptionButton } from "@/pages/room/UI"

import type { TSendSetting } from "../LabyrinthWithBearSettings"
import { TLabyrinthWithBearGameSettings } from "@/shared/types/games-service/labyrinthWithBear.types"


const SETTING_VALUES = [10, 20, 30, 60] as const
const DEFAULT_VALUE = SETTING_VALUES[0]


interface TurnDurationProps {
   isHost: boolean
   settingValue: TLabyrinthWithBearGameSettings['turnDuration'] | undefined
   dependeceSettingActive: boolean | undefined
   sendSetting: (value: Parameters<TSendSetting>[1]) => void
}
const TurnDuration = ({ isHost, settingValue, dependeceSettingActive, sendSetting }: TurnDurationProps) => {

   if ( settingValue === undefined ) {
      settingValue = DEFAULT_VALUE
   }

   return (
      <>
         <b>Время на ход ( сек )</b>

         <ul>
            {SETTING_VALUES.map(value => (
               <li key={value} >
                  <OptionButton
                     active={!!dependeceSettingActive && settingValue === value}
                     disabled={!dependeceSettingActive}
                     onClick={isHost ? () => sendSetting(value) : () => {}}
                  >
                     {value}
                  </OptionButton>
               </li>
            ))}
         </ul>
      </>
   )
}

export { TurnDuration }