import * as React from "react"
import QuestionariesLayout from "../components/Layouts/QuestionariesLayout/questionaries-layout"
import useAppContext from "../contexts/AppContext"
import { useRegisterUser } from "../hooks/useRegister"
import { MyLottie } from "../components/atoms/MyLottie/my-lottie"
import { useUser } from "@auth0/nextjs-auth0"

export default function Game() {
  const { user, error, isLoading  } = useUser()
  useRegisterUser(user)
  const { questionaries } = useAppContext()

  
  if (isLoading) { 
    return <MyLottie />
  }

  if (error) { 
    return <div>Oops... {error.message} </div>
  }


  return <QuestionariesLayout questionaries={questionaries} />
}
