import { memo, useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@/shared/store/auth'
import { classNames, showAlert } from '@/shared/lib/utils'

import type { TYandexOAuthData } from '@/shared/types/main-service/auth.types'

import c from './buttons.module.scss'


const DOMEN_URL = import.meta.env.VITE_DOMEN_URL

const YANDEX_CLIENT_ID = import.meta.env.VITE_YANDEX_CLIENT_ID

const YANDEX_OAUTH_PAGE_URL = import.meta.env.VITE_YANDEX_OAUTH_PAGE_URL

interface YandexButtonProps {
   buttonSize?: 'm' | 'xl' | 's'
}
const YandexButton = memo(({ buttonSize = 'xl' }: YandexButtonProps) => {

   const [_, setReload] = useState(0)

   const wrapperRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      if ( wrapperRef.current?.innerHTML === '' ) {

         //@ts-ignore
         window.YaAuthSuggest?.init(
            {
               client_id: YANDEX_CLIENT_ID,
               response_type: "token",
               redirect_uri: YANDEX_OAUTH_PAGE_URL
            },
            DOMEN_URL,
            {
               view: "button",
               parentId: "yandex_OAuth_button",
               buttonSize,
               buttonView: 'icon',
               buttonTheme: 'light',
               buttonBorderRadius: "10",
               buttonIcon: 'ya',
               customBgColor: 'rgba(44, 44, 44, 1)',
               customBgHoveredColor: 'rgba(44, 44, 44, 1)',
               customBorderColor: 'rgba(92, 92, 92, 1)',
               customBorderHoveredColor: 'rgba(222, 213, 0, 1)',
               customBorderWidth: '0',
            }
         )
         .then(({handler}: any) => handler())
         .then((data: TYandexOAuthData) => {
            console.log('authService oauth data send');
            const oauthSended = useAuthStore.getState().oauthSended
            console.log(oauthSended);
            if ( oauthSended ) return
            useAuthStore.setState({ oauthSended: true })
            useAuthStore.getState().oauthYandex(data)
               .catch(err => {
                  console.log(err);
                  showAlert({
                     text: [err?.message],
                     textBtn: 'Закрыть'
                  }, 3000)
               })
         })
         .catch((error: any) => {
            console.log('Error:', error)
            setReload(prev => ++prev)
         })

      }
   }, [])

   return (
      <div
         ref={wrapperRef}
         className={classNames(c.button_wrapper, c[buttonSize])}
         id="yandex_OAuth_button"
      ></div>
   )
})

interface YandexButtonDummyProps {
   buttonSize?: 'm' | 'xl' | 's'
}
const YandexButtonDummy = ({ buttonSize = 'xl' }: YandexButtonDummyProps) => {
   return (
      <div className={classNames(c.button_wrapper, c.button_dummy, c.yandex_dummy, c[buttonSize])} >
         <svg className={c[buttonSize]} width="43" height="64" viewBox="0 0 43 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.0556 63.324H31.1019V9.14815H26.2222C17.2778 9.14815 12.5926 13.6204 12.5926 20.2963C12.5926 27.8704 15.8241 31.3796 22.5093 35.8518L28.0185 39.5648L12.1852 63.3148H0.40741L14.6574 42.1111C6.46297 36.2592 1.85185 30.5463 1.85185 20.9074C1.85185 8.86111 10.25 0.666672 26.1482 0.666672H41.9815V63.3055H42.0556V63.324Z" fill="white"/></svg>
         <span>привязан</span>
      </div>
   )
}

export { YandexButton, YandexButtonDummy }