import { useEffect } from 'react'
import { mainSocket } from '@/shared/api/socket'
import { useFriendsStore } from '@/shared/store/friends'
import { useChatStore } from '@/shared/store/chat'
import { useNotificationsStore } from '@/shared/store/notifications'
import { useUserStore } from '@/shared/store/user'
import { useHomePageStore } from '@/shared/store/home-page'
import { useNewsPageStore } from '@/shared/store/news-page'
import { useAuthStore } from '@/shared/store/auth'

export const useSubscribeToMainEvents = () => {

   const isAuth = useAuthStore(state => state.isAuth)

   const returnFunc = () => {
      useChatStore.getState().resetChatData()

      mainSocket.disconnect()
      console.log('mainSocket disconnect');
   }

	useEffect(() => {

      mainSocket.connect()

      mainSocket.removeAllListeners()

		// Chat
		mainSocket.on("newMessage", ( msg ) => {
			useChatStore.getState().addNewMessage(msg)
		})

		mainSocket.on("deleteChatMessage", ( msgId ) => {
			useChatStore.getState().deleteMessage(msgId)
		})

		mainSocket.on("currentOnline", ( online ) => {
			useChatStore.setState({ online })
		})
      
      // News

      mainSocket.on('publishedTheNews', ( theNews ) => {
         useNewsPageStore.getState().addTheNews(theNews)
		})

      mainSocket.on('deleteTheNews', ( newsId ) => {
         useNewsPageStore.getState().deleteTheNews(newsId)
		})

		// Active Games
		mainSocket.on('addDeletePublicRoom', ( data ) => {
			useHomePageStore.getState().addDeletePublicRoom( data )
		})

      if ( !isAuth ) {
         return returnFunc
      }
      
		mainSocket.on('muteUser', ( term ) => {
			useUserStore.getState().muteUser(term)
		})

		mainSocket.on('unmuteUser', () => {
			useUserStore.getState().muteUser(null)
		})

		// Friends
		mainSocket.on('friendBecameOnline', ( openId ) => {
			useFriendsStore.getState().friendBecameOnline(openId)
		})

		mainSocket.on('addNotification', ( notification ) => {
			useNotificationsStore.getState().addNotification(notification)
		})
		mainSocket.on('deleteNotification', ( notification ) => {
			useNotificationsStore.getState().deleteNotification(notification.id)
		})

		mainSocket.on('friendRequestAccepted', ( newFriend, notification ) => {
			useFriendsStore.getState().addNewFriend( newFriend )
			useNotificationsStore.getState().addNotification(notification)
		})

		mainSocket.on('deleteFriend', ( openId ) => {
			useFriendsStore.getState().deleteFriend(openId)
		})

		mainSocket.on('friendChangedAvatar', ({ openId, avatar }) => {
			useFriendsStore.getState().friendChangedAvatar( openId, avatar )
		})
		mainSocket.on('friendChangedNickname', ({ openId, nickname }) => {
			useFriendsStore.getState().friendChangedNickname( openId, nickname )
		})

      mainSocket.on('newBlackMark', ( black_mark ) => {
         useUserStore.setState({ black_mark })
		})

      mainSocket.on('newComment', ( comment ) => {
         useUserStore.getState().newComment(comment)
		})

		return returnFunc

	}, [isAuth])
}