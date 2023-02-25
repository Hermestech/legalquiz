import * as React from "react";
import { Button, Card, Container,  CardContent, CardActionArea,Divider, Box } from "@mui/material"
import Router from "next/router";
import { DialogueBox } from "../../atoms/DialogueBox/DialogueBox";
import Image from "next/image";


type QuestionariesLayoutProps = {
    questionaries : QuestionaryType[];
}

export default function QuestionariesLayout({ questionaries }: QuestionariesLayoutProps) {


    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {   
                questionaries.map((questionary) => (
                    <Box
                        onClick={() => { Router.push(`/${questionary.sys.id}`) }}
                        sx={{
                            width: '70%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                            marginTop: { xs: '1rem' },
                        }}
                        key={questionary.sys.id}
                    >
                        <Card>
                        <CardContent>
                            <DialogueBox questionaryText={questionary.description} />
                        </CardContent>
                        <Divider />
                        <CardActionArea
                            sx={{
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                }}
                        >
                            Iniciar Juego...
                        </CardActionArea>   
                        
                        </Card>

                        <Box
                            sx={{
                                width: '100%',
                                height: '150px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                src={'/lawyer-logo.png'}
                                alt="Picture of the author"
                                width={150}
                                height={150}
                            />
                        </Box>
                    </Box>
                ))
            }

        </Container>


    )
}