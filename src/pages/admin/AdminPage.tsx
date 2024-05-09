import { classNames } from "@/shared/lib/utils"
import { MutedUsers } from "./components"
import { useEffect } from "react"
import { adminSocket } from "@/shared/api/socket"
import { useAdminStore } from "@/shared/store/admin"

import c from './adminPage.module.scss'


const AdminPage = () => {

   useEffect(() => {

      adminSocket.emit('api:getSiteStatistics', ( data ) => {
         if ( !data ) return
         useAdminStore.setState(data)
      })

   }, [])

   return (
      <>
         <div className='top'>
				<h1 className='page_title' >Панель администратора</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >

            <div className={c.empty} ></div>

            <MutedUsers />

         </div>
      </>
   )
}

export default AdminPage