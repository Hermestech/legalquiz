import * as React from 'react'
import { Button } from '@mui/material'
import useAppContext from '../../../contexts/AppContext'


export const Answer = ({ answer, question }:any ) => {
    const { setRightAnswer, setScore, setLifes, setQuestionIndex, score, lifes, questionIndex, setSelectedAnswers, selectedAnswers } = useAppContext()
    
    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1)
    }

    const handleAnswer = (answer:AnswerType) => {
        if(answer.isRightAnswer) {
            setRightAnswer(true)
            setScore(score + 100)
        } else {
            setRightAnswer(false)
            setLifes(lifes - 1)
        }
        nextQuestion()
        setSelectedAnswers([...selectedAnswers, { question, answer }])
    }


    return <Button 
        variant='outlined' 
        style={{ width:'100%'}}
        onClick={ () => {handleAnswer(answer)}}>
          {answer.textAnswer}
      </Button>
    
}

