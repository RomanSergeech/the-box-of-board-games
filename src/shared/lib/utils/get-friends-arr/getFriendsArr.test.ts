import { afterAll, describe, expect, test } from 'vitest'
import { getFriendsArr } from './getFriendsArr'
import { useFriendsStore } from '@/shared/store/friends'
import { TFriendData } from '@/shared/store/user'

describe('util getFriendsArr', () => {

   afterAll(() => {
		useFriendsStore.setState({ friends: {} })
	})

	test('Getting friends with emty store', async () => {
		expect(getFriendsArr()).toEqual([])
	})

	test('Getting friends with loaded store', async () => {

		useFriendsStore.setState({
			friends: {
				'User_1_openId': {
					open_id: 'User_1_openId',
					nickname: 'User_1',
					avatar: '',
					online: false
				} satisfies TFriendData,
				'User_2_openId': {
					open_id: 'User_2_openId',
					nickname: 'User_2',
					avatar: '',
					online: false
				} satisfies TFriendData
			}
		})

		expect(getFriendsArr()).toEqual(['User_1_openId', 'User_2_openId'])
	})

})