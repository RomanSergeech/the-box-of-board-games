
export const getValidUrl = ( url: string ): string => {

   return url.replace(/[A-Z]/g, (m, index) => {
      if ( index === 0 ) return m.toLowerCase()
      return "-" + m.toLowerCase()
   });

}