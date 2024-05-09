import { adminSocket } from "@/shared/api/socket"
import { useAdminStore } from "@/shared/store/admin"
import { useUserStore } from "@/shared/store/user"
import { EUserRole } from "@/shared/types/main-service/constants"
import { useEffect } from "react"

export const useSubscribeToAdminEvents = () => {
   
   const isAdmin = useUserStore(state => state.role.includes(EUserRole.administrator))

   useEffect(() => {
      if ( isAdmin && adminSocket.disconnected ) {

         adminSocket.connect()

         adminSocket.removeAllListeners()

         adminSocket.on('connect_error', (err) => {
            console.log(err.message);
         })

         adminSocket.on('connect', () => {
            console.log('adminSocket connected');

            useAdminStore.setState({ socketConnected: true })
         })

         adminSocket.on('disconnect', () => {
            console.log('adminSocket disconnected');
         })
      }
   }, [])
}