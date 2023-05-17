import * as React from 'react'
import {
  Container,
  Paper,
  TextareaAutosize,
  Box,
  Button,
  CircularProgress
} from "@mui/material"
import { DialogueBox } from '../../components/atoms/DialogueBox/DialogueBox'
import { useState } from 'react'
import questions from '../../utils/chat-questions.json'

export default function Partner() {
  const listOfQuestions = questions.list
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [userInput, setUserInput] = useState<string>('')
  const currentQuestionObject = listOfQuestions[questionIndex]
  const [currentQuestion, setCurrentQuestion] = useState<string>(currentQuestionObject.question)
  const [apiResponse, setApiResponse] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  
  console.log(currentQuestion)

  const onUserChangedText = (event: React.ChangeEvent<HTMLTextAreaElement>) => { 
    console.log(event.target.value)
    setUserInput(event.target.value)
  }

  const callGenerateResponse = async () => { 
    setIsGenerating(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        currentQuestion: currentQuestion,
      }),
    })

    try {
      const data = await response.json()
      const { output } = data
      setApiResponse(`${output.text}`)
      setIsGenerating(false)
    } catch (error) {
      console.log(error)
      setIsGenerating(false)
    }
  }

  return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem'
    }}>
                  <Paper
                sx={{
                    width: {xs:'100%', md:'80%'},
                    minHeight: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '1rem',
                }}
            >
                <DialogueBox questionaryText={currentQuestion} />
      </Paper>
      <TextareaAutosize 
          maxRows={4}
          aria-label="maximum height"
          placeholder="Escribe tu respuesta aquí..."
          style={{
          width: '80%',
          minHeight: '80px',
          display: 'flex',
          justifyContent: 'center',
          padding: '1rem',
          }}
          onChange={onUserChangedText}
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '80%',
        gap: '1rem'
      }}>
        <Button
          variant="outlined"
          onClick={callGenerateResponse}
        >
          Enviar
        </Button>
      </Box>
      {
        isGenerating && <CircularProgress />
      }
      {
        apiResponse && (
          <>
          <Paper
            sx={{
              width: { xs: '100%', md: '80%' },
              minHeight: '80px',
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <DialogueBox questionaryText={apiResponse} />
            </Paper>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '80%',
                gap: '1rem'
              }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                  const nextIndex = questionIndex + 1;
                  if (nextIndex < listOfQuestions.length) {
                    setQuestionIndex(nextIndex);
                    const nextQuestion = listOfQuestions[nextIndex].question;
                    setCurrentQuestion(nextQuestion);
                    setApiResponse('');
                    setUserInput('');
                  }
                }}
            >
              Siguiente Pregunta
            </Button>
            </Box>
          </>
        )
      }

    </Container>
  )
}