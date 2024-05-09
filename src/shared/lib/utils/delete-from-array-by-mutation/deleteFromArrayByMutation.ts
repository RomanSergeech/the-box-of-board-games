
export const deleteFromArrayByMutation = <T>( array: T[], elem: T ) => {
   
   array.splice( array.indexOf(elem), 1 )

}