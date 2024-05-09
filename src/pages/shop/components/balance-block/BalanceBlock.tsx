import { classNames, formatNumberToMoney } from "@/shared/lib/utils"
import { RefillBalanceButton } from "./refill-balance-button/RefillBalanceButton"
import { TransactionsHistoryButton } from "./transactions-history-button/TransactionsHistoryButton"
import { useShopStore } from "@/shared/store/shop"

import c from './balanceBlock.module.scss'
import { useAuthStore } from "@/shared/store/auth"

const BalanceBlock = () => {
   
   const balance = useShopStore(state => state.balance)

   const isAuth = useAuthStore.getState().isAuth

   if ( !isAuth ) {
      return (
         <div className={classNames('block', c.balance_block)} >

            <p style={{ gridColumn: '1/4', justifySelf: 'center' }} >Вы еще не зарегистрированы</p>

         </div>
      )
   }

   return (
      <div className={classNames('block', c.balance_block)} >

         <p>Баланс: <span>{formatNumberToMoney(balance || 0)}</span></p>

         <RefillBalanceButton />

         <TransactionsHistoryButton />

      </div>
   )
}

export { BalanceBlock }