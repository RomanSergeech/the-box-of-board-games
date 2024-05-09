import { OptionButton } from "@/pages/room/UI"

import type { TSendSetting } from "../LabyrinthWithBearSettings"
import { TLabyrinthWithBearGameSettings } from "@/shared/types/games-service/labyrinthWithBear.types"


const OPTIONS = [
   { text: '6x6', value: 6 },
   { text: '8x8', value: 8 },
   { text: '10x10', value: 10 },
]

interface LabyrinthWidthProps {
   isHost: boolean
   settingValue: TLabyrinthWithBearGameSettings['labyrinthSize'] | undefined
   sendSetting: (value: Parameters<TSendSetting>[1]) => void
}
const LabyrinthWidth = ({ isHost, settingValue, sendSetting }: LabyrinthWidthProps) => {
   return (
      <>
         <b>Размер лабиринта</b>

         <ul>
            {OPTIONS.map(({ text, value }) => (
               <li key={value} >
                  <OptionButton
                     active={settingValue === value}
                     onClick={isHost ? () => sendSetting(value) : () => {}}
                  >
                     {text}
                  </OptionButton>
               </li>
            ))}
         </ul>
      </>
   )
}

export { LabyrinthWidth }