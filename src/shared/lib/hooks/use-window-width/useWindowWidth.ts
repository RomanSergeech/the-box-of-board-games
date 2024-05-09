import { useMemo } from "react"

export const useWindowWidth = () => {

   return useMemo(() => {
      return window.screen.width
   }, [window.screen.width])

}