import type { TTextField } from "@/shared/lib/hooks/form/use-text-field/useTextField"

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const chars = '!@#$%^&*()<>,.?/[]{}-=_+|\\'
const nums = '0123456789'

const setOfSymbols = letters + chars + nums

const length = 10

interface GeneratePasswordProps {
   handleChange: TTextField['handleChange']
   setInputType: React.Dispatch<React.SetStateAction<string>>
}
const GeneratePassword = ({ handleChange, setInputType }: GeneratePasswordProps) => {

   const generateHandler = () => {
      setInputType('text')

      let password = ''

      for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * setOfSymbols.length)
         password += setOfSymbols[randomIndex]
      }

      const countNums = Math.floor(Math.random() * 4)+1
      const countLetters = Math.floor(Math.random() * 4)+1
      const countChars = Math.floor(Math.random() * 4)+1
      
      for (let i = 0; i < countNums; i++) {
         const randomIndex = Math.floor(Math.random() * setOfSymbols.length)
         const randomNum = Math.floor(Math.random() * 10)
         const str = password.split('')
         str[randomIndex] = ""+randomNum
         password = str.join('')
      }

      for (let i = 0; i < countLetters; i++) {
         const randomIndex = Math.floor(Math.random() * setOfSymbols.length)
         const randomLetter = Math.floor(Math.random() * letters.length)
         const str = password.split('')
         str[randomIndex] = letters[randomLetter]!
         password = str.join('')
      }

      for (let i = 0; i < countChars; i++) {
         const randomIndex = Math.floor(Math.random() * setOfSymbols.length)
         const randomChar = Math.floor(Math.random() * chars.length)
         const str = password.split('')
         str[randomIndex] = chars[randomChar]!
         password = str.join('')
      }

      handleChange({ target: { value: password } } as any)
   }

   return (
      <div
         className="generate_password"
         onClick={generateHandler}
      >
         <svg width="20" height="20" viewBox="0 0 35 40" fill="none" >
            <path d="M22.8846 0C16.2275 0 10.7692 5.45823 10.7692 12.1154C10.7692 12.8148 10.8849 13.43 10.9796 14.0505L0.378606 24.6094L0 25.03V35H9.42308V30.9615H13.4615V26.9231H17.5V22.9267C19.088 23.7049 20.939 24.2308 22.8846 24.2308C29.5418 24.2308 35 18.7725 35 12.1154C35 5.45823 29.5418 0 22.8846 0ZM22.8846 2.69231C28.0747 2.69231 32.3077 6.92533 32.3077 12.1154C32.3077 17.3054 28.0747 21.5385 22.8846 21.5385C21.2545 21.5385 19.5771 21.0599 18.2993 20.3606L17.9627 20.1923H14.8077V24.2308H10.7692V28.2692H6.73077V32.3077H2.69231V26.1659L13.3353 15.4808L13.8401 15.018L13.7139 14.3029C13.5772 13.4931 13.4615 12.7727 13.4615 12.1154C13.4615 6.92533 17.6946 2.69231 22.8846 2.69231ZM25.5769 6.73077C24.0888 6.73077 22.8846 7.93495 22.8846 9.42308C22.8846 10.9112 24.0888 12.1154 25.5769 12.1154C27.0651 12.1154 28.2692 10.9112 28.2692 9.42308C28.2692 7.93495 27.0651 6.73077 25.5769 6.73077Z" fill="white"/>
         </svg>
      </div>
   )
}

export { GeneratePassword }