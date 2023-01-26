import * as React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material'
import  CheckIcon  from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import useAppContext from '../../../contexts/AppContext'

export default function AnswersTable() {
    const { selectedAnswers } = useAppContext()
    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant='subtitle1' fontWeight={'bold'}>Pregunta</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant='subtitle1' fontWeight={'bold'}>Tu Respuesta</Typography>
                        </TableCell>
                        <TableCell align="right">
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
                            <TableCell align="right">{answer.answer.textAnswer}</TableCell>
                            <TableCell align="right">{answer.answer.isRightAnswer ? <CheckIcon style={{ color: '#21BA45'}} /> : <CloseIcon style={{ color: '#DA2828' }}/>}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
                        
}