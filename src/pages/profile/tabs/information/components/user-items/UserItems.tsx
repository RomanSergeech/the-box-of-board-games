import { Link } from 'react-router-dom'
import { GetUrl, classNames } from '@/shared/lib/utils'
import { Img, TooltipWrapper } from '@/shared/UI'
import { useShopStore } from '@/shared/store/shop'

import type { TItemData } from '@/shared/types/main-service/mainNsp.types'
import type { TAllItemsIds } from '@/shared/types/main-service/constants'

import c from './userItems.module.scss'

interface UserItemsProps {
   items: TAllItemsIds[]
}
const UserItems = ({ items }: UserItemsProps) => {
   return (
      <div className={classNames('block', c.user_items)} >
         
         <h2 className='block_title' >Инвентарь с плюшками</h2>

         <div className={c.items_wrapper} >

            {items.length > 0 && items.map(itemId => {
               const allItems = useShopStore.getState().allItems
               const item = allItems?.[itemId]
               if ( !item ) return
               return (
                  <Item key={itemId} item={item} />
               )
            })}

            {items.length === 0 &&
               [1,2,3].map(num => (
                  <div key={num} className={classNames(c.item, c.plushka)} >
                     <Img src={GetUrl.items('plushka', 'webp')} width='80px' height='80px' />
                     <p>Плюшка</p>
                  </div>
               ))
            }

         </div>

      </div>
   )
}

interface TItemProps {
	item: TItemData
}
const Item = ({ item }: TItemProps) => {

   const linkHandler = () => {
      setTimeout(() => {
         const elem = document.querySelector('#itemDescriptionButton_'+item.itemId) as HTMLButtonElement
         elem.scrollIntoView({block: "center", inline: "center"})
         elem?.click()
      }, 0)
   }

	return (
		<div className={c.item} >

         <TooltipWrapper
				orientation={'_top'}
            hoverEffect={true}

				tooltipBody={<>
					<Link
                  to='/shop'
                  onClick={linkHandler}
                  className='tooltip_link'
               >
                  Подробнее
               </Link>
				</>}
			>
				<Img src={GetUrl.items(item.itemId, 'webp')} width='80px' height='80px' />
			</TooltipWrapper>

			<p>{item?.itemName}</p>

		</div>
	)
}

export { UserItems }