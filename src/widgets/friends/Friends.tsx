import { useState } from 'react'
import { FindUserButton, Friend } from './components'
import { useSortFriends } from './hooks/useSortFriends'
import { classNames } from '@/shared/lib/utils'

import c from './friends.module.scss'

const Friends = () => {

	const [showAllFriends, setShowAllFriends] = useState(false)

	const sortedFriends = useSortFriends()

	const showAllFriendsHandler = (): void => {
		setShowAllFriends(prev => !prev)
	}

	return (
		<div className={classNames('block', c.friends)} >

			<h2 className='block_title' >Друзья</h2>

         <span className='line' ></span>
			
			<div className={c.friends_body} >

				<FindUserButton />

				{sortedFriends.map((friend, index) => (
					<Friend
                  key={friend.open_id}
                  friend={friend}
                  index={index}
                  showAllFriends={showAllFriends}
               />
				))}
				{sortedFriends.length > 5 &&
					<button onClick={showAllFriendsHandler} >
						{showAllFriends ? 'свернуть' : 'развернуть'}
					</button>
				}
			</div>
		</div>
	)
}

export { Friends }