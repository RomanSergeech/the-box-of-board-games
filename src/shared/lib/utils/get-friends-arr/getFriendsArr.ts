import { useFriendsStore } from "@/shared/store/friends"

import type { TFriendData } from "@/shared/store/user"

export const getFriendsArr = (): string[] => {

	const friends = useFriendsStore.getState().friends

   if ( !friends ) return []

	const friendsArr = (Object.values(friends) as TFriendData[]).reduce<string[]>((acc, friend) => {
		acc.push(friend.open_id)
		return acc
	}, [])

	return friendsArr
}