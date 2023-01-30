import * as React from 'react'
import { Typography, Container } from '@mui/material'

export default function About() { 
    return (
        <Container
            sx={{ 
                display: 'flex',
                flexDirection: 'column',
                textAlign: { xs: 'center', md: 'left' },
                gap: '1rem',
                paddingTop: '1rem'
            }}
        >
            <Typography fontWeight={700} fontSize={{ xs:'24px', md:'48px' }}>
                ¡Bienvenidos a preguntame derecho!
            </Typography>
            <Typography fontWeight={400} variant="body1">
                 Estamos emocionados de tenerte aquí con nosotros. Nuestro proyecto nació con la misión de llevar la educación sobre derechos humanos a cualquier persona con interés sobre el tema. Con ejemplos cotidianos y una experiencia divertida, queremos acercar las herramientas necesarias para proteger sus derechos y generar una mejor convicencia entre personas de nuestra sociedad.
            </Typography>
            <Typography
                fontWeight={700}
            >
                ¡Gracias por formar parte de esta aventura!
            </Typography>
        </Container>
    )
}