import * as React from "react";
import { Container, Paper } from "@mui/material"
import { QuestionaryCard } from "../../molecules/QuestionaryCard/QuestionaryCard";
import { DialogueBox } from "../../atoms/DialogueBox/DialogueBox";


type QuestionariesLayoutProps = {
    questionaries : QuestionaryType[];
}

const instructionsText = '¡Hola! bienvenido a pregunta derecho, Para comenzar a jugar, selecciona uno de los cuestionarios, para navegar entre cuestionarios, usa los botones de siguiente:⏭️ y anterior: ⏮️. Para iniciar el juego, usa el botón de play:▶ . ¡Buena suerte!'

export default function QuestionariesLayout({ questionaries }: QuestionariesLayoutProps) {
    const [currentQuestionaryIndex, setCurrentQuestionaryIndex] = React.useState(0);

    const handleNextQuestionary = () => { 
        if (currentQuestionaryIndex < questionaries.length - 1) {
            setCurrentQuestionaryIndex(currentQuestionaryIndex + 1);
        }
    }

    const handlePreviousQuestionary = () => { 
        if (currentQuestionaryIndex > 0) {
            setCurrentQuestionaryIndex(currentQuestionaryIndex - 1);
        }
    }

    const currentQuestionary = questionaries[currentQuestionaryIndex];

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1rem'
        }}>
            <Paper
                sx={{
                    width: {xs:'100%', md:'80%'},
                    minHeight: '80px',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '1rem',
                }}
            >
                <DialogueBox questionaryText={instructionsText} />
            </Paper>

            <QuestionaryCard
                questionary={currentQuestionary}
                onPreviousQuestionary={handlePreviousQuestionary}
                onNextQuestionary={handleNextQuestionary}
            />

        </Container>


    )
}