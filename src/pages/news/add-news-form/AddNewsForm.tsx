import { NewsImage } from "./image/NewsImage"
import { Button } from "@/shared/UI"
import { adminSocket } from "@/shared/api/socket"
import { useState } from "react"

import c from '../newsPage.module.scss'

const AddNewsForm = () => {

   const [loadedFile, setLoadedFile] = useState<Blob | null>(null)

   const confirmHandler = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault()

      const data = new FormData(e.currentTarget)

      const file = loadedFile
      const title = data.get('title') as string | null
      const description = data.get('description') as string | null

      if ( !file?.size ) {
         console.log('Что-то с картинкой');
         return
      }
      if ( !title ) {
         console.log('Что-то с заголовком');
         return
      }
      if ( !description ) {
         console.log('Что-то с описанием');
         return
      }

      const theNews = { file: file as any, title, description }

      adminSocket.emit('api:publishTheNews', theNews, ({ err }) => {
         console.log(err);
      })
      
   }

   return (
      <form className={c.news} onSubmit={confirmHandler} >

         <NewsImage setLoadedFile={setLoadedFile} />

         <input
            type="text"
            id='title'
            name="title"
            placeholder='Добавить заголовок'
            className={c.title}
         />

         <input
            type="text"
            name="description"
            placeholder='Добавить описание'
            className={c.description}
         />

         <Button borderColor="main" textColor="main" >Опубликовать</Button>

      </form>
   )
}

export { AddNewsForm }