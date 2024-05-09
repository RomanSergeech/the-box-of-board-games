import { useState } from "react"
import { Button, Input, Modal, ToggleButton } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { formatNumberToMoney } from "@/shared/lib/utils"

import c from './refillBalanceButton.module.scss'

import bankCard from '@/shared/assets/images/shop/bank_card.svg'
import SBP from '@/shared/assets/images/shop/sbp_qr_code.svg'
import yoomoney from '@/shared/assets/images/shop/yoomoney.svg'
import qiwi from '@/shared/assets/images/shop/qiwi.svg'
import cryptocurrency from '@/shared/assets/images/shop/cryptocurrency.svg'


const moneyAmounts = [ 100, 250, 500, 1000 ]

const paymentMethods = [
   {
      type: 'BANK CARD',
      text: 'Банковская карта',
      svg: bankCard
   },
   {
      type: 'QR-CODE',
      text: 'По QR-коду',
      svg: SBP
   },
   {
      type: 'UMONEY',
      text: 'ЮMoney',
      svg: yoomoney
   },
   {
      type: 'QIWI',
      text: 'Qiwi',
      svg: qiwi
   },
   {
      type: 'CRYPTOCURRENCY',
      text: 'Криптовалюта',
      svg: cryptocurrency
   }
]


const RefillBalanceButton = () => {

   const { activeModal, openModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const [choosedMoneyAmount, setChoosedMoneyAmount] = useState(0)
   const [choosedPaymentMethod, setChoosedPaymentMethod] = useState('')

   return (<>
      <Button
         disabled

         id='refillBalanceButton'
         onClick={openModal}
         ref={triggerRef}
      >
         Пополнить баланс
      </Button>

      <Modal active={activeModal} ref={modalRef} >
         <div className={c.modal_body} ref={modalBodyRef}>

            <p className={c.title} >Пополнить баланс</p>

            <div className={c.money} >

               {moneyAmounts.map(amount => (
                  <ToggleButton
                     key={amount}
                     onClick={() => setChoosedMoneyAmount(amount)}
                     active={choosedMoneyAmount === amount}
                  >
                     {formatNumberToMoney(amount)}
                  </ToggleButton>
               ))}

               <Input
                  placeholder='Другая сумма'
               />

            </div>

            <div className={c.payment_methods} >

               {paymentMethods.map(method => (
                  <ToggleButton
                     key={method.type}
                     onClick={() => setChoosedPaymentMethod(method.type)}
                     active={choosedPaymentMethod === method.type}
                  >
                     {method.text}
                     {method.svg}
                  </ToggleButton>
               ))}

            </div>

            <Button
               borderColor='main'
               disabled={!choosedMoneyAmount || !choosedPaymentMethod}
            >
               Перейти к оплате
            </Button>

         </div>
      </Modal>
   </>)
}

export { RefillBalanceButton }