import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Input, TooltipWrapper } from "@/shared/UI"
import { useWindowWidth } from "@/shared/lib/hooks"
import { showAlert, validateOpenId } from "@/shared/lib/utils"

import c from './findUserButton.module.scss'


const PLACEHOLDER_TEXT = 'Введите Id пользователя'


const FindUserButton = () => {

   const [value, setValue] = useState('')

   const navigate = useNavigate()

   const changeValueHandler = (e: FormEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value

      if (inputValue.length > 8) return

      setValue(inputValue)
   }

   const openUserProfile = () => {

      if (!validateOpenId(value)) {
         showAlert({
            text: ['Не похоже на Id пользователя']
         }, 2000)
         return
      }

      const openId = value

      setValue('')

      navigate('/profile/' + openId)

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
   }

   const windowWidth = useWindowWidth()

   return (
      <div className={c.button} >

         <TooltipWrapper
            orientation={windowWidth < 1000 ? '_bottom' : '_right'}
            tooltipBody={<>
               <Input
                  value={value}
                  placeholder={PLACEHOLDER_TEXT}
                  onChange={changeValueHandler}
                  onKeyDown={(e) => e.key === 'Enter' && openUserProfile()}
               />
               <Button onClick={openUserProfile} >
                  Перейти
               </Button>
            </>}
         >
            <button className={c.btn} >
               <span><svg width="30" height="28" viewBox="0 0 30 28" fill="none" ><path d="M20.5711 5.00209C21.9524 5.00209 23.0722 3.88233 23.0722 2.50104C23.0722 1.11976 21.9524 0 20.5711 0C19.1898 0 18.0701 1.11976 18.0701 2.50104C18.0701 3.88233 19.1898 5.00209 20.5711 5.00209Z" fill="white" /><path d="M29.95 14.381V8.50356L23.6349 5.82744C22.4219 5.31473 21.0213 5.75241 20.321 6.87788L19.0705 8.87871C18.2326 10.3543 16.682 11.4548 14.8062 11.7799L14.8812 11.855C15.7441 12.7178 16.782 13.193 17.9575 13.3181C18.9579 12.7928 19.8583 12.0926 20.5711 11.2672L21.3214 15.0188L18.6953 17.5073V26.8862H21.1964V19.3831L23.8224 16.8821L26.0734 26.8862H28.6995L25.9733 13.1305L25.198 9.25387L27.449 10.1292V14.381H29.95Z" fill="white" /><path d="M12.8054 9.64156C13.0805 9.82914 13.3931 9.94169 13.7057 10.0042C13.8683 10.0292 14.0184 10.0542 14.1809 10.0542C14.3435 10.0542 14.5061 10.0417 14.6561 10.0042C14.8187 9.97921 14.9688 9.92918 15.1188 9.86666C15.4189 9.74161 15.7066 9.56653 15.9442 9.31643C16.5569 8.70367 16.782 7.85332 16.632 7.06549C16.5444 6.6028 16.3193 6.1401 15.9442 5.77745C15.7066 5.53985 15.4189 5.35227 15.1188 5.22722C14.9688 5.16469 14.8187 5.11467 14.6561 5.08966C14.4936 5.06465 14.3435 5.03964 14.1809 5.03964C14.0309 5.03964 13.8933 5.05215 13.7432 5.07716C13.5682 5.10217 13.3931 5.15219 13.2305 5.21472C12.9429 5.35227 12.6553 5.53985 12.4177 5.77745C12.0425 6.1401 11.8174 6.6028 11.7299 7.06549C11.5798 7.85332 11.8049 8.70367 12.4177 9.31643C12.5302 9.44148 12.6678 9.54152 12.8054 9.64156Z" fill="white" /><path d="M13.9933 12.7303L11.4923 10.2292C11.3672 10.1042 11.2422 10.0041 11.1046 9.90411C10.8295 9.72903 10.5169 9.60398 10.2043 9.55396C10.0417 9.51645 9.89163 9.50394 9.72906 9.50394C9.0913 9.50394 8.45353 9.75404 7.96583 10.2417L3.78908 14.4185C3.27637 14.9312 3.01376 15.644 3.06378 16.3443C3.06378 16.5694 3.1138 16.807 3.20134 17.0321L4.5394 20.7211L0 25.2605L1.76324 27.0363L7.06545 21.734V18.9579L8.69113 20.471V26.8862H11.1922V19.3831L8.54107 16.732L11.4923 13.7807L12.3802 14.6686C13.9933 16.2443 16.0942 17.2197 18.6703 17.2197L18.4952 14.6311C16.6194 14.6061 15.1188 13.8558 13.9933 12.7303Z" fill="white" /></svg></span>
               <p>Найти пользователя</p>
            </button>
         </TooltipWrapper>

      </div>
   )
}


export { FindUserButton }