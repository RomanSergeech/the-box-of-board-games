import { Link } from "react-router-dom"
import { useHeaderStore } from "@/shared/store/header"
import { classNames } from "@/shared/lib/utils"

import './newsTab.scss'


const NewsTab = () => {

   const activeMenu = useHeaderStore(state => state.activeMenu)

	return (
		<li className='events_tab' >

         <Link to="/news" className={classNames('bg', activeMenu ? '_active_menu' : '')} >
            <span className='text'>События</span>
         </Link>

		</li>
	)
}

export { NewsTab }