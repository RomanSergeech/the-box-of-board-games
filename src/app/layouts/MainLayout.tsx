import { Outlet } from 'react-router-dom'
import { Chat, Friends } from '@/widgets'
import { mainSocket } from '@/shared/api/socket'
import { useAuthStore } from '@/shared/store/auth'


const MainLayout = () => {

   const isAuth = useAuthStore.getState().isAuth

	// useSubscribeToMainEvents()

   // useEmitMainNspConnect()

	return (
		<>
         <main className='main' >
            <Outlet />
         </main>

         <aside className='aside'>

            <Chat title='Общий чат' socket={mainSocket} />

            {isAuth && <Friends />}

		   </aside>
		</>
	)
}

export { MainLayout }