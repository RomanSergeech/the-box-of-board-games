/// <reference types="vite/client" />

interface ImportMetaEnv {
   readonly VITE_DOMEN_URL: string
   readonly VITE_MAIN_SERVICE_URL: string
   readonly VITE_DOCUMENTS_SUBDOMEN_URL: string

   readonly VITE_YANDEX_CLIENT_ID: string
   readonly VITE_YANDEX_OAUTH_PAGE_URL: string
   
   readonly VITE_VK_APP_ID: string
   readonly VITE_VK_OAUTH_PAGE_URL: string

   readonly VITE_TELEGRAM_LINK: string
   readonly VITE_VK_LINK: string
   readonly VITE_DISCORD_LINK: string
 }
 
interface ImportMeta {
   readonly env: ImportMetaEnv
}