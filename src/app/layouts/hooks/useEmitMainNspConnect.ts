import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useReconnectStore } from "@/shared/store/reconnect"
import { emitSocketConnect, mainSocket } from "@/shared/api/socket"
import { useChatStore } from "@/shared/store/chat"
import { useHomePageStore } from "@/shared/store/home-page"
import { useNewsPageStore } from "@/shared/store/news-page"
import { useUserStore } from "@/shared/store/user"
import { useShopStore } from "@/shared/store/shop"
import { useNotificationsStore } from "@/shared/store/notifications"
import { useAuthStore } from "@/shared/store/auth"
import { getFriendsArr } from "@/shared/lib/utils"
import { useFriendsStore } from "@/shared/store/friends"

export const useEmitMainNspConnect = () => {

   const isAuth = useAuthStore(state => state.isAuth)
   const reconnectionAttempt = useReconnectStore(state => state.reconnectionAttempt)

   const navigate = useNavigate()

	useEffect(() => {

      if ( isAuth ) {
         console.log('mainSocket connect');
         emitSocketConnect(mainSocket, navigate)
      }

      mainSocket.emit('mainNspConnect', isAuth, ( data, error ) => {

         if ( error || !data ) {
            console.log(error);
            return
         }

         const { allMessages, online, rooms, news, balance, notifications, subscriptions, ...userData } = data

			useChatStore.setState({ allMessages, online })
			useHomePageStore.setState({ rooms })
         useNewsPageStore.getState().addNews(news)
         
         if ( !isAuth ) {
            useShopStore.setState({
               allGames: data.allGames,
               allItems: data.allItems
            })
            return
         }

         useShopStore.setState({ balance, subscriptions })
         useNotificationsStore.setState({ notifications })
         useUserStore.setState(userData)

		})

      const checkFriendsBecameOfflineInterval = setInterval(() => {
			const friends = getFriendsArr()

			mainSocket.emit('checkFriendsBecameOffline', friends, ( friendsOffline, currentOnline ) => {
				useFriendsStore.getState().friendsBecameOffline(friendsOffline)
            useChatStore.setState({ online: currentOnline })
			})
		}, 10_000)

      return () => {
         clearInterval(checkFriendsBecameOfflineInterval)
      }

	}, [isAuth, reconnectionAttempt])

}