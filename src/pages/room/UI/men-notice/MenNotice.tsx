import { useRoomPageStore } from "@/shared/store/room-page"

import menSvg from "@/shared/assets/images/room/men.svg"
import menShadow from "@/shared/assets/images/room/menShadow.svg"
import LHandSvg from "@/shared/assets/images/room/LHand.svg"
import RHandSvg from "@/shared/assets/images/room/RHand.svg"

import './MenNotice.scss'

const MenNotice = () => {

	const userRejectStore = useRoomPageStore(state => state.userRejectAddToLobby)

	if (userRejectStore) {
		setTimeout(() => {
			useRoomPageStore.setState({ userRejectAddToLobby: '' })
		}, 5000)
	}

	return (
		<div className={`MenNotice ${userRejectStore ? '_active' : ''}`}>

			<div className='men'>

				<div className='men_body_shadow'>
					<img className='shadow' src={menShadow} alt="" />
					<img className='men_body' src={menSvg} alt="" />
				</div>

				<img className='LHand' src={LHandSvg} alt="" />
				<img className='RHand' src={RHandSvg} alt="" />
			</div>

			<div className='notice'>

				<span>{userRejectStore}</span>

				<span>сказал, что не пойдет</span>

			</div>

		</div>
	)
}

export { MenNotice }