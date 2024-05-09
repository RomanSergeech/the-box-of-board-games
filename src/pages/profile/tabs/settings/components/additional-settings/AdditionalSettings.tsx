import { classNames } from "@/shared/lib/utils"
import { Tooltip } from "@/shared/UI"
import { useRef, useState } from "react"
import { useUserStore } from "@/shared/store/user"
import { EProfileLevel } from "@/shared/types/main-service/constants"

import c from '../../settingsTab.module.scss'


const COLORS = [
   'EAEAEA',
   '9d9d9d',
   'c1aa7f',
   'efa826',
   'e3bd00',
   '20cf00',
   '58ef26',
   '3fdfab',
   '3fe8f9',
   '5b60ff',
   '3facf9',
   '8e99ff',
   'a03ff9',
   'dc3ff9',
	'f93fc8',
] as const

const AdditionalSettings = () => {

   const profileLevel = useUserStore(state => state.profile_level.level)

   return (
      <div className={classNames('block', c.block)} >

         <h2 className="block_title" >Дополнительные</h2>
         
         <ChooseNicknameColor disabled={profileLevel === EProfileLevel.level_1} />

      </div>
   )
}

interface ChooseNicknameColorProps {
   disabled: boolean
}
const ChooseNicknameColor = ({ disabled }: ChooseNicknameColorProps) => {

   const nicknameColor = useUserStore(state => state.nickname_color)

   const buttonRef = useRef<HTMLButtonElement>(null)

   const [openedTooltip, setOpenedTooltip] = useState(false)

   const chooseColor = ( color: typeof COLORS[number] ) => {
      useUserStore.getState().changeNicknameColor(color)
   }

   return (<>
      <div className={classNames(c.setting, disabled ? c._disabled : '')} >
         <p className={c.text} >Цвет ника в чате</p>

         <div className={c.choose_color_wrapper} >
            <button
               ref={buttonRef}
               className={classNames(c.choosed_color)}
               onClick={()=>setOpenedTooltip(prev => !prev)}
            >
               <svg  width="78" height="38" viewBox="0 0 78 38" fill="none" >
                  <path d="M52.0198 1C44.1106 1.15892 25.6672 2.81168 15.1665 8.15136C2.04064 14.826 1.5358 18.1633 1.03096 21.9773C0.526118 25.7914 6.07936 35.3265 26.273 36.7568C46.4666 38.1871 69.6888 32.9428 72.213 30.559C74.7372 28.1752 84.3292 21.0238 66.1549 10.0584C51.6155 1.28605 32.8355 5.1319 25.2629 8.15136"
                     stroke={`#${nicknameColor}`} strokeWidth="2" strokeLinecap="round"
                  />
                  <path d="M25.4999 8C21.4999 9 12.8999 12.1 10.4999 16.5C7.49986 22 4.49986 27 18.9999 32.5C30.5999 36.9 54.8333 32 65.5 29C70.5 26.8333 77.2 20.7 64 13.5C50.8 6.3 34.1667 7.5 27.5 9C21.6667 11.8333 11.9 18.4 19.5 22C29 26.5 38 29 49.5 29C58.7 29 66 24.3333 68.5 22C70.1667 17.8333 66 10.1 36 12.5C6 14.9 26.8333 22.5 41 26C46.6667 26.5 58.3 26.6 59.5 23C61 18.5 55 15 31.5 16.5C12.7 17.7 16.6667 24.6667 21 28"
                     stroke={`#${nicknameColor}`} strokeWidth="2" strokeLinecap="round"
                  />
               </svg>
            </button>
            <Tooltip
               orientation='_left'
               opened={openedTooltip}
               triggerRef={buttonRef}
               onClose={() => setOpenedTooltip(false)}
            >
               <div className={c.colors} >
                  {COLORS.map(color => (
                     <span
                        key={color}
                        onClick={() => chooseColor(color)}
                     >
                        <span className={classNames(c.color)} style={{ backgroundColor: `#${color}` }}></span>
                     </span>
                  ))}
               </div>
            </Tooltip>
         </div>

      </div>
</>)
}

export { AdditionalSettings }