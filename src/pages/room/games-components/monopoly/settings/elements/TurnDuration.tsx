import { OptionButton } from "@/pages/room/UI"

import type { TSendSetting } from "../MonopolySettings"
import { TMonopolyGameSettings } from "@/shared/types/games-service/monopoly.types"


const SETTING_VALUES = [30, 60, 90, 120] as const


interface TurnDurationProps {
   isHost: boolean
   settingValue: TMonopolyGameSettings['turnDuration'] | undefined
   dependeceSettingActive: boolean | undefined
   sendSetting: (value: Parameters<TSendSetting>[1]) => void
}
const TurnDuration = ({ isHost, settingValue, dependeceSettingActive, sendSetting }: TurnDurationProps) => {
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