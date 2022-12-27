import * as React from 'react'
import { useRouter } from 'next/router'
import useAppContext from '../contexts/AppContext'
import GameLayout from '../components/Layouts/GameLayout/GameLayout'

function getQuestionsFromQuestionary (questionaryId: string, questionaries: QuestionaryType[]) {
  const currentQuestionary = questionaries.find(questionary => questionary.sys.id === questionaryId)
  return currentQuestionary?.questionsCollection.questions || []
}

export default function GameId () {
    const router = useRouter()
    const { id: questionaryId } = router.query
    const { questionaries } = useAppContext()
    const [questions, setQuestions] = React.useState<QuestionType[]>([])

    React.useEffect(() => {
        if (questionaryId) {
            const myQuestions = getQuestionsFromQuestionary(questionaryId as string, questionaries)
            setQuestions(myQuestions)   
        }
    },[questionaryId, questionaries])




  return (

    <GameLayout questions={questions} />
  )
}
