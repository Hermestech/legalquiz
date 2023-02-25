import * as React from 'react'
import Head from 'next/head'
import { Grid, Box, Typography, Button, Container } from '@mui/material'
import Image from 'next/image'
import { useDeviceSize } from '../hooks/useDeviceSize'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export default function Landing() {
    const  [width]  = useDeviceSize()
    const isDesktop = width > 768
    
    return (
        <Container>
        <div>
        <Head>
            <title>Pregúntame derecho</title>
            <meta property="og:title" content="Pregúntame derecho" key="title" />
        </Head>
        <Head>
            <meta property="og:title" content="Pregúntame derecho" key="title" />
        </Head>
        </div>
            <Grid container sx={{  marginTop:'2rem' }}>
                <Grid item xs={12} md={6} sx={{paddingRight:'1rem', textAlign: {xs:'center', md:'left'}}}>
                    <Typography variant={ isDesktop ? 'h2' : 'h3' }>JUEGA</Typography>
                    <Typography variant={ isDesktop ? 'h2' : 'h3' }>APRENDE</Typography>
                    <Typography variant={ isDesktop ? 'h2' : 'h3' }>DEFIENDETE</Typography>
                     <Typography variant='body1'>
                        {
                            isDesktop ? ( 'Pregúntame Derecho" es una plataforma de juegos tipo trivia diseñada para poner a prueba tus conocimientos en el área del derecho. Con una colección de aplicaciones y juegos, esta plataforma es ideal para estudiantes y aficionados que deseen aprender derecho de forma entretenida. En "Pregúntame Derecho" nos enfocamos en hacer que el derecho sea más accesible y divertido para todos, y para ello contamos con la ayuda de nuestra mascota, un gato abogado 🐈. ¡Únete a nuestra comunidad y diviértete mientras aprendes!')
                                : (
                                    'Pregúntame Derecho" es una plataforma de juegos tipo trivia diseñada para poner a prueba tus conocimientos en el área del derecho.'
                                ) 
                            }
                    </Typography>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-end'},
                        paddingRight:'1rem'
                    }}>
                        <Link href='/game'>
                            <Button variant='contained' sx={{ marginTop: '1rem', width: { xs: '300px', md: '200px' } }}>
                                Ir al Juego
                            </Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    marginTop: { xs: '2rem', md: 0 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        src='/owl-lawyer.png'
                        width={isDesktop ? 500 : 300}
                        height={isDesktop ? 500 : 300}
                        alt='gato abogado'
                        priority={true}
                    />
                </Grid>
            </Grid>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginTop: '2rem',
                backgroundColor: '#F2F5F7',
                textAlign: {xs:'center', md:'left'}
            }}>
                <Typography variant='h3'>CONSTRUIDO PARA TI</Typography>
                <Typography variant='body1'>
                    {'Pregunta Derecho" es una plataforma de aprendizaje donde podrás adquirir conocimientos fundamentales sobre tus derechos cotidianos y prepararte para exámenes en la materia. A través de nuestra experiencia educativa, te brindamos herramientas para que puedas desenvolverte con confianza en situaciones legales y comprendas tus derechos de forma clara y accesible. ¡Únete a nosotros y fortalece tus habilidades en Derecho!'  
                    }
                </Typography>
                <ReactPlayer
                    url='/video.MP4'
                    controls
                    playsinline
                    width={isDesktop ? 500 : 300}
                    height={isDesktop ? 500 : 300}
                />
            </Box>
            <Grid container sx={{ marginTop: '2rem', gap:{xs:'2rem',md:'0'}}}>
                <Grid item xs={12} md={4} sx={{ paddingRight: '1rem', textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: {xs:'center', md:'flex-start'} }}>
                        <Typography variant='h5'>{'Ruben'}</Typography>
                    </Box>
                    <Typography variant='body1'>
                        {'Me gusta mucho la plataforma, es muy divertida y fácil de usar. Además, me ha ayudado mucho a aprender sobre los derechos de las personas. ¡Gracias por crearla!'}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ paddingRight: '1rem', textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: {xs:'center', md:'flex-start'} }}>
                        <Typography variant='h5'>{'Valeria'}</Typography>
                    </Box>
                    <Typography variant='body1'>
                        {'Me gustan mucho las animaciones y el concepto de las preguntas. Creo que todos deberíamos usarla para aprender un poco más sobre derecho como ciudadanos.'}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} sx={{ paddingRight: '1rem', textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: {xs:'center', md:'flex-start'} }}>
                        <Typography variant='h5'>{'Enrique'}</Typography>
                    </Box>
                    <Typography variant='body1'>
                        {'No había visto algo así antes, me parece muy interesante y divertido. Me gustaría que hubiera más preguntas y niveles para aprender, creo que hace falta mucha difusión juridica en México.'}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}