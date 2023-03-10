import * as React from "react";
import useAppContext from "../../../contexts/AppContext";
import {DefaultScreen}  from "../../organisms/DefaultScreen";
import useSound from "use-sound";
import { useUser } from "@auth0/nextjs-auth0";
import { FeedbackScreen } from "../../organisms/FeedbackScreen";
import { proyectUrls } from "../../../utils/constants";
import { ApiService } from "../../../utils/ApiService";

interface GameLayoutProps {
  questions: QuestionType[];
  currentQuestionaryId: string;
}

export default function GameLayout({
  questions,
}: GameLayoutProps) {
const { user } = useUser()
const { questionIndex, score, lifes, selectedAnswers } = useAppContext()
const [open, setOpen] = React.useState(false);
const [instructionsReaded, setInstructionsReaded] = React.useState(false)
const endOfQuestions = questionIndex >= questions.length -1   
const gameOver = questionIndex >= questions.length && questions.length > 0
const userWins = score > 0 
const userLose = score === 0 || lifes === 0
const { score_url } = proyectUrls  
  
const [play] = useSound('/sounds/success-finish.wav', { volume: 0.25 });
const [playError] = useSound('/sounds/lose.wav', { volume: 0.25 });
    
React.useEffect(() => { 
  const instructionsReaded =localStorage.getItem('instructionsReaded') 
  if (instructionsReaded === 'true') {
    setInstructionsReaded(true)
  }
  if (questionIndex === 0 && !instructionsReaded) {
    setOpen(true)
  }
}, [questionIndex, instructionsReaded])
  
  React.useEffect(() => {
    if (gameOver || lifes === 0 && user) { 
      ApiService.post(score_url, {
        score
      })
    }
    if (gameOver && userWins) {
      play()
    } 
    if (gameOver && userLose) { 
      playError()
    } 
   }, [selectedAnswers, user, endOfQuestions, score])


if ( gameOver || lifes === 0 ) {
  return <FeedbackScreen/>
}

  return (
    <DefaultScreen
      open={open}
      setOpen={setOpen}
      setInstructionsReaded={setInstructionsReaded}
      questions={questions}
    />
  )
}