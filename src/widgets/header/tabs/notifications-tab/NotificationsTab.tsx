import { useState, useRef } from "react"
import { NotificationsWrapper } from "./notificationsWrapper/NotificationsWrapper"
import { useAuthStore } from "@/shared/store/auth"
import { useNotificationsStore } from "@/shared/store/notifications"
import { useOutsideClick } from "@/shared/lib/hooks"
import { classNames } from "@/shared/lib/utils"
import { useHeaderStore } from "@/shared/store/header"

import './notificationsTab.scss'


const NotificationsTab = () => {

   const isAuthStore = useAuthStore(state => state.isAuth)
	const notificationsStore = useNotificationsStore(state => state)
   
	const [activeClass, setActiveClass] = useState('')
   
	const tabRef = useRef<HTMLLIElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)
   
   const activateLoginTab = useHeaderStore.getState().activateLoginTab

	const onClose = () => {
		setActiveClass('_ready')
	}

	useOutsideClick({
		elementRef: tabRef,
		triggerRef,
		enabled: activeClass === '_active',
		onOutsideClick: onClose
	})

	return (
		<li
			className={classNames('notifications_tab_wrapper', activeClass)}
			ref={tabRef}
		>
			<div id='notifications_tab' className={classNames('notifications_tab', activeClass)} >
				{isAuthStore
				?
					<div className='bg' >

						<NotificationsWrapper trigger={triggerRef.current} wrapperRef={tabRef} />

						<div
							className="tab_btn"
							ref={triggerRef}
							onClick={() => setActiveClass(prev => prev === '_active' ? '_ready' : '_active')}
						>
							<span className="svg_wrapper" >
								<svg width="28" height="28" viewBox="2 0 32 30" fill="none" ><g filter="url(#filter0_d_74_734)"><path d="M18 28.0001C19.5446 28.0001 20.8084 26.7078 20.8084 25.1283H15.1916C15.1916 26.7078 16.4554 28.0001 18 28.0001ZM26.4253 19.3847V12.2052C26.4253 7.79698 24.1364 4.10673 20.1063 3.13032V2.15391C20.1063 0.962112 19.1655 6.10352e-05 18 6.10352e-05C16.8345 6.10352e-05 15.8937 0.962112 15.8937 2.15391V3.13032C11.8776 4.10673 9.57472 7.78263 9.57472 12.2052V19.3847L6.7663 22.2565V23.6924H29.2337V22.2565L26.4253 19.3847ZM23.6169 20.8206H12.3832V12.2052C12.3832 8.64416 14.5035 5.74365 18 5.74365C21.4965 5.74365 23.6169 8.64416 23.6169 12.2052V20.8206ZM11.7934 2.26878L9.78536 0.215446C6.41525 2.84314 4.19659 6.89237 4 11.4872H6.80843C7.01906 7.68211 8.92879 4.35083 11.7934 2.26878ZM29.1916 11.4872H32C31.7894 6.89237 29.5707 2.84314 26.2146 0.215446L24.2207 2.26878C27.0572 4.35083 28.9809 7.68211 29.1916 11.4872Z" fill="white"/></g><defs><filter id="filter0_d_74_734" x="0" y="6.10352e-05" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_734"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_734" result="shape"/></filter></defs></svg>
								<span className='count' >{Object.keys(notificationsStore.notifications).length}</span>
							</span>
						</div>

					</div>
				:
					<span onClick={activateLoginTab} >
						<div className='bg' >
							<div className="tab_btn" >
								<span className="svg_wrapper" >
									<svg width="28" height="28" viewBox="2 0 32 30" fill="none" ><g filter="url(#filter0_d_74_734)"><path d="M18 28.0001C19.5446 28.0001 20.8084 26.7078 20.8084 25.1283H15.1916C15.1916 26.7078 16.4554 28.0001 18 28.0001ZM26.4253 19.3847V12.2052C26.4253 7.79698 24.1364 4.10673 20.1063 3.13032V2.15391C20.1063 0.962112 19.1655 6.10352e-05 18 6.10352e-05C16.8345 6.10352e-05 15.8937 0.962112 15.8937 2.15391V3.13032C11.8776 4.10673 9.57472 7.78263 9.57472 12.2052V19.3847L6.7663 22.2565V23.6924H29.2337V22.2565L26.4253 19.3847ZM23.6169 20.8206H12.3832V12.2052C12.3832 8.64416 14.5035 5.74365 18 5.74365C21.4965 5.74365 23.6169 8.64416 23.6169 12.2052V20.8206ZM11.7934 2.26878L9.78536 0.215446C6.41525 2.84314 4.19659 6.89237 4 11.4872H6.80843C7.01906 7.68211 8.92879 4.35083 11.7934 2.26878ZM29.1916 11.4872H32C31.7894 6.89237 29.5707 2.84314 26.2146 0.215446L24.2207 2.26878C27.0572 4.35083 28.9809 7.68211 29.1916 11.4872Z" fill="white"/></g><defs><filter id="filter0_d_74_734" x="0" y="6.10352e-05" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_734"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_734" result="shape"/></filter></defs></svg>
									<span className='count' >0</span>
								</span>
							</div>
						</div>
					</span>
				}

			</div>

		</li>
	)
}

export { NotificationsTab }