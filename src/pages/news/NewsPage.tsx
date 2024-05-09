import { GetUrl, classNames } from "@/shared/lib/utils"
import { useNewsPageStore } from "@/shared/store/news-page"
import { Link } from "react-router-dom"
import { AddNewsForm } from "./add-news-form/AddNewsForm"
import { Button, Img } from "@/shared/UI"
import { useUserStore } from "@/shared/store/user"
import { EUserRole } from "@/shared/types/main-service/constants"
import { adminSocket } from "@/shared/api/socket"
import { usePageCounter } from "@/shared/lib/hooks/yandex-metrika"

import c from './newsPage.module.scss'

const promotions = [
   {
      id: 1,
      title: 'Пригласи 3 друзей и получи игру бесплатно',
      description: 'Приз: настольная игра Лабиринт с медвдем',
      image: 'promotion_1.png'
   }
]

const NewsPage = () => {

   usePageCounter()

   const news = useNewsPageStore(state => state.news)
   const isAdmin = useUserStore(state => state.role.includes(EUserRole.administrator))

   const deleteTheNews = ( newsId: string ) => {
      adminSocket.emit('api:deleteTheNews', newsId)
   }

   return (
      <>
         <div className='top'>
				<h1 className='page_title' >События</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >
            
            <div className={classNames(c.empty, 'block')} ></div>

            <div className={classNames('block', c.block)} >

               <h2 className='block_title' >Новости</h2>

               <span className="line" ></span>

               <div className={c.news_wrapper} >

                  {Object.values(news).map(news => (
                     <div key={news.id} className={c.news} >

                        <Img src={GetUrl.news(news.image)} className="img" borderColor='border' />
                        <p className={c.title} >{news.title}</p>
                        <p className={c.description} >{news.description}</p>

                        {isAdmin && adminSocket.connected &&
                           <Button onClick={() => deleteTheNews(news.id)} >Удалить</Button>
                        }
                     </div>
                  )) }

                  {isAdmin && adminSocket.connected && <AddNewsForm />}

               </div>
            </div>

            <div className={classNames('block', c.block)} >

               <h2 className='block_title' >Акции и розыгрыши</h2>

               <span className="line" ></span>
               
               <div className={c.news_wrapper} >
                  {promotions.map(promotion => (
                     <div key={promotion.id} className={c.news} >
                        <Img src={GetUrl.news(promotion.image)} className="img"  borderColor='border' />
                        <p className={c.title} >{promotion.title}</p>
                        <p className={c.description} >{promotion.description}</p>
                     </div>
                  )) }

                  <div className={c.news} >
                     <Img src={GetUrl.news('telegramQrCode.png')} className="img"  borderColor='border' />
                     <p className={c.title} >Подписывайся на наш телеграм канал, чтобы ничего не пропустить</p>
                     <p className={c.description} ><Link to={import.meta.env.VITE_TELEGRAM_LINK} >Перейти в телеграм</Link></p>
                  </div>
               </div>
            </div>

         </div>
      </>
   )
}

export { NewsPage }