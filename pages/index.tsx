import * as React from 'react'

import { Card, CardContent, Typography, Box, Container, Button } from '@mui/material'

import { getQuestions } from '../lib/contentful/get-entries.graphql'

export default function Home() {
  const [questions, setQuestions] = React.useState<QuestionType[]>([])
  const [rightAnswer, setRightAnswer] = React.useState<boolean>(false)
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [score, setScore] = React.useState<number>(0)
  
  React.useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestions()
      setQuestions(response.items)
    }
    fetchQuestions()
  }, [])
  console.log(questions)

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1)
  }
  
  const handleAnswer = (answer:AnswerType) => {
    if(answer.isRightAnswer) {
      setRightAnswer(true)
      setScore(score + 1)
    } else {
      setRightAnswer(false)
    }
    nextQuestion()
  }

  const Answer = ({ answer }:any ) => {
    return <Button 
      variant='outlined' 
      style={{ width:'100%'}}
      onClick={ () => {handleAnswer(answer)}}>
        {answer.textAnswer}
        </Button>;
  };
  

  const Question:React.FC<QuestionType> = ({ question, answersCollection }) => {
    return (
      <>
        <Card >
          <CardContent>
            <Typography variant='h5' component='h2'>
           {question}
            </Typography>
           </CardContent>
        </Card>
        <Box sx={{ display:'flex', justifyContent:'center', flexDirection:'column', gap:'.5rem', width:'100%'}}>
        {answersCollection.items.map(answer => (
          <Answer key={answer.textAnswer} answer={answer} />
        ))}
        </Box>
      </>
    );
  };

  if ( questionIndex >= questions.length){
    return (
      <Container sx={{ display:'flex', justifyContent:'center'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh', 
          width:'350px',
          gap:'2rem'
        }}
      >
        <p>Score: {score}</p>
      </Box>
      </Container>
    )
  }
  


  return (
    <Container sx={{ display:'flex', justifyContent:'center'}}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', 
        width:'350px',
        gap:'2rem'
      }}
    >
      {
        questions.length > 0 ? <Question {...questions[questionIndex]} /> : <p>Loading...</p>
      }      
    </Box>    
    </Container>
  )
}
