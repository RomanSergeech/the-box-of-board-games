import { Link } from "react-router-dom"

import './shopTab.scss'
import { useHeaderStore } from "@/shared/store/header"
import { classNames } from "@/shared/lib/utils"


const ShopTab = () => {

   const activeMenu = useHeaderStore(state => state.activeMenu)

	return (
		<li className='shop_tab' >

         <Link id="shopLink" to="/shop" className={classNames('bg', activeMenu ? '_active_menu' : '')} >
            <span className='text'>Магазин</span>
         </Link>

		</li>
	)
}

export { ShopTab }