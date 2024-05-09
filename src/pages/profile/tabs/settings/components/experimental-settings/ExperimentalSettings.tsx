import { classNames } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"
import { useRef, useState } from "react"
import { Tooltip } from "@/shared/UI"
import { EProfileLevel } from "@/shared/types/main-service/constants"

import c from '../../settingsTab.module.scss'


const ExperimentalSettings = () => {
   
   const profileLevel = useUserStore.getState().profile_level.level

   console.log(profileLevel);
   return (
      <div className={classNames('block', c.block)} >
         
         <h2 className="block_title" >Экспериментальные</h2>

         <ChooseThemeColor disabled={profileLevel !== EProfileLevel.level_3} />

         <ProfileTheme disabled={profileLevel !== EProfileLevel.level_3} />

      </div>
   )
}


const THEMES = [
   { id: 'dark', text: 'истинно темная' },
   { id: 'gray', text: 'серая гавань' },
   { id: 'vinous', text: 'горький шоколад' },
   { id: 'green', text: 'пихтовый зеленый' },
   { id: 'green-light', text: 'тросниковый сад' },
]

type TThemes = typeof THEMES[number]['id']

interface ChooseThemeColorProps {
   disabled: boolean
}
const ChooseThemeColor = ({ disabled }: ChooseThemeColorProps) => {

   const buttonRef = useRef<HTMLButtonElement>(null)

   const [openedTooltip, setOpenedTooltip] = useState(false)
   const [themeId, setThemeId] = useState<TThemes>(localStorage.getItem('theme') || 'dark')

   const changeTheme = ( theme: typeof THEMES[number] ) => {
      const body = document.querySelector('body')
      if ( body ) {
         body.className = body.className.replace( /(?<=_)([\s\S]+?)(?=_theme)/g , theme.id )
         setThemeId(theme.id)
         localStorage.setItem('theme', theme.id)
      }
   }

   return (<>
      <div className={classNames(c.setting, disabled ? c._disabled : '')} >
         <p className={c.text} >Тема сайта</p>

         <div className={c.choose_theme_wrapper} >
            <button
               ref={buttonRef}
               className={classNames(c.choosed_color)}
               onClick={()=>setOpenedTooltip(prev => !prev)}
            >
               {THEMES.reduce((acc, theme) => {
                  if ( theme.id === themeId ) return theme.text
                  return acc
               }, 'тема')}
            </button>
            <Tooltip
               orientation='_left'
               opened={openedTooltip}
               triggerRef={buttonRef}
               onClose={() => setOpenedTooltip(false)}
            >
               <div className={c.themes} >
                  {THEMES.map(theme => (
                     <button key={theme.id} onClick={() => changeTheme(theme)} >{theme.text}</button>
                  ))}
               </div>
            </Tooltip>
         </div>

      </div>
</>)
}


const PROFILE_THEMES = [
   { id: null, text: 'выкл' },
   { id: 'day_night', text: 'день-ночь' },
   { id: 'squares', text: 'квадратики' },
   { id: 'vertical_lines', text: 'полосочки' },
   { id: 'snowflakes', text: 'снежинки' },
   { id: 'snowfall', text: 'снегопад' },
   { id: 'car', text: 'тачка' },
   { id: 'virus', text: 'сфера' },
] as const

type TProfileThemes = typeof PROFILE_THEMES[number]['id'] | null

interface ProfileThemeProps {
   disabled: boolean
}
const ProfileTheme = ({ disabled }: ProfileThemeProps) => {

   const buttonRef = useRef<HTMLButtonElement>(null)

   const [openedTooltip, setOpenedTooltip] = useState(false)
   const [themeId, setThemeId] = useState<TProfileThemes>(localStorage.getItem('profile_theme') as any)

   const changeTheme = ( theme: typeof PROFILE_THEMES[number] ) => {
      useUserStore.setState({ profileTheme: theme.id })
      setThemeId(theme.id)

      if ( !theme.id ) {
         localStorage.removeItem('profile_theme')
         return
      }
      localStorage.setItem('profile_theme', theme.id)
   }

   return (
      <div className={classNames(c.setting, disabled ? c._disabled : '')} >
         <p className={c.text} >Тема профиля</p>

         <div className={c.choose_theme_wrapper} >
            <button
               ref={buttonRef}
               className={classNames(c.choosed_color)}
               onClick={()=>setOpenedTooltip(prev => !prev)}
            >
               {PROFILE_THEMES.reduce((acc, theme) => {
                  if ( theme.id === themeId ) return theme.text
                  return acc
               }, 'тема')}
            </button>
            <Tooltip
               orientation='_left'
               opened={openedTooltip}
               triggerRef={buttonRef}
               onClose={() => setOpenedTooltip(false)}
            >
               <div className={c.themes} >
                  {PROFILE_THEMES.map(theme => (
                     <button key={theme.id} onClick={() => changeTheme(theme)} >{theme.text}</button>
                  ))}
               </div>
            </Tooltip>
         </div>

      </div>
   )
}

export { ExperimentalSettings }