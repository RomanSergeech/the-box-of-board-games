
export const validateOpenId = ( value: string ): boolean => {

	if ( value === '' ) {
      return false
   }

   if ( value.length < 5 ) {
      return false
   }

   if ( value.length > 10 ) {
      return false
   }

   if ( !/^[a-z0-9_-]+$/.test(value) ) {
      return false
   }

   return true

}