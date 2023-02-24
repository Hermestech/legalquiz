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

    //     <Grid container spacing={4}  sx={{width:'100%', height:'100%' }}>
    //         {questionaries.map((questionary) => (
    //             <Grid item xs={12} sm={6} md={4} key={questionary.sys.id}>
    //                 <Card
    //                     onClick={() => {Router.push(`/${questionary.sys.id}`)}}
    //                 >
    //                           <CardHeader
    //     avatar={
    //                             <Avatar
    //                             aria-label="recipe"
    //                             src={'/owl-lawyer.png'}
    //                             />
    //     }

    //   />
    //                     <CardContent>
    //                     <Typography variant="h5" component="h2">
    //                             {questionary.title}
    //                         </Typography>
    //                         <Typography variant="body2" color="text.secondary">
    //                             {questionary.description}
    //                         </Typography>
    //                     </CardContent>
    //                     <Divider />
    //                     <CardActionArea
    //                         sx={{ padding:'1rem' }}
    //                     >
    //                         <Typography variant="body2" color="text.secondary">
    //                             {questionary.difficulty}
    //                         </Typography>
    //                     </CardActionArea>
    //                 </Card>
    //             </Grid>
    //         ))}
    //     </Grid>