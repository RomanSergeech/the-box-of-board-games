import { useMemo } from "react"
import { useFriendsStore } from "@/shared/store/friends"

import type { TFriendData } from "@/shared/store/user"


export const useSortFriends = (): TFriendData[] => {

	const friendsStore = useFriendsStore(state => state.friends)

	return useMemo(() => {

		let friends: TFriendData[] = Object.values(friendsStore || {})

      // friends = [ ...friends, getFriend(), getFriend(), getFriend(), getFriend(), getFriend(), getFriend(), getFriend(), getFriend(), getFriend(), getFriend() ]
		
      const sortedFriends = friends.reduce<TFriendData[]>((acc, friend) => {
			if (friend.online) {
				acc.unshift(friend)
			} else {
				acc.push(friend)
			}
			return acc
		}, [])

		return sortedFriends

	}, [friendsStore])

}


// const getFriend = () => {
//    var max = parseInt('100000000', 8);
//    return {
//       open_id: ('0000000' + Math.floor(Math.random() * max).toString(8)).slice(-8),
//       nickname: "Opera",
//       avatar: "d46e4238-9fb6-442c-9317-2460d9d4af92.webp",
//       online: Math.floor(Math.random() * 9) > 4 ? true : false
//    }
// }