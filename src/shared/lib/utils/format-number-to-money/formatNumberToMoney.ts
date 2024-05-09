import { formatNumber } from "../format-number/formatNumber"

export const formatNumberToMoney = ( num: number ): string => {

   return formatNumber(num) + 'р'

}
