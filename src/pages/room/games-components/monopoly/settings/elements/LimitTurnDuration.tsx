import { OptionButton } from "@/pages/room/UI"

import type { TSendSetting } from "../MonopolySettings"
import { TMonopolyGameSettings } from "@/shared/types/games-service/monopoly.types"


interface LimitTurnDurationProps {
   isHost: boolean
   settingValue: TMonopolyGameSettings['limitTurnDuration'] | undefined
   sendSetting: (value: Parameters<TSendSetting>[1]) => void
}
const LimitTurnDuration = ({ isHost, settingValue, sendSetting }: LimitTurnDurationProps) => {
   return (
      <>
         <b>Ограничить длительность хода</b>

         <ul>
            <li>
               <OptionButton
                  active={settingValue === true}
                  onClick={isHost ? () => sendSetting(true) : () => {}}
               >
                  Да
               </OptionButton>
            </li>

            <li>
               <OptionButton
                  active={settingValue === false}
                  onClick={isHost ? () => sendSetting(false) : () => {}}
               >
                  Нет
               </OptionButton>
            </li>
         </ul>
      </>
   )
}

export { LimitTurnDuration }