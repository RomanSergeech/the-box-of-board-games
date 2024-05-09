import { useUserStore } from '@/shared/store/user'
import { classNames, formatNumberToMoney } from '@/shared/lib/utils'

import { EProfileLevel } from '@/shared/types/main-service/constants'
import type { TDailyTaskData } from '@/shared/types/main-service/user.types'

import c from './tasksBlock.module.scss'

const TasksBlock = () => {

   const dailyTasks = useUserStore(state => state.daily_tasks)
   const games = useUserStore(state => state.games)
   const profileLevel = useUserStore(state => state.profile_level)

   if ( !dailyTasks ) return <></>

   const sortedTasks = () => {
      return Object.values(dailyTasks?.tasksToDo || {}).reduce<TDailyTaskData[]>((acc, task) => {
         if ( games.includes(task.game) ) {
            acc.unshift(task)
         } else {
            acc.push(task)
         }
         return acc
      }, [])
   }

   return (
      <div className={c.tasks_wrapper} >

         <Task
            task={sortedTasks()[0]!}
            toCollect
            disabledSubReward={games.includes(sortedTasks()[0]!.game) || profileLevel.level === EProfileLevel.level_3}
         />
         
         {sortedTasks().map(task => (
            <Task
               key={task.text}
               task={task}
               canReload={task.canReload && dailyTasks.reloadCount > 0}
               disabledSubReward={games.includes(task.game) || profileLevel.level === EProfileLevel.level_3}
            />
         ))}
        
         <Task task={sortedTasks()[1]!} completed />

         {Object.values(dailyTasks?.completedTasks || {}).map(task => (
            <Task key={task.text} task={task} toCollect />
         ))}

         {Object.values(dailyTasks?.completedTasks || {}).map(task => (
            <Task key={task.text} task={task} completed />
         ))}

      </div>
   )
}

interface TaskProps {
   task: TDailyTaskData
   canReload?: boolean
   completed?: true
   toCollect?: true
   disabledSubReward?: boolean
}
const Task = ({ task, canReload, toCollect, completed, disabledSubReward }: TaskProps) => {

   const reloadTask = () => {
      useUserStore.getState().reloadTask(task.game)
   }

   console.log('Task');
   return (
      <div className={classNames(
         c.task,
         completed ? c._completed : '',
         toCollect ? c._to_collect : '',
      )} >

         <div className={c.task_item} >
            <p>Задание</p>
            <span>{task.text}</span>
         </div>

         <div className={c.task_item} >
            <p>Награда</p>
            <span>{task.reward.xp}xp</span>
         </div>

         <div className={c.task_item} >
            <p className={disabledSubReward ? '' : c._disabled} >Доп. награда</p>
            <span>{formatNumberToMoney(task.reward.money)}</span>
         </div>

         <div className={c.svg_wrapper} >

            {canReload && <button
               className={c.reload_btn}
               onClick={reloadTask}
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M2.5 2V8H8.5M21.5 22V16H15.5" stroke="#DED500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 11.5C21.9053 9.31151 21.0946 7.21466 19.6925 5.53163C18.2904 3.84861 16.3744 2.67253 14.239 2.18412C12.1036 1.6957 9.8669 1.92197 7.87258 2.82814C5.87825 3.73432 4.23665 5.27028 3.2 7.20001M2 12.5C2.11445 14.6805 2.93943 16.7636 4.34893 18.4312C5.75844 20.0988 7.67501 21.2592 9.80596 21.7353C11.9369 22.2113 14.1651 21.9768 16.1503 21.0676C18.1355 20.1584 19.7685 18.6245 20.8 16.7" stroke="#DED500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>}

            {(completed || toCollect) &&
               <svg className={completed ? c._completed_svg : ''} width="27" height="19" viewBox="0 0 27 19" fill="none" ><path d="M25.333 1L8.83301 17.5L1.33301 10" stroke="#DED500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            }

         </div>

      </div>
   )
}

export { TasksBlock }