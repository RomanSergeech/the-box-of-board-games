
const enum EDateTypes {
   type_1 = 'D M в HM',
   type_2 = 'Y год, D M в HMS',
   type_3 = 'd.m.y | HMS',
   type_4 = 'D M Y',
   type_5 = 'm минут s секунд',
   type_6 = 'dmy в HM'
}

type TDateTypes = `${EDateTypes}`

export const getDate = ( date: number, type: TDateTypes ): string => {

   const dateObj = new Date(date)

   const day = dateObj.getDate()
   const time = addZero(dateObj.getHours()) + ':' + addZero(dateObj.getMinutes())

   const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'окртября', 'ноября', 'декабря']
   const month = months[dateObj.getMonth()]

   switch (type) {

      case EDateTypes.type_2:
         return (() => {
            const year = dateObj.getFullYear()
            const seconds = dateObj.getSeconds()

            return `${year} год, ${day} ${month} в ${time}:${seconds}`
         })()

      case EDateTypes.type_3:
         return (() => {
            const day = dateObj.getDate()
            const seconds = dateObj.getSeconds()
            const month = dateObj.getMonth() + 1
            const year = (''+dateObj.getFullYear()).slice(-2)
            return `${addZero(day)}.${addZero(month)}.${year} | ${time}:${seconds}`
         })()

      case EDateTypes.type_4:
         return (() => {
            const day = dateObj.getDate()
            const year = dateObj.getFullYear()
            return `${day} ${month} ${year}`
         })()

      case EDateTypes.type_5:
         return (() => {
            const minutes = dateObj.getMinutes()
            const seconds = dateObj.getSeconds()
            return `${minutes} минут ${seconds} секунд`
         })()

      case EDateTypes.type_6:
         return (() => {
            const day = dateObj.getDate()
            const month = dateObj.getMonth() + 1
            const year = (''+dateObj.getFullYear()).slice(-2)
            return `${addZero(day)}.${addZero(month)}.${year} в ${time}`
         })()

      default:
         return `${addZero(day)} ${month} в ${time}`
   }
}

const addZero = (num: number) => {
   return num < 10 ? '0'+num : num
}