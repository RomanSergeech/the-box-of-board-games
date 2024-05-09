
export const REPORT_TYPES = [
   {
      id: 'proposal',
      text: 'Идеи'
   },
   {
      id: 'error',
      text: 'Ошибки'
   },
   {
      id: 'bug',
      text: 'Баги'
   }
] as const

export const STATUSES = {
   'waiting': 'Ожидание',
   'reviewed': 'Рассмотрено',
   'fixed': 'Исправлено'
} as const