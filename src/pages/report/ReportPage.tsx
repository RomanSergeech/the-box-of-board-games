import { classNames } from "@/shared/lib/utils"
import { DescriptionBlock, FormBlock, TableBlock } from "./components"
import { useAuthStore } from "@/shared/store/auth"
import { usePageCounter } from "@/shared/lib/hooks/yandex-metrika"

import c from './reportPage.module.scss'

const ReportPage = () => {

   usePageCounter()

   const isAuth = useAuthStore(state => state.isAuth)

   return (
      <>
         <div className='top' >
            <h1 className='page_title' >Книга жалоб и предложений</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >

            <DescriptionBlock />

            {isAuth && <FormBlock />}

            <TableBlock />

         </div>
      </>
   )
}

export default ReportPage