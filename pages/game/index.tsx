import * as React from "react"
import { GetStaticProps } from 'next'
import QuestionariesLayout from "../../components/Layouts/QuestionariesLayout/questionaries-layout"
import { useRegisterUser } from "../../hooks/useRegister"
import { MyLottie } from "../../components/atoms/MyLottie/my-lottie"
import { useUser } from "@auth0/nextjs-auth0"
import { getQuestionaries } from '../../lib/contentful/get-entries.graphql'

import useAppContext from "../../contexts/AppContext"

interface GameProps { 
  questionaries: QuestionaryType[]
}

export default function Game({ questionaries }: GameProps) {
  const { setQuestionaries } = useAppContext()
  const { user, error, isLoading  } = useUser()
  useRegisterUser(user)

  React.useEffect(() => { 
    setQuestionaries(questionaries)
  }, [])
  
  if (isLoading) { 
    return <MyLottie />
  }

  if (error) { 
    return <div>Oops... {error.message} </div>
  }

  return <QuestionariesLayout questionaries={questionaries} />
}


export const getStaticProps: GetStaticProps = async () => { 
  const rawQuestionaries = await getQuestionaries()
  const questionaries = rawQuestionaries.questionaries
  return {
    props: {
      questionaries
    }
  }
}