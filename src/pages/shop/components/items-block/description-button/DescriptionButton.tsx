import { Button, Img, Modal } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { GetUrl } from "@/shared/lib/utils"
import { useShopStore } from "@/shared/store/shop"
import { TAllGamesIds } from "@/shared/types/main-service/constants"

import type { TItemData } from "@/shared/types/main-service/mainNsp.types"

import c from './descriptionButton.module.scss'

interface DescriptionButtonProps {
   item: TItemData
}
const DescriptionButton = ({ item }: DescriptionButtonProps) => {

   const allGames = useShopStore(state => state.allGames)

   const { activeModal, openModal, triggerRef, modalBodyRef, modalRef } = useModal()
   
   return (
      <>
         <Button
            id={'itemDescriptionButton_'+item.itemId}
            onClick={openModal}
            ref={triggerRef}
         >
            Описание
         </Button>

         <Modal active={activeModal} ref={modalRef} >
            <div className={c.modal_body} ref={modalBodyRef}>

               <p className={c.title} >Описание</p>

               <div className={c.item_description_wrapper} >
                  <Img src={GetUrl.items(item.itemId, 'webp')} width='80px' height='80px' />
                  <p>Название: <span>{item.itemName}</span></p>
                  { item.games.includes('common')
                     ? <p>Можно использовать в любой игре</p>
                     : item.games.length > 1
                        ? <p>Для игр: <span>{
                           item.games.map(gameId => (
                              <span key={gameId} className={c.game} >{allGames?.[gameId as TAllGamesIds]?.gameName || 'ErrorName'}</span>
                           )) }</span></p>
                        : <p>Для игры: <span>{
                              allGames?.[item.games[0] as TAllGamesIds]?.gameName || 'ErrorName'
                           }</span></p>
                  }
                  <p className={c.item_description} >{item.description}</p>
               </div>


            </div>
         </Modal>
      </>
   )
}

export { DescriptionButton }