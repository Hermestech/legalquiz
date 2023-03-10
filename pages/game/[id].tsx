import * as React from 'react'
import { useRouter } from 'next/router'
import useAppContext from '../../contexts/AppContext'
import GameLayout from '../../components/Layouts/GameLayout/GameLayout'
import { Box } from '@mui/system'
import { ProgressBar } from '../../components/atoms/progressbar/ProgressBar'
import { Typography } from '@mui/material'

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
  }, [questionaryId, questionaries])
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
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
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <Typography variant="body2">Pregunta { questionIndex === 0  ? 1 : questionIndex } de {questions.length}</Typography>
        <ProgressBar progress={questionIndex / questions.length * 100} />
      </Box>
      <GameLayout
        currentQuestionaryId={questionaryId as string}
        questions={questions} />
    </Box>

  )
}