import { classNames } from "@/shared/lib/utils"
import { BalanceBlock, GamesBlock, ItemsBlock, SubscriptionBlock } from "./components"
import { usePageCounter } from "@/shared/lib/hooks/yandex-metrika"

import c from './shopPage.module.scss'

const ShopPage = () => {

   usePageCounter()

   return (
      <>
         <div className='top'>
				<h1 className='page_title' >Магазин</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >

            <BalanceBlock />

            <SubscriptionBlock />

            <GamesBlock />

            <ItemsBlock />

         </div>
      </>
   )
}

export { ShopPage }