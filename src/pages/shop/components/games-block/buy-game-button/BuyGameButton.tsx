import { useNavigate } from "react-router-dom"
import { Button, Img, Modal } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { GetUrl, formatNumberToMoney, showAlert } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"
import { useShopStore } from "@/shared/store/shop"
import { useAuthStore } from "@/shared/store/auth"
import { EGoals, yandexMetrikaReachTheGoal } from "@/shared/lib/hooks/yandex-metrika"

import type { TAllGames } from "@/shared/types/main-service/mainNsp.types"

import c from './buyGameButton.module.scss'

interface BuyGameButtonProps {
   game: TAllGames[keyof TAllGames]
}
const BuyGameButton = ({ game }: BuyGameButtonProps) => {

   const purchased = useUserStore(state => state.games.includes(game.gameId))
   const balance = useShopStore(state => state.balance)

   const isAuth = useAuthStore.getState().isAuth

   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const navigate = useNavigate()

   const confirmHandler = () => {

      if ( game.cost && balance < game.cost ) {
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

      useShopStore.getState().buyGame(game.gameId)
         .then((data) => {
            showAlert({
               text: ['Поздаравляем! Вам доступна новая игра'],
               textBtn: 'Перейти в профиль'
            },
            2000,
            () => {
               navigate('/profile')
            })

            yandexMetrikaReachTheGoal(EGoals.buyGame, {
               order_price: data?.order_price || -1,
               purchase: game.gameId
            })
         })
         .catch((msg) => {
            showAlert({
               text: [msg || ''],
               textBtn: 'Понятненько'
            }, 2000)
         })
         .finally(() => {
            closeModal()
         })

   }

   return (
      <>
         <Button
            textColor={purchased ? 'border' : 'main'}
            disabled={purchased || !isAuth}
            onClick={isAuth && game.cost ? openModal : ()=>{}}
            ref={triggerRef}
         >
            {purchased
               ? 'Куплена'
               : game.cost ? formatNumberToMoney(game.cost) : 'Скоро'
            }
         </Button>

         <Modal active={activeModal} ref={modalRef} >
            <div className={c.modal_body} ref={modalBodyRef}>

               <p className={c.title} >Покупка игры</p>

               <div className={c.game_description} >
                  <Img src={GetUrl.games(game.gameId, 'webp')} width='80px' height='80px' />
                  <p className={c.game_name} >{game.gameName}</p>
                  <p>Ваш баланс: <span>{formatNumberToMoney(balance)}</span></p>
                  <p>Стоимость игры: <span>{formatNumberToMoney(game.cost || 0)}</span></p>
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
                  Оплатить
               </Button>

            </div>
         </Modal>
      </>
   )
}

export { BuyGameButton }