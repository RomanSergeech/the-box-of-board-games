import { Link } from "react-router-dom"

import './mainTab.scss'
import { classNames } from "@/shared/lib/utils"
import { useHeaderStore } from "@/shared/store/header"


const MainTab = () => {

   const activeMenu = useHeaderStore(state => state.activeMenu)

	return (
		<li className='main_tab' >

         <Link to="/" className={classNames('bg', activeMenu ? '_active_menu' : '')} >
            <span className='text'>Главная</span>
         </Link>

		</li>
	)
}

export { MainTab }