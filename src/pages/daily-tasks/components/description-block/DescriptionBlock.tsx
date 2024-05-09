import { classNames } from "@/shared/lib/utils"
import { useUserStore } from "@/shared/store/user"

import { EProfileLevel } from "@/shared/types/main-service/constants"

import c from './descriptionBlock.module.scss'

const DescriptionBlock = () => {

   const profileLevel = useUserStore(state => state.profile_level)

   return (
      <div className={classNames('block', c.description_block)}>

         {profileLevel.level === EProfileLevel.level_1 &&
            <p>За задания игр из вашего профиля вы получаете доп. награду</p> }

         {profileLevel.level === EProfileLevel.level_2 &&
            <p>За задания игр из вашего профиля вы получаете доп. награду</p> }

         {profileLevel.level === EProfileLevel.level_3 &&
            <p>За любое задание вы получаете доп. награду</p> }


         {profileLevel.level === EProfileLevel.level_1 &&
            <p>1 задание можно заменить ( раз в день )</p> }

         {profileLevel.level === EProfileLevel.level_2 &&
            <p>3 задания можно заменить ( раз в день )</p> }

         {profileLevel.level === EProfileLevel.level_3 &&
            <p>1 раз каждое задание можно заменить ( раз в день )</p> }

      </div>
   )
}

export { DescriptionBlock }