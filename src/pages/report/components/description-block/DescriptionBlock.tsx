import { classNames } from "@/shared/lib/utils"

import c from './descriptionBlock.module.scss'

const DescriptionBlock = () => {
   return (
      <div className={classNames('block', c.description_block)}>

         <p>Мы блогадарны каждому кто помогает нам развивать проект.</p>
         <p>И ведем список, чтобы в будущем, когда появится достаточный функционал сайта, каждый beta-тестер получил заслуженную награду.</p>

      </div>
   )
}

export { DescriptionBlock }