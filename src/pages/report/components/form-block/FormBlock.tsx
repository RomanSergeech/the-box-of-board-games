import { ReactNode, useState } from "react"
import { classNames, showAlert } from "@/shared/lib/utils"
import { Button, ToggleButton } from "@/shared/UI"
import { mainSocket } from "@/shared/api/socket"
import { TReportType } from "@/shared/types/main-service/mainNsp.types"
import { REPORT_TYPES } from "../../constants"

import c from './formBlock.module.scss'

const FormBlock = () => {

   const [text, setText] = useState('')

   const onSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault()

      const data = new FormData(e.currentTarget)

      const reportType = data.get('report_type') as TReportType | null
      const message = data.get('message') as string | null

      if ( !reportType ) {
         showAlert({ text: ['Выберите тип сообщения'] }, 2000)
         return
      }

      const wordsCount = message?.trim().split(/\s+/).length || 0

      if ( !message || wordsCount < 5 ) {
         showAlert({ text: ['Напишите минимум 5 слов'] }, 2000)
         return
      }

      function canSendReport(): boolean {

         const reportsHistory = localStorage.getItem('report')

         if ( reportsHistory != null ) {
            const reportsCount = reportsHistory?.[0] || '9'
            const reportDate = new Date(+reportsHistory.slice(1)).toDateString()
            const currentDate = new Date().toDateString()

            if ( currentDate !== reportDate ) {
               localStorage.setItem('report', '1'+Date.now())
               return true
            }

            if ( +reportsCount + 1 > 5 ) {
               setText('')
               showAlert({ text: ['Можно отправить только 5 репортов в день'] }, 2000)
               return false
            }

            localStorage.setItem('report', ''+(+reportsCount + 1) + Date.now())

            return true
         }

         localStorage.setItem('report', '1'+Date.now())

         return true
      }

      if ( !canSendReport() ) {
         return
      }

      mainSocket.emit('saveReport', {
         type: reportType,
         message
      }, (data, error) => {
         if ( error || !data ) {
            showAlert({ text: ['Что-то пошло не так'] }, 2000)
            return
         }
         setText('')
         showAlert({ text: ['Спасибо за помощь, мы рассмотрим ваше сообщение при первой возможности'] }, 2000)
      })
      
   }

   return (
      <div className={classNames('block', c.form_block)} >

         <form
            onSubmit={onSubmit}
         >
            <div className={c.btns} >
               {REPORT_TYPES.map(type => (
                  <ToggleBtn key={type.id} reportType={type.id} >{type.text}</ToggleBtn>
               ))}
            </div>

            <textarea
               name='message'
               rows={10}
               maxLength={1000}
               value={text}
               onChange={e => setText(e.target.value)}
               placeholder='Слова писать сюда'
               autoComplete="off"
            />

            <Button>Отправить</Button>

         </form>

         <div className={c.description} >

            <p><span>Идеи</span> - для любых идей или критики</p>

            <p><span>Ошибки</span> - для ошибок мешающих пользоваться сайтом</p>
            
            <p><span>Баги</span> - для ошибок, произошедших во время игры</p>

            <p>
               Просим вас перед написанием сообщения убедиться, что другие пользователи не писали подобное.<br />
               Если найдете в списке то, о чем вы хотите написать, нажмите кнопку голоса.
            </p>

         </div>

      </div>
   )
}

interface ToggleButtonProps {
   children: ReactNode
   reportType: string
}
const ToggleBtn = ({ children, reportType }: ToggleButtonProps) => {
   return (
      <div className={c.button_wrapper} >
         <input name="report_type" type='radio' value={reportType} />
         <ToggleButton type='button' className={c.button} >{children}</ToggleButton>
      </div>
   )
}


export { FormBlock }