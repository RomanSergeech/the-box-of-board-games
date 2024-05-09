import { Button } from "@/shared/UI"

interface SendComplaintButtonProps {
   
}
export const SendComplaintButton = ({  }: SendComplaintButtonProps) => {
   return (
      <Button
         borderColor="red"
      >
         Отправить жалобу
      </Button>
   )
}