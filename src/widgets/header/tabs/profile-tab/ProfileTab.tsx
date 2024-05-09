import { useRef, useState } from "react"
import { useUserStore } from "@/shared/store/user"
import { useAuthStore } from "@/shared/store/auth"
import { useCombinedRef, useOutsideClick } from "@/shared/lib/hooks"
import { GetUrl, classNames } from "@/shared/lib/utils"
import { Avatar, Button } from "@/shared/UI"
import { useHeaderStore } from "@/shared/store/header"

import './profileTab.scss'

interface ProfileProps {
	profileTabRef: React.RefObject<HTMLLIElement>
}
const ProfileTab = ({ profileTabRef }: ProfileProps) => {

   const activeMenu = useHeaderStore(state => state.activeMenu)
	const avatar = useUserStore(state => state.avatar)

	const [active, setActive] = useState(false)

	const tabRef = useRef<HTMLLIElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const tabRefs = useCombinedRef(tabRef, profileTabRef)

	const onClose = () => {
		setActive(false)
	}

	useOutsideClick({
		elementRef: tabRef,
		triggerRef,
		enabled: active,
		onOutsideClick: onClose
	})

	const exitBtnHandler = () => {
		setActive(false)
		useAuthStore.getState().logout()
	}

   const onFocus = () => {
      tabRef.current?.classList.add('_active')
   }

   const onBlur = () => {
      tabRef.current?.classList.remove('_active')
   }

	return (
		<li
			className={classNames('profile_tab', active ? '_active' : '')}
			ref={tabRefs}
		>
			<div className={classNames( 'bg', activeMenu ? '_active_menu' : '' )} >

				<div className="btns_wrapper" >

               <Button
                  to='/profile'
                  borderColor="main"
                  textColor="main"
                  onClick={() => setActive(false)}
                  onFocus={onFocus}
                  onBlur={onBlur}
               >
                  Профиль
               </Button>

               <Button
                  to="/"
                  borderColor="red_light"
                  textColor="red_light"
                  className="exit_btn"
                  onClick={exitBtnHandler}
                  onFocus={onFocus}
                  onBlur={onBlur}
               >
                  <svg width="15" height="23" viewBox="0 0 15 23" fill="none" ><path d="M5.3046 0V1.67647H0V21.299L5.3046 21.3033V23L14.99 21.2523L15 1.75982L5.3046 0ZM6.91103 10.7301C7.23631 10.7301 7.50002 11.0748 7.50002 11.5C7.50002 11.9253 7.23635 12.2699 6.91103 12.2699C6.5857 12.2699 6.32204 11.9253 6.32204 11.5C6.32199 11.0748 6.58575 10.7301 6.91103 10.7301ZM1.57497 19.718V3.2587H5.3046V19.7211L1.57497 19.718Z" fill="white"/></svg>
               </Button>

				</div>

				<div
					className='user_img_wrapper'
					ref={triggerRef}
					onClick={() => setActive(prev => !prev)}
				>
					<Avatar
                  src={GetUrl.avatars(avatar)}
                  width="40px"
                  height="40px"
                  borderColor="main"
               />
				</div>
				
			</div>
		</li>
	)
}

export { ProfileTab }