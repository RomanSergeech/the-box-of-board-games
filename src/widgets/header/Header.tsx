import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/shared/store/user'
import { EUserRole } from '@/shared/types/main-service/constants'
import { useAuthStore } from '@/shared/store/auth'
import { MenuBtn, HomeTab, LoginTab, MainTab, NotificationsTab, ProfileTab, NewsTab, ShopTab, DailyTasks } from './tabs'
import { Logo } from '@/shared/UI'
// import { useHomePageStore } from '@/shared/store/home-page'
import { version } from '@/../package.json'
import './header.scss'

const Header = () => {

	const isAuth = useAuthStore(state => state.isAuth)
   const isAdmin = useUserStore(state => state.role.includes(EUserRole.administrator))
   // const version = useHomePageStore(state => state.version)

	const loginTabRef = useRef<HTMLLIElement>(null)
	const profileTabRef = useRef<HTMLLIElement>(null)

	return (
		<header className='header' >

         {isAdmin
            ? <Link to='/admin'><Logo className='logo' version={version} /></Link>
            : <Logo className='logo' version={version} />
         }

			<nav>
				<ul>

					<HomeTab />

					<DailyTasks isAuth={isAuth} />

					<MainTab />

					{isAuth
                  ? <ProfileTab profileTabRef={profileTabRef} />
                  : <LoginTab loginTabRef={loginTabRef} />
					}

					<NewsTab />

               <ShopTab />

					<NotificationsTab />

					<MenuBtn ignoreElementsRefs={[ loginTabRef, profileTabRef ]} />

				</ul>
			</nav>

		</header>
	)
}


export { Header }