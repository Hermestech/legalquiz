import * as React from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { CupLottie } from "../atoms/MyLottie/cup-lottie";

import useAppContext from '../../contexts/AppContext';
import { organismStyles } from './styles';
import { useRouter } from 'next/router';
import { useAnalytics } from "../../contexts/Analytics";
import AnswersTable  from "../molecules/AnswersTable/answers-table";
import { useUser } from '@auth0/nextjs-auth0';

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";



export const FeedbackScreen = () => { 
    const { user } = useUser()
    const { feedbackScreen } = organismStyles
    const { analytics } = useAnalytics()  
    const { score,
    setScore,
    setQuestionIndex,
    setLifes,
    setSelectedAnswers,
   } = useAppContext()
    const router = useRouter()
  const [emailMarketingSaved, setEmailMarketingSaved] = React.useState(false)
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [showAnswers, setShowAnswers] = React.useState(true)


    const handleSaveEmail = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    const email = e.currentTarget.email.value
    console.log(email)
    fetch('/api/emailmarketing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(response => {
        if (response.ok) {
          setEmailMarketingSaved(true)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
    return (
          <Box sx={feedbackScreen.main}>
            <CupLottie />
            <Typography variant="h2" component="h2">{score}</Typography>
            <Button 
            variant="outlined"
              onClick={() => {
                setQuestionIndex(0),
                setScore(0),
                setLifes(3),
                setSelectedAnswers([]),
                analytics.track('playAgain'),  
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
              router.push('/game')
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
              !user && (
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
            <Box component={'form'}
              onSubmit={handleSaveEmail}
              sx={{
                display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', width: '100%',
                textAlign: 'center'
              }}
            >
              {
                !emailMarketingSaved ? (
                  <>
               <Typography variant="body2" component="h4">Ingresa tu correo para notificarte cuando tengamos nuevas preguntas.</Typography>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                required
              />
              
              <Button variant="outlined" type="submit">Enviar</Button>
                  </>
                ) :
                  <>
                  <Typography>Gracias por suscribirte, te avisaremos cuando haya nuevas preguntas.</Typography>
                  </>
              }
          </Box>
              <Typography>Compartir resultado</Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
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