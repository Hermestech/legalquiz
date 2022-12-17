import * as React from 'react'

import { Card, CardContent, Typography, Box, Container, Button } from '@mui/material'

import { getQuestions } from '../lib/contentful/get-entries.graphql'

export default function Home() {
  const [questions, setQuestions] = React.useState<QuestionType[]>([])
  const [rightAnswer, setRightAnswer] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestions()
      setQuestions(response.items)
    }
    fetchQuestions()
  }, [])
  console.log(questions)
  

  const Answer = ({ answer }:any ) => {
    return <Button variant='outlined'  onClick={ () => {answer.isRightAnswer === true ? setRightAnswer(true) : setRightAnswer(false)}}>{answer.textAnswer}</Button>;
  };
  

  const Question:React.FC<QuestionType> = ({ question, answersCollection }) => {
    return (
      <>
        <Card sx={{ marginBottom:'1rem' }}>
          <CardContent>
            <Typography variant='h5' component='h2'>
           {question}
            </Typography>
           </CardContent>
        </Card>
        <Box sx={{ display:'flex', justifyContent:'center', flexDirection:'column', gap:'.5rem'}}>
        {answersCollection.items.map(answer => (
          <Answer key={answer.textAnswer} answer={answer} />
        ))}
        </Box>
      </>
    );
  };
  


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
        questions.map(question => (
          <div key={question.question}>
            <Question question={question.question} answersCollection={question.answersCollection} />
          </div>
        ))
      
      }
    </Box>    
    </Container>
  )
}
