import { GetUrl, classNames } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { Img } from "@/shared/UI"
import { DescriptionButton } from "./description-button/DescriptionButton"
import { BuyItemButton } from "./buy-item-button/BuyItemButton"

import type { TItemData } from "@/shared/types/main-service/mainNsp.types"

import c from './itemsBlock.module.scss'

const ItemsBlock = () => {

   const allItems = useShopStore(state => state.allItems)

   return (
      <div className={classNames('block', c.items_block)} >

         <h2 className='block_title' >Предметы</h2>

         <div className={c.items_wrapper} >

            {Object.values(allItems || {}).map(item => (
               <Item key={item.itemId} item={item} />
            ))}

         </div>

      </div>
   )
}

interface ItemProps {
   item: TItemData
}
const Item = ({ item }: ItemProps) => {
   return (
      <div className={c.item} >

         <Img src={GetUrl.items(item.itemId, 'webp')} width='80px' height='80px' />

         <p>{item.itemName}</p>

         <DescriptionButton item={item} />

         <BuyItemButton item={item} />

      </div>
   )
}


export { ItemsBlock }