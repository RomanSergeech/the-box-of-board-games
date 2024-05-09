import { Button } from '@/shared/UI'

import c from './notFoundPage.module.scss'

const NotFoundPage = () => {
	return (
		<div className={c.page_body} >

         <h1>404</h1>

         <div className={c.cloak__wrapper}>
            <div className={c.cloak__container}>
               <div className={c.cloak}></div>
            </div>
         </div>

         <div className={c.info}>

            <h2>Страница не найдена</h2>

            <p>
               Мы почти уверены, что эта страница раньше была<br/>
               здесь, но, похоже, пропала. Предлагаем вам перейти<br/>
               на главную и выбрать другую страницу.
            </p>

            <Button
               to="/"
               borderColor='main'
               textColor='main'
            >
               На Главную
            </Button>

         </div>

      </div>
	)
}

export { NotFoundPage }