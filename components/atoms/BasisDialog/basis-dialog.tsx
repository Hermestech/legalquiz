import * as React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'

type BasisDialogProps = {
    selectedAnswer: string
    questionTitle: string
    questionLink: string
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function BasisDialog({ selectedAnswer, questionTitle, questionLink }: BasisDialogProps) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => { 
        setOpen(true);
    }
    
    const handleClose = () => { 
        setOpen(false);
    }

    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                ver
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {questionTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {selectedAnswer}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={handleClose}>
                        <a href={questionLink}>Ir al artículo</a>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}