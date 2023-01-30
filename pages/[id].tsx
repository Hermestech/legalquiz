import * as React from 'react'
import { useRouter } from 'next/router'
import useAppContext from '../contexts/AppContext'
import GameLayout from '../components/Layouts/GameLayout/GameLayout'
import { Box } from '@mui/system'
import ProgressBar from '../components/atoms/ProgressBar/ProgressBar'

function getQuestionsFromQuestionary (questionaryId: string, questionaries: QuestionaryType[]) {
  const currentQuestionary = questionaries.find(questionary => questionary.sys.id === questionaryId)
  return currentQuestionary?.questionsCollection.questions || []
}

export default function GameId () {
    const router = useRouter()
    const { id: questionaryId } = router.query
    const { questionaries, questionIndex } = useAppContext()
    const [questions, setQuestions] = React.useState<QuestionType[]>([])

    React.useEffect(() => {
        if (questionaryId) {
            const myQuestions = getQuestionsFromQuestionary(questionaryId as string, questionaries)
            setQuestions(myQuestions)   
        }
    },[questionaryId, questionaries])




  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '10%',
          width: '100%',
          marginBottom: '2rem',
        }}
      >
        <ProgressBar progress={questionIndex * 10}/>
      </Box>
      <GameLayout questions={questions} />
    </Box>

  )
}
