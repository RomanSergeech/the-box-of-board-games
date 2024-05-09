import { useChatStore } from '@/shared/store/chat'

import c from './online.module.scss'

const Online = () => {

	const online = useChatStore(state => state.online)

	const getRightWord = () => {
		if ( [2, 3, 4].includes( +((''+online).slice(-1)) ) ) {
			return 'человека'
		}
		return 'человек'
	}

   if ( !online ) return <span className={c.online} ></span>

	return (
		<span className={c.online} >онлайн {online} {getRightWord()}</span>
	)
}

export { Online }