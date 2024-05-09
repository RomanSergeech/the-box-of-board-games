import { classNames, getDate, showAlert } from "@/shared/lib/utils"
import { Button, Loader, ToggleButton } from "@/shared/UI"
import { useRef, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { adminSocket, mainSocket } from "@/shared/api/socket"
import { TReport, TReportComment, TReports, TReportType } from "@/shared/types/main-service/mainNsp.types"
import { REPORT_TYPES, STATUSES } from "../../constants"
import { useUserStore } from "@/shared/store/user"
import { EUserRole } from "@/shared/types/main-service/constants"
import { useAuthStore } from "@/shared/store/auth"

import c from './tableBlock.module.scss'


const reportsInitial = REPORT_TYPES.reduce<TReportsData>((acc, report) => {
   acc[report.id] = []
   return acc
}, {} as any)

type TReportsData = Record<TReportType, TReports>

const TableBlock = () => {

   const isAdmin = useUserStore(state => state.role.includes(EUserRole.administrator))

   const [reportType, setReportType] = useState<TReportType | ''>('')

   const [reports, setReports] = useState<TReportsData>(reportsInitial)

   const [loading, setLoading] = useState(false)

   const fetchReports = ( reportType: TReportType ) => {
      setReportType(reportType)
      if ( reports[reportType]?.length > 0 ) {
         return
      }
      setLoading(true)
      mainSocket.emit('getReports', reportType, (data, error) => {
         setLoading(false)
         if ( error || !data?.reports ) {
            showAlert({
               text: ['Что-то пошло не так']
            }, 2000)
            return
         }
         setReports(prev => ({
            ...prev,
            [reportType]: data.reports
         }))
      })
   }

   return (
      <div className={c.table_block} >

         <div className={c.btns} >
            {REPORT_TYPES.map(type => (
               <ToggleButton
                  key={type.id}
                  active={reportType === type.id}
                  onClick={() => fetchReports(type.id)}
               >
                  <span style={{ opacity: loading && reportType === type.id ? 0 : 1 }} >{type.text}</span>
                  {loading && reportType === type.id && <Loader fontSize={18} className={c.loader} />}
               </ToggleButton>
            ))}
         </div>

         
         <div className={classNames('block', c.table)} >

            <div className={c.table_wrapper} >

               <span className={classNames(c.line, c.vertical, c.common)} ></span>
               <span className={classNames(c.line, c.vertical, c.common)} ></span>
               <span className={classNames(c.line, c.vertical, c.common)} ></span>

               <span className={c.line} ></span>

               <div className={c.table_title} >
                  <p>id</p>
                  <p>Голоса</p>
                  <p>Статус</p>
                  <p>Описание</p>
               </div>

               <span className={c.line} ></span>

               <ul className={c.table} >

                  {reportType && reports[reportType].map(report => (<Fragment key={report.id} >
                     <li>
                        <p className={c.id} >{report.id}</p>

                        <Votes reportId={report.id} currentVotes={report.votes} />

                        {isAdmin
                           ? <ReportStatus reportId={report.id} currentStatus={report.status_id} />
                           : <p className={c.status} >{STATUSES[report.status_id]}</p>
                        }

                        <div className={c.message} >
                           {isAdmin && <p className={c.date} >openId: {report.open_id}</p>}
                           <p className={c.date} >{getDate(report.date, 'dmy в HM')}</p>
                           <p className={c.text} >{report.message}</p>
                           <div className={c.comments} >

                              {report.comments.length > 0 && report.comments.map(comment => (
                                 <p key={comment.id} className={c.comment} >
                                    <span className={comment.nickname === 'Разработчик' ? c.dev : ''} >{comment.nickname}</span>
                                    <span>{comment.text}</span>
                                    {isAdmin &&
                                       <DeleteCommentButton
                                          reportId={report.id}
                                          commentId={comment.id}
                                          reportType={reportType}
                                          setReports={setReports}
                                       />
                                    }
                                 </p>
                              ))}

                              {isAdmin &&
                                 <CommentForm
                                    reportId={report.id}
                                    reportType={reportType}
                                    setReports={setReports}
                                 />
                              }
                           </div>
                        </div>

                        {isAdmin &&
                           <DeleteReportButton
                              reportId={report.id}
                              reportType={reportType}
                              setReports={setReports}
                           />
                        }

                     </li>

                     <span className={c.line} ></span>
                  </Fragment>))}

                  {(!reportType || reports[reportType]?.length < 5) && Array.from({length: 5 - (reports[reportType as TReportType]?.length || 0)}, (_, i) => i + 1).map((num) => (<Fragment key={num} >
                     <li>
                        <p className={c.id} >&#160;</p>
                        <p className={c.votes} >&#160;</p>
                        <p className={c.status} >&#160;</p>
                        <div className={c.message} >&#160;</div>
                     </li>

                     <span className={c.line} ></span>
                  </Fragment>))}

               </ul>

               <span className={c.line} ></span>

            </div>

         </div>

      </div>
   )
}


interface VotesProps {
   reportId: string
   currentVotes: TReport['votes']
}
const Votes = ({ reportId, currentVotes }: VotesProps) => {

   const openIdStore = useUserStore.getState().open_id
   const isAuth = useAuthStore.getState().isAuth
   
   const votedRef = useRef(currentVotes.includes(openIdStore))

   const [active, setActive] = useState(votedRef.current)
   const [votes, setVotes] = useState(currentVotes)

   const timerRef = useRef<NodeJS.Timeout | null>(null)

   const toggleVoteHandler = () => {
      if ( !isAuth ) return

      setActive(prev => {
         const isVoted = !prev
         clearTimeout(timerRef.current!)
         console.log(isVoted, votedRef.current);
         
         if ( isVoted === votedRef.current ) {
            return isVoted
         }
         timerRef.current = setTimeout(() => {

            console.log('send');
            mainSocket.emit('sendReportVote', reportId, isVoted, (data, error) => {
               if ( error || !data?.votes ) {
                  showAlert({ text: ['Что-то пошло не так'] }, 2000)
                  return 0
               }
               votedRef.current = isVoted
               setVotes(data.votes)
               if ( isVoted ) {
                  showAlert({ text: ['Голос сохранен'] }, 2000)
               } else {
                  showAlert({ text: ['Голос удален'] }, 2000)
               }
            })

         }, 2_000)
         return isVoted
      })
   }

   return (
      <p className={c.votes} >
         <button
            onClick={toggleVoteHandler}
            className={classNames(active ? c.voted : '', isAuth ? '' : c._disabled)}
         >
            {active &&<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 8.1L6.35714 12.5L18.5 1.5" stroke="#DED500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            <span>{votes.length}</span>
         </button>
      </p>
   )
}

interface ReportStatusProps {
   currentStatus: TReport['status_id']
   reportId: string
}
const ReportStatus = ({ currentStatus, reportId }: ReportStatusProps) => {

   const [statusId, setStatusId] = useState(currentStatus)
   const [timer, setTimer] = useState(0)

   const timerRef = useRef<NodeJS.Timeout | null>(null)

   const changeStatus = () => {
      setStatusId(prev => {
         const statuses = Object.keys(STATUSES) as TReport['status_id'][]
         const prevIndex = statuses.indexOf(prev)
         let newIndex = prevIndex + 1
         if ( newIndex === statuses.length ) {
            newIndex = 0
         }
         const newStatus = statuses[newIndex]!
         if ( newStatus === currentStatus ) {
            setTimer(0)
            clearInterval(timerRef.current!)
            return newStatus
         }
         setTimer(5)
         clearInterval(timerRef.current!)
         timerRef.current = setInterval(() => {
            setTimer(prev => {
               const newNum = prev - 1
               if ( newNum <= 0 ) {
                  clearInterval(timerRef.current!)

                  mainSocket.emit('changeReportStatus', reportId, newStatus, (data, error) => {
                     if ( error || !data?.success ) {
                        showAlert({ text: ['Что-то пошло не так'] }, 2000)
                        return 0
                     }
                     showAlert({ text: ['Статус изменен'] }, 2000)
                  })

               }
               return newNum
            })
         }, 1_000)
         return newStatus
      })
   }

   return (<>
      <button
         type="button"
         className={c.status}
         onClick={changeStatus}
      >
         {STATUSES[statusId]}
         {timer !== 0 && <span>{timer}</span>}
      </button>

   </>)
}

interface CommentFormProps {
   reportId: string
   reportType: TReportType
   setReports: React.Dispatch<React.SetStateAction<TReportsData>>
}
const CommentForm = ({ reportId, reportType, setReports }: CommentFormProps) => {

   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const sendComment = ( e: any ) => {
      e.preventDefault()

      const data = new FormData(e.currentTarget)

      const text = data.get('message') as string | null

      if ( !text ) {
         showAlert({ text: ['Сообщение пустое'] }, 2000)
         return
      }

      const message: TReportComment = {
         id: ''+Date.now(),
         nickname: 'Разработчик',
         text
      }

      adminSocket.emit('api:commentToReport', { reportId, message }, (data, error) => {
         if ( error || !data?.report ) {
            showAlert({ text: ['Что-то пошло не так'] }, 2000)
            return
         }
         if ( textareaRef.current) textareaRef.current.value = ''
         setReports(prev => {
            const index = prev[reportType].findIndex(r => r.id === reportId)
            prev[reportType][index] = data.report!
            return { ...prev }
         })
      })
   }

   return (
      <form onSubmit={sendComment} >
         <textarea
            ref={textareaRef}
            placeholder="Написать комментарий"
            name='message'
            rows={1}
            maxLength={300}
         />
         <button type='submit' >Отправить</button>
      </form>
   )
}

interface DeleteCommentButtonProps {
   reportId: string
   commentId: string
   reportType: TReportType
   setReports: React.Dispatch<React.SetStateAction<TReportsData>>
}
const DeleteCommentButton = ({ reportId, commentId, reportType, setReports }: DeleteCommentButtonProps) => {

   const [confirm, setConfirm] = useState(false)

   const deleteHandler = () => {
      adminSocket.emit('deleteCommentReport', { reportId, commentId }, (data, error) => {
         if ( error || !data?.report ) {
            showAlert({
               text: ['Что-то пошло не так']
            }, 2000)
            return
         }
         setReports(prev => {
            const index = prev[reportType].findIndex(r => r.id === reportId)
            prev[reportType][index] = data.report!
            return { ...prev }
         })
      })
   }

   const confirmCandler = () => {
      setConfirm(true)
      setTimeout(() => {
         setConfirm(false)
      }, 3000)
   }

   return (
      <button onClick={confirm ? deleteHandler : confirmCandler} >
         {confirm ? 'Подтвердить' : 'Удалить'}
      </button>
   )
}

interface DeleteReportButtonProps {
   reportId: string
   reportType: TReportType
   setReports: React.Dispatch<React.SetStateAction<TReportsData>>
}
const DeleteReportButton = ({ reportId, reportType, setReports }: DeleteReportButtonProps) => {

   const [confirm, setConfirm] = useState(false)

   const deleteHandler = () => {
      mainSocket.emit('deleteReport', reportId, (data, error) => {
         if ( error || !data?.success ) {
            showAlert({
               text: ['Что-то пошло не так']
            }, 2000)
            return
         }
         setReports(prev => ({
            ...prev,
            [reportType]: prev[reportType].filter(el => el.id !== reportId)
         }))
      })
   }

   const confirmCandler = () => {
      setConfirm(true)
      setTimeout(() => {
         setConfirm(false)
      }, 3000)
   }

   return (
      <Button
         borderColor='red_light'
         className={c.delete_report_button}
         onClick={confirm ? deleteHandler : confirmCandler}
      >
         {confirm ? 'Подтвердить' : 'Удалить'}
      </Button>
   )
}

export { TableBlock }