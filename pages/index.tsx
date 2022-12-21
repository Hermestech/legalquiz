import * as React from 'react'

import { Card, CardContent, Typography, Box, Container, Button } from '@mui/material'

import { getQuestions } from '../lib/contentful/get-entries.graphql'

export default function Home() {
  const [questions, setQuestions] = React.useState<QuestionType[]>([])
  const [rightAnswer, setRightAnswer] = React.useState<boolean>(false)
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [score, setScore] = React.useState<number>(0)
  const [lifes, setLifes] = React.useState<number>(3)
  
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
      setLifes(lifes - 1)
    }
    nextQuestion()
  }


const RemainingLives = () => {
    return (
      <Box sx={{ display:'flex', justifyContent:'center', gap:'.5rem', backgroundColor:'rgba(0.5, 0.5, 0.5 , 0.4)' }}>
        {Array(lifes).fill(<span>❤️</span>)}
      </Box>
    )
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
      <Box sx={{ width: {sx:'350px', md:'500px'} }}>
        <Card sx={{ marginBottom:'1rem' }}>
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
      </Box>
    );
  };

  if ( questionIndex >= questions.length){
    return <p>Score: {score}</p>
  }
  


  return (
    <Box sx={{ width:'100%'  }}>
      <Box sx={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
        <RemainingLives />
      </Box>
      <Box sx={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}>
        {
          questions.length > 0 ? <Question {...questions[questionIndex]} /> : <p>Loading...</p>
        } 
      </Box>
    </Box>
  )
}
