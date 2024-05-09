import { ReactNode, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '@/shared/UI'
import { DailyTasksPage, NewsPage, HomePage, NotFoundPage, ProfilePage, RoomPage, ShopPage, SomeUserProfilePage, MainPage } from "@/pages"
import { MainLayout, CommonLayout } from "@/app/layouts"
import { useAlertStore } from "@/shared/store/alert"
import { getValidUrl } from '@/shared/lib/utils'
import { useUserStore } from '@/shared/store/user'
import { EAllGamesIds, EUserRole, TAllGamesIds } from '@/shared/types/main-service/constants'
import { useAuthStore } from '@/shared/store/auth'


const AdminPageLazy = lazy(() => import('@/pages/admin/AdminPage'))
const ReportPageLazy = lazy(() => import('@/pages/report/ReportPage'))


const MonopolyLazy = lazy(() => import('@/games/monopoly'))
const LabyrinthWithBearLazy = lazy(() => import('@/games/labyrinth-with-bear'))

const GAMES: Record<TAllGamesIds, ReactNode> = {
   [EAllGamesIds.monopoly]: <MonopolyLazy />,
   [EAllGamesIds.labyrinthWithBear]: <LabyrinthWithBearLazy />,
   [EAllGamesIds.balabol]: <></>,
   [EAllGamesIds.words]: <></>,
   [EAllGamesIds.chess]: <></>,
}


const Navigation = () => {

   const isAuth = useAuthStore(state => state.isAuth)
	const isAdmin = useUserStore(state => state.role.includes(EUserRole.administrator))
	const alertFixed = useAlertStore(state => state.blockSite)

   console.log('render Navigation');
	return (
		<>
			{!alertFixed
			?
				<Routes>

					<Route path="/" element={ <CommonLayout /> } >
					   <Route index element={<MainPage />} />

						<Route path="/" element={ <MainLayout /> } >
                     <Route path='home' element={ <HomePage /> } />
                     <Route path='shop' element={ <ShopPage /> } />
                     <Route path='daily-tasks' element={ <DailyTasksPage /> } />
                     <Route path='news' element={ <NewsPage /> } />
                     <Route path='profile'>
                        {isAuth &&
                           <Route index element={ <ProfilePage /> } />
                        }
                        <Route path=':id' element={ <SomeUserProfilePage /> } />
                     </Route>
                     {isAdmin &&
                        <Route path='admin' element={
                           <Suspense fallback={<Loader fontSize={25} fullScreen={true} />} >
                              <AdminPageLazy />
                           </Suspense>
                        } />
                     }
                     <Route path='report' element={ 
                        <Suspense fallback={<Loader fontSize={25} fullScreen={true} />} >
                           <ReportPageLazy />
                        </Suspense>
                     } />
                  </Route>
					</Route>

               {isAuth &&
                  <Route path="room/:id" >
                     <Route index element={ <RoomPage /> } />
                     {Object.keys(GAMES).map(gameId => (
                        <Route key={gameId} path={getValidUrl(gameId)} element={
                           <Suspense fallback={<Loader fontSize={25} fullScreen={true} />} >
                              {GAMES[gameId as keyof typeof GAMES]}
                           </Suspense>
                        } />
                     ))}
                  </Route>
               }

					<Route path='*' element={ <NotFoundPage /> } />

				</Routes>
			:
				<Routes>
               <Route path="/" element={ <CommonLayout /> } >
                  <Route index element={ <MainPage /> } />
					</Route>
               <Route path='*' element={ <NotFoundPage /> } />
				</Routes>
			}
		</>
	)
}

export { Navigation }