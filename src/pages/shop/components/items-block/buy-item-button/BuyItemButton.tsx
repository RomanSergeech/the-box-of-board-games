import { Button, Img, Modal } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { GetUrl, formatNumberToMoney, showAlert } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"
import { useShopStore } from "@/shared/store/shop"
import { useAuthStore } from "@/shared/store/auth"

import type { TItemData } from "@/shared/types/main-service/mainNsp.types"

import c from './buyItemButton.module.scss'
import { TAllGamesIds } from "@/shared/types/main-service/constants"

interface BuyItemButtonProps {
   item: TItemData
}
const BuyItemButton = ({ item }: BuyItemButtonProps) => {

   const isAuth = useAuthStore.getState().isAuth

   const purchased = useUserStore(state => state.items.includes(item.itemId as any))
   const balance = useShopStore(state => state.balance)
   const allGames = useShopStore(state => state.allGames)

   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   // const navigate = useNavigate()

   const confirmHandler = () => {

      if ( balance < item.cost ) {
         closeModal()
         showAlert({
            text: ['На балансе не достаточно средств'],
            textBtn: 'Пополнить'
         }, 5000,
         () => {
            (document.querySelector('#refillBalanceButton') as HTMLButtonElement)?.click()
         })
         return
      }

      // yandexMetrikaReachTheGoal('BUY_ITEM')

      // useShopStore.getState().buyGame(item.itemId)
      //    .then(() => {
      //       showAlert({
      //          text: 'Поздаравляем! Вам доступна новая игра',
      //          textBtn: 'Перейти в профиль'
      //       },
      //       2000,
      //       () => {
      //          navigate('/profile')
      //       })
      //    })
      //    .catch((msg) => {
      //       showAlert({
      //          text: msg,
      //          textBtn: 'Понятненько'
      //       }, 2000)
      //    })
      //    .finally(() => {
      //       closeModal()
      //    })

   }

   return (
      <>
         <Button
            textColor={purchased ? 'border' : 'main'}
            disabled={purchased || !isAuth}
            onClick={item.cost > 0 && isAuth ? openModal : () => {}}
            ref={triggerRef}
         >
            {purchased && 'Куплена'}
            {!purchased && item.cost > 0
               ? formatNumberToMoney(item.cost)
               : 'Скоро'
            }
         </Button>

         <Modal active={activeModal} ref={modalRef} >
            <div className={c.modal_body} ref={modalBodyRef}>

               <p className={c.title} >Покупка предмета</p>

               <div className={c.item_description} >
                  <Img src={GetUrl.items(item.itemId, 'webp')} width='80px' height='80px' />
                  <p className={c.item_name} >{item.itemName}</p>
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
                  <p>Ваш баланс: <span>{formatNumberToMoney(balance)}</span></p>
                  <p>Стоимость предмета: <span>{formatNumberToMoney(item.cost)}</span></p>
               </div>

               <div className={c.text_wrapper} >
                  <p>После подтверждения операцию нельзя будет отменить</p>

                  <p>Игра появится в вашем профиле</p>

                  <p>И будет доступна в лобби</p>
               </div>

               <Button
                  textColor="main"
                  borderColor="main"
                  onClick={confirmHandler}
               >
                  Купить
               </Button>

            </div>
         </Modal>
      </>
   )
}

export { BuyItemButton }