
export const formatNumber = ( num: number ): string => {

   // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

	return num?.toLocaleString("de-DE")

}