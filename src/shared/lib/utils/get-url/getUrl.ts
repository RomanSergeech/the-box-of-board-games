import defaultAvatar from '@/shared/assets/images/common/DefaultAvatar.webp'
import defaultImage from '@/shared/assets/images/common/DefaultImage.webp'

const MAIN_SERVICE_URL = import.meta.env.VITE_MAIN_SERVICE_URL

export class GetUrl {
   
   static defaultAvatar() {
      return defaultAvatar
   }
   
   static defaultImage() {
      return defaultImage
   }
   
   static avatars( avatar: string ) {
      if ( !avatar ) return ''
      return MAIN_SERVICE_URL+'/avatars/'+avatar
   }

   static games( gameId: string, format?: 'webp' ): string
   static games( gameId?: undefined ): ({ rules: (image: string) => string })
   static games( gameId?: string, format?: 'webp' ) {
      if ( !gameId ) {
         return { rules: ( image: string ) => {
            if ( !image ) return ''
            return MAIN_SERVICE_URL+'/assets/games/rules/'+image
         } }
      }
      if ( format ) {
         return MAIN_SERVICE_URL+'/assets/games/'+gameId+'.'+format
      }
      return MAIN_SERVICE_URL+'/assets/games/'+gameId
   }

   static items( itemId: string, format?: 'webp' ) {
      if ( !itemId ) return ''
      if ( format ) {
         return MAIN_SERVICE_URL+'/assets/items/'+itemId+'.'+format
      }
      return MAIN_SERVICE_URL+'/assets/items/'+itemId
   }

   static news( img: string | null ) {
      if ( !img ) return ''
      return MAIN_SERVICE_URL+'/news/'+img
   }
}
