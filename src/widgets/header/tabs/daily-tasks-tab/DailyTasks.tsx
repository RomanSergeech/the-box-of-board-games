import { classNames } from '@/shared/lib/utils'
import { Link } from 'react-router-dom'
import { useHeaderStore } from '@/shared/store/header'

import './dailyTasks.scss'

interface DailyTasksProps {
   isAuth: boolean
}
const DailyTasks = ({ isAuth }: DailyTasksProps) => {

   const activeMenu = useHeaderStore(state => state.activeMenu)

   const text = (
      <span className='text'>Задания</span>
   )

   const className = classNames('bg', activeMenu ? '_active_menu' : '')

	return (
		<li className='some_tab' >

         {isAuth
            ? <Link to="/daily-tasks" className={className} >{text}</Link>
            : <span onClick={useHeaderStore.getState().activateLoginTab}  className={className} >{text}</span>
			}

		</li>
	)
}

export { DailyTasks }