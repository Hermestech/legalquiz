import * as React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material'
import  CheckIcon  from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { BasisDialog } from '../../atoms/BasisDialog/basis-dialog'

import useAppContext from '../../../contexts/AppContext'

export default function AnswersTable() {
    const { selectedAnswers } = useAppContext()
    
    return (
        <TableContainer sx={{ marginBottom: {xs:'1rem', md: '5rem'} }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle1' fontWeight={'bold'}>Pregunta</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant='subtitle1' fontWeight={'bold'}>Tu Respuesta</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant='subtitle1' fontWeight={'bold'}>
                                Base
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {selectedAnswers.map((answer) => (
                        <TableRow
                            key={answer.question}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >   
                            <TableCell component="th" scope="row">
                                {answer.question}
                            </TableCell>
                            <TableCell align="right">
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '.5rem'
                                }}>
                                 {answer.answer.textAnswer}
                                {answer.answer.isRightAnswer ? <CheckIcon style={{ color: '#21BA45' }} /> : <CloseIcon style={{ color: '#DA2828' }} />}
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <BasisDialog
                                    questionTitle={answer.question}
                                    selectedAnswer={answer.rightAnswerBase.reasoning}
                                    questionLink={answer.rightAnswerBase.link}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
                        
}