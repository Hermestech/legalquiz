import * as React from "react";
import { Avatar, Card, Container, Grid, Typography, CardContent, CardActionArea,Divider, CardHeader } from "@mui/material"
import Router from "next/router";


type QuestionariesLayoutProps = {
    questionaries : QuestionaryType[];
}

export default function QuestionariesLayout({ questionaries }: QuestionariesLayoutProps) {
    console.log(questionaries)
    
    return (
        <Container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
        <Grid container spacing={4}  sx={{width:'100%', height:'100%' }}>
            {questionaries.map((questionary) => (
                <Grid item xs={12} sm={6} md={4} key={questionary.sys.id}>
                    <Card
                        onClick={() => {Router.push(`/${questionary.sys.id}`)}}
                    >
                              <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>
        }
        title={questionary.title}
        subheader={questionary.description}
      />
                        <CardContent>
                        <Typography variant="h5" component="h2">
                                {questionary.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {questionary.description}
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActionArea
                            sx={{ padding:'1rem' }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                {questionary.difficulty}
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </Container>


    )
}