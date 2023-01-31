import * as React from 'react'
import { Button } from '@mui/material'
import useAppContext from '../../../contexts/AppContext'
import useSound from 'use-sound'

export const Answer = ({ answer, question }: SelectedAnswerType ) => {
    const { setRightAnswer, setScore, setLifes, setQuestionIndex, score, lifes, questionIndex, setSelectedAnswers, selectedAnswers } = useAppContext()
    
    const nextQuestion = () => {
        setQuestionIndex(questionIndex + 1)
    }

    const [playActive] = useSound('/sounds/right.wav', { volume: 0.25 })
    const [playError] = useSound('/sounds/wrong.mp3', { volume: 0.25 })

    const handleAnswer = (answer:AnswerType) => {
        if(answer.isRightAnswer) {
            playActive()
            setRightAnswer(true)
            setScore(score + 100)
        } else {
            playError()
            setRightAnswer(false)
            setLifes(lifes - 1)
        }
        nextQuestion()
        setSelectedAnswers([...selectedAnswers, { question, answer }])
    }


    return <Button 
        variant='outlined' 
        style={{
            width: '100%',
            height: '100%',
        }}
        onClick={ () => {handleAnswer(answer)}}>
          {answer.textAnswer}
      </Button>
    
}

