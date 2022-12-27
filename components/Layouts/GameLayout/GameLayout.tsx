import * as React from "react";
import { Question } from "../../molecules/Question/Question";
import useAppContext from "../../../contexts/AppContext";

import { Box } from "@mui/material";

interface GameLayoutProps {
  questions: QuestionType[];
}

export default function GameLayout({ questions }: GameLayoutProps) {

const {  questionIndex, score, lifes } = useAppContext()

const RemainingLives = () => {
    return (
        <Box sx={{ display:'flex', justifyContent:'center', gap:'.5rem', backgroundColor:'rgba(0.5, 0.5, 0.5 , 0.4)' }}>
            {Array(lifes).fill(0).map((_, index) => (<span key={index}>❤️</span>))}
        </Box>
    )
}

    if ( questionIndex >= questions.length){
        return <p>Score: {score}</p>
    }

    return (
    <Box sx={{ width:'100%', height:'100%', justifySelf:'center', alignSelf:'center', display:'flex', flexDirection:'column', gap:'1rem'  }}>
      <Box sx={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
        <RemainingLives />
      </Box>
      <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}>
        {
          questions.length > 0 ? <Question {...questions[questionIndex]} /> : <p>Loading...</p>
        } 
      </Box>
    </Box>
  )



}