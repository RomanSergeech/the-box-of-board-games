import { useState } from "react"
import { classNames, formatNumberToMoney, showAlert } from "@/shared/lib/utils"
import { EProfileLevel } from "@/shared/types/main-service/constants"
import { useUserStore } from "@/shared/store/user"
import { Button, Modal, ToggleButton } from "@/shared/UI"
import { useModal } from "@/shared/lib/hooks"
import { useShopStore } from "@/shared/store/shop"
import { useAuthStore } from "@/shared/store/auth"
import { EGoals, yandexMetrikaReachTheGoal } from "@/shared/lib/hooks/yandex-metrika"

import type { TSubscritions } from "@/shared/types/main-service/mainNsp.types"

import c from './subscriptionBlock.module.scss'

type TLevel = {
   id: `${EProfileLevel}`
   title: string,
   subTitle: string,
   elements: ({
      text: string,
      valueString?: string
      valueNumber?: number
      valueBoolean?: boolean
      highlighted?: true
   })[]
}
const levels: TLevel[] = [
   {
      id: EProfileLevel.level_1,
      title: '1 уровень профиля',
      subTitle: 'Стандартный',
      elements: [
         { text: 'Статистика игр', valueString: 'общая' },
         { text: 'Замена ежедневных заданий', valueNumber: 1 },
      ]
   },
   {
      id: EProfileLevel.level_3,
      title: '3 уровень профиля',
      subTitle: 'Полный доступ',
      elements: [
         { text: 'Статистика игр', valueString: 'полная' },
         { text: 'Замена ежедневных заданий', valueString: 'каждое' },
         { text: 'Выбор цвета ника в чате', valueBoolean: true },
         { text: 'Доступ ко всем играм', valueBoolean: true, highlighted: true },
         { text: 'Доступ к экспериментальному функционалу', valueBoolean: true, highlighted: true },
      ]
   },
   {
      id: EProfileLevel.level_2,
      title: '2 уровень профиля',
      subTitle: 'Расширенный',
      elements: [
         { text: 'Статистика игр', valueString: 'полная' },
         { text: 'Замена ежедневных заданий', valueNumber: 3 },
         { text: 'Выбор цвета ника в чате', valueBoolean: true },
      ]
   },
]

const SubscriptionBlock = () => {

   const profileLevel = useUserStore(state => state.profile_level)
   const balance = useShopStore(state => state.balance)
   const subscriptions = useShopStore(state => state.subscriptions)

   return (
      <div className={c.profile_levels_block} >
         
         {levels.map(level => (
            <Level
               key={level.id}
               level={level}
               balance={balance}
               subscriptions={level.id !== EProfileLevel.level_1 ? subscriptions[level.id] : undefined}
               profileLevel={profileLevel.level}
               isCurrent={profileLevel.level === level.id}
            />
         ))}

      </div>
   )
}


interface LevelProps {
   level: TLevel
   balance: number
   subscriptions: TSubscritions | undefined
   profileLevel: `${EProfileLevel}`
   isCurrent: boolean
}
const Level = ({ level, balance, subscriptions, profileLevel, isCurrent }: LevelProps) => {

   const isAuth = useAuthStore.getState().isAuth

   const [choosedSubscriptionTerm, setChoosedSubscriptionTerm] = useState(0)
   
   const { activeModal, openModal, closeModal, triggerRef, modalBodyRef, modalRef } = useModal()

   const confirmHandler = () => {
      
      if ( level.id === EProfileLevel.level_1 ) return

      const cost = subscriptions?.[choosedSubscriptionTerm]?.cost

      if ( !cost ) {
         showAlert({
            text: ['Что-то пошло не так'],
            textBtn: 'Понятненько'
         }, 2000)
         return
      }

      if ( balance < cost ) {
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

      useShopStore.getState().buySubscription(level.id, choosedSubscriptionTerm)
         .then((data) => {
            showAlert({
               text: ['Поздаравляем! У вас новый уровень профиля'],
               textBtn: 'Ура'
            }, 2000)

            yandexMetrikaReachTheGoal(EGoals.buySubscription, {
               order_price: data?.order_price || -1,
               purchase: level.id
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

   const currentLevel = '_current_' + profileLevel

   return (
      <>
         <div className={classNames(
            'block',
            c.level,
            c[level.id],
            c[currentLevel],
            // isCurrent && level.id !== EProfileLevel.level_1 ? c._current : ''
         )} >

            <p className={classNames(c.title, level.id !== EProfileLevel.level_1 ? c._highlighted : '')} >{level.title}</p>
            <p className={classNames(c.sub_title, level.id !== EProfileLevel.level_1 ? c._highlighted : '')} >{level.subTitle}</p>

            <span className="line"></span>

            <ul>
               {level.elements.map(elem => (
                  <li key={elem.text} >

                     {elem.text}

                     {elem.valueString &&
                        <span className={c.string} >{elem.valueString}</span>
                     }

                     {elem.valueNumber &&
                        <span className={c.number} >{elem.valueNumber}</span>
                     }

                     {elem.valueBoolean !== undefined &&
                        <span className={c.boolean} >{
                           elem.valueBoolean === false
                              ? <svg width="11" height="10" viewBox="0 0 11 10" fill="none" ><path d="M1.67285 9L9.91749 1M9.91749 9L1.67285 1" stroke="#DA4E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              : <svg className={elem.highlighted ? c._highlighted : ''} width="17" height="11" viewBox="0 0 17 11" fill="none" ><path d="M1.54102 5.5L6.36804 10L15.9194 1" stroke="#61F55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        }</span>
                     }

                  </li>
               ))}
            </ul>

            <span className="line"></span>

            <Button
               onClick={isAuth ? openModal : ()=>{}}
               ref={triggerRef}
               disabled={!isAuth}
               borderColor={
                  isCurrent
                     ? 'text'
                     : level.id === EProfileLevel.level_1 ? 'border' : 'main'
               }
               textColor={level.id === EProfileLevel.level_1 || isCurrent ? 'text' : 'main'}
               style={{ pointerEvents: level.id === EProfileLevel.level_1 || isCurrent ? 'none' : 'all' }}
            >
               {isCurrent
                  ? 'Текущий'
                  : level.id === EProfileLevel.level_1
                     ? 'Стандартный'
                     : profileLevel === EProfileLevel.level_3
                        ? 'Понизить'
                        : 'Повысить'
               }
            </Button>

         </div>

         {subscriptions &&
            <Modal active={activeModal} ref={modalRef} >
               <div className={c.modal_body} ref={modalBodyRef} >

                  <p className={c.title} >Повысить уровень профиля</p>

                  <div className={c.data} >
                     <p>Ваш баланс: <span>{formatNumberToMoney(balance)}</span></p>
                     <p className={c.profile_level} >Уровень профиля: 
                        <span>
                           {useUserStore.getState().profile_level.level}
                           <svg width="17" height="14" viewBox="0 0 17 14" fill="none" ><path d="M1 6.52632H14.9286ZM8.5 1L16 6.52632L8.5 12.0526" fill="#DED500"/><path d="M1 6.52632H14.9286M8.5 1L16 6.52632L8.5 12.0526" stroke="#DED500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                           {level.id}
                        </span>
                     </p>
                     <p className={c.some_text} >Ваша подписка поможет<br/>развитию проекта</p>
                  </div>

                  <div className={c.btns} >

                     {Object.values(subscriptions).map(subscription => (
                        <ToggleButton
                           key={subscription.term}
                           active={choosedSubscriptionTerm === subscription.term}
                           onClick={() => setChoosedSubscriptionTerm(subscription.term)}
                        >
                           {formatNumberToMoney(subscription.cost)} - {getMonth(subscription.term)}
                           {!!subscription.discount && <span>{subscription.discount}</span>}
                        </ToggleButton>
                     ))}

                  </div>

                  <Button
                     borderColor='main'
                     disabled={!choosedSubscriptionTerm}
                     onClick={confirmHandler}
                  >
                     Оплатить
                  </Button>

               </div>
            </Modal>
         }
      </>
   )
}

const getMonth = ( term: number ) => {
   if ( term === 1 ) {
      return term+' день'
   }
   else if ( term > 1 && term < 4 ) {
      return term+' дня'
   }
   else if ( term > 150 ) {
      return term / 30 +' месяцев'
   }
   else if ( term >= 60 ) {
      return term / 30 + ' месяца'
   }
   else if ( term > 4 ) {
      return term+' дней'
   }
   return term+' дней'
}


export { SubscriptionBlock }