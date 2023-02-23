import * as React from "react";
import { Question } from "../../molecules/Question/Question";
import AlertDialogSlide from "../../atoms/AlertDialog/AlertDialog";
import  AnswersTable  from "../../molecules/AnswersTable/answers-table";
import useAppContext from "../../../contexts/AppContext";

import { Box, Chip, Typography, Button, Rating } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from "@mui/material/styles";
import { CupLottie } from "../../atoms/MyLottie/cup-lottie";
import { MyLottie } from "../../atoms/MyLottie/my-lottie";

import { useRouter } from "next/router";
import { useUser } from "../../../contexts/UserContext";
import useSound from "use-sound";
import { useAnalytics } from "../../../contexts/Analytics";

import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton } from "react-share";


interface GameLayoutProps {
  questions: QuestionType[];
}

type ScoreTableProps = {
  score: number
}

const ScoreTable = ({score}:ScoreTableProps ) => {
  return <Chip label={`${score} puntos`} />
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});


export default function GameLayout({ questions }: GameLayoutProps) {
const router = useRouter()
const {  questionIndex, score, lifes, setQuestionIndex, setScore, setLifes, setSelectedAnswers, selectedAnswers } = useAppContext()
const [open, setOpen] = React.useState(false);
const [instructionsReaded, setInstructionsReaded] = React.useState(false)
const [showAnswers, setShowAnswers] = React.useState(true)
const [hasSubmitted, setHasSubmitted] = React.useState(false)
const { analytics } = useAnalytics()  
const endOfQuestions = questionIndex >= questions.length -1   
const gameOver = questionIndex >= questions.length && questions.length > 0
  
  const user = useUser() 
  const userWins = score > 0 
  const userLose = score === 0 || lifes === 0
  
  const [play] = useSound('/sounds/success-finish.wav', { volume: 0.25 });
  const [playError] = useSound('/sounds/lose.wav', { volume: 0.25 });

const authenticatedUser = user && user.email

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
    if (gameOver && userWins) {
      play()
    } 
    if (gameOver && userLose) { 
      playError()
    }

    if (authenticatedUser && endOfQuestions && selectedAnswers.length >= 3 && hasSubmitted === false) { 
    const questionary = {
      postedAt: Date.now(),
      body: {
        score,
        selectedAnswers
      },
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email || '',
        picture: user.picture || ''
      }
  } 
    fetch('/api/questionary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionary)
    })
    .then(response => {
      if (response.ok) {
        setHasSubmitted(true);
      }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
   }, [selectedAnswers, user, endOfQuestions, score, hasSubmitted])

const RemainingLives = () => {
    return (
      <StyledRating
        name="customized-color"
        defaultValue={lifes}
        getLabelText={(lifes: number) => `${lifes} Heart${lifes !== 1 ? 's' : ''}`}
        precision={1}
        max={lifes}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    )
}

if ( questionIndex >= questions.length && questions.length > 0  || lifes === 0) {
        return (
          <Box sx={{ width:'100%', height:'100%', justifySelf:'center', alignSelf:'center', display:'flex', flexDirection:'column', gap:'1rem', justifyContent:'center', alignItems:'center'  }}>
            <CupLottie />
            <Typography variant="h2" component="h2">{score}</Typography>
            <Button 
            variant="outlined"
              onClick={() => {
                setQuestionIndex(0),
                setScore(0),
                setLifes(3),
                setSelectedAnswers([]),
                analytics.track('playAgain', { score, lifes }),  
                setHasSubmitted(false)  
                
              }}
            >Jugar de nuevo</Button>
            <Button 
            variant="outlined"
            onClick={() => {
              setQuestionIndex(0), 
              setScore(0), 
              setLifes(3),
              setSelectedAnswers([]),
              setHasSubmitted(false),  
              analytics.track('chooseOtherQuestionary')  
              router.push('/')
            }}
            >Elegir otro cuestionario</Button>
            <Button
              variant="outlined"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {
                showAnswers ? 'Ocultar respuestas' : 'Mostrar respuestas'
              }
            </Button>
            {
              !authenticatedUser && (
                <Button
                  onClick={() => {
                    analytics.track('login from result')
                   }}
              variant="outlined">
                <a href="/api/auth/login">
                  ¿Guardar los puntos? Registrate. 
                </a>
              </Button>
              )
            }
            <Box sx={{display:'flex', gap:'1rem'}}>
              <TwitterShareButton
                url="https://www.preguntaderecho.com/"
              
                title={`Hice ${score} puntos en pregunta derecho. Y tú... ¿Cuánto sabes de derechos humanos?`}
                via="pregunta_d"
                hashtags={['PreguntaDerecho']}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <FacebookShareButton
                url="https://www.preguntaderecho.com/"
                quote={`Hice ${score} puntos en pregunta derecho. Y tú... ¿Cuánto sabes de derechos humanos?`}
                hashtag="#PreguntaDerecho"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <WhatsappShareButton
                url="https://www.preguntaderecho.com/"
                title={`Hice ${score} puntos en pregunta derecho. Y tú... ¿Cuánto sabes de derechos humanos?`}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

            </Box>
            {
              showAnswers && <AnswersTable />
            }
          </Box>
        )
    }

  return (
    <Box sx={{ width:'100%', 
     height:'50%', 
     justifySelf:'center',
     alignSelf:'center',
     display:'flex',
     flexDirection:'column',
     gap:'1rem',
     justifyContent:'center',
     alignItems: 'center'
      }}>
      <Box sx={{width:{xs:'100%', md:'60%' }, display:'flex', justifyContent:'space-between'}}>
        <ScoreTable score={score} />
        <RemainingLives />
      </Box>
      <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center' }}>
        {
          questions.length > 0 ? <Question {...questions[questionIndex]} /> : <MyLottie />
        } 
      </Box>
      <AlertDialogSlide 
        open={open} 
        setOpen={setOpen} 
        setInstructionsReaded={setInstructionsReaded}
        />
    </Box>
  )
}