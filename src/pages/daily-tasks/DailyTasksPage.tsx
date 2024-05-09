import { classNames } from "@/shared/lib/utils"
import { DescriptionBlock, TasksBlock } from "./components"
import { usePageCounter } from "@/shared/lib/hooks/yandex-metrika"

import c from './dailyTasksPage.module.scss'

const DailyTasksPage = () => {

   usePageCounter()

   return (
      <>
         <div className='top'>
				<h1 className='page_title' >Ежедневные задания</h1>
			</div>

         <div className={classNames(c.page_body, 'page_body')} >
            
            <DescriptionBlock />

            <TasksBlock />

         </div>
      </>
   )
}

export { DailyTasksPage }