import * as React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { Answer } from '../../atoms/Answer/Answer';

export const Question: React.FC<QuestionType> = ({ question, answersCollection, rightAnswerBase }) => {
    return (
      <Box sx={{
        width: {
          sx: '350px',
          md: '500px',
        }
      }}>
        <Card sx={{ marginBottom:'1rem' }}>
          <CardContent>
            <Typography variant='h6' component='h2'>
           {question}
            </Typography>
           </CardContent>
        </Card>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '.5rem',
          width: '100%',
          height: '50%'
        }}>
          
        {answersCollection.answers.map(answer => (
          <Answer
            key={answer.textAnswer}
            answer={answer}
            question={question}
            rightAnswerBase={rightAnswerBase}
          />
        ))}
        </Box>
      </Box>
    );
  };

