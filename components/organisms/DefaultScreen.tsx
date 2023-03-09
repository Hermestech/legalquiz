import * as React from 'react';
import { Box, Chip } from '@mui/material';
import { RemainingLives } from '../molecules/RemainingLives/RemainingLives';
import useAppContext from '../../contexts/AppContext';
import { MyLottie } from '../atoms/MyLottie/my-lottie';
import { Question } from '../molecules/Question/Question';
import AlertDialogSlide from '../atoms/AlertDialog/AlertDialog';

import { organismStyles } from './styles';

type FeedbackScreenProps = {
    open: boolean
    questions: QuestionType[]
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setInstructionsReaded: React.Dispatch<React.SetStateAction<boolean>>
}

type ScoreTableProps = {
  score: number
}

const ScoreTable = ({score}:ScoreTableProps ) => {
  return <Chip label={`${score} puntos`} />
}

export  function DefaultScreen ({
    open,
    questions,
    setOpen,
    setInstructionsReaded
}: FeedbackScreenProps) { 
    const { defaultScreen } = organismStyles 
    const { score, questionIndex } = useAppContext()

    return (
    <Box sx={defaultScreen.main}>
        <Box sx={defaultScreen.secondaryContainer}>
            <ScoreTable score={score} />
            <RemainingLives />
        </Box>
            <Box
                sx={defaultScreen.questionariesContainer}
            >
                {
                questions.length > 0 ? <Question {...questions[questionIndex]} /> : <MyLottie />
                } 
            </Box>
        <AlertDialogSlide 
            open={open} 
            setOpen={setOpen} 
            setInstructionsReaded={setInstructionsReaded}/>
    </Box>
    )
}