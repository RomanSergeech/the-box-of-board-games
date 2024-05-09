import { set } from "idb-keyval"
import { useEffect } from "react"

export const useDeleteDataInIndexedDb = () => {

   useEffect(() => {
      set('gameData', {})
   }, [])

}