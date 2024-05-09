import { Fragment } from "react"
import { Button, Modal } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { useShopStore } from "@/shared/store/shop"
import { classNames, getDate } from "@/shared/lib/utils"

import c from './transactionsHistoryButton.module.scss'

const TransactionsHistoryButton = () => {

   const transactionsHistory = useShopStore(state => state.transactions_history)

   const { activeModal, openModal, triggerRef, modalBodyRef, modalRef } = useModal()

   return (<>
      <Button
         onClick={openModal}
         ref={triggerRef}
      >
         История транзакций
      </Button>

      <Modal active={activeModal} wrapperClassName={c.modal_wrapper} ref={modalRef}  >
         <div className={c.modal_body} ref={modalBodyRef} >

            <p className={c.title} >История транзакций</p>

            <div className={c.table_wrapper} >

               <span className={classNames(c.line, c.vertical, c.common)} ></span>
               <span className={classNames(c.line, c.vertical, c.common)} ></span>

               <span className={c.line} ></span>

               <div className={c.table_title} >
                  <p>Дата | Время</p>
                  <p>Операция</p>
                  <p>Cумма</p>
               </div>

               <span className={c.line} ></span>

               <ul className={c.table} >

                  {transactionsHistory.map(transaction => (<Fragment key={transaction.date} >
                     <li>
                        <p className={c.date} >{getDate(transaction.date, 'd.m.y | HMS')}</p>
                        <p className={c.transaction} >{transaction.text}</p>
                        <p className={c.amount} >{transaction.amount > 0 ? '+'+transaction.amount : transaction.amount}</p>
                        <span className={classNames(c.line, c.vertical)} ></span>
                     </li>

                     <span className={c.line} ></span>
                  </Fragment>))}

                  {transactionsHistory.length < 5 && Array.from({length: 5 - transactionsHistory.length}, (_, i) => i + 1).map((num) => (<Fragment key={num} >
                     <li>
                        <p className={c.date} >&#160;</p>
                        <p className={c.transaction} >&#160;</p>
                        <p className={c.amount} >&#160;</p>
                        <span className={classNames(c.line, c.vertical)} ></span>
                     </li>

                     <span className={c.line} ></span>
                  </Fragment>))}

               </ul>

               <span className={c.line} ></span>

            </div>

         </div>
      </Modal>
   </>)
}

export { TransactionsHistoryButton }