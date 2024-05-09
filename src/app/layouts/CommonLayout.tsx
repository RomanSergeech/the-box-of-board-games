import { Outlet } from "react-router-dom"
import { Footer, Header } from "@/widgets"
import { useEmitMainNspConnect, useSubscribeToAdminEvents, useSubscribeToMainEvents } from "./hooks"

const CommonLayout = () => {

   useSubscribeToAdminEvents()

   useSubscribeToMainEvents()

   useEmitMainNspConnect()

   return (
      <div className='common_layout' >

			<Header />

			<Outlet />

			<Footer />

		</div>
   )
}

export { CommonLayout }