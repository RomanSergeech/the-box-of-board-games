import { RefObject, useRef } from "react"
import { useOutsideClick } from "@/shared/lib/hooks"
import { classNames } from "@/shared/lib/utils"
import { useHeaderStore } from "@/shared/store/header"

import './menuBtn.scss'

interface MenuBtnProps {
	ignoreElementsRefs: RefObject<HTMLElement>[]
}
const MenuBtn = ({ ignoreElementsRefs }: MenuBtnProps) => {

   const activeMenu = useHeaderStore(state => state.activeMenu)

	const tabRef = useRef<HTMLLIElement>(null)
	const triggerRef = useRef<HTMLDivElement>(null)

	const onClose = () => {
		useHeaderStore.setState({ activeMenu: false })
	}

   const setActiveMenu = () => {
      useHeaderStore.setState(state => ({ activeMenu: !state.activeMenu }))
   }

	useOutsideClick({
		elementRef: tabRef,
		triggerRef,
		ignoreElementsRefs,
		enabled: activeMenu,
		onOutsideClick: onClose
	})

	return (
		<li
			className={classNames('menu_btn', activeMenu ? '_active_menu' : '')}
			ref={tabRef}
		>
			<span
				className='bg'
				ref={triggerRef}
				onClick={setActiveMenu}
			>
				<span
					className='text'
					
				>
					{activeMenu ? 'Свернуть' : 'Меню'}
				</span>
			</span>

		</li>
	)
}

export { MenuBtn }