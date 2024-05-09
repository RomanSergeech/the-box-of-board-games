import { useAuthStore } from "@/shared/store/auth"
import { Loader, Alert } from "@/shared/UI"
import { Navigation } from "./Navigation"
import { useUserStore } from "@/shared/store/user"

import '@/shared/assets/styles/style.scss'

const App = () => {

	const readyStore = useAuthStore(state => state.storeReady)

	if ( localStorage.getItem('token') && !readyStore ) {
		return <Loader fontSize={25} fullScreen={true} />
	}

   if ( readyStore ) {
      const profileTheme = localStorage.getItem('profile_theme') as any
      if ( profileTheme ) {
         useUserStore.setState({ profileTheme })
      }
   }

   console.log('App', readyStore);
	return (
		<>
         <Navigation />
         <Alert />
      </>
	)
}



export default App
