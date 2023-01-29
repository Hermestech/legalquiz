import * as React from 'react';
import {
    Button, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, 
    Slide, 
    styled,
    Paper,
    Typography,
    Box} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Grid from '@mui/material/Unstable_Grid2/';
import { Quiz, CheckBox, Close, Gavel } from '@mui/icons-material';

interface AlertDialogSlideProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInstructionsReaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
    open,
    setOpen,
    setInstructionsReaded
}: AlertDialogSlideProps) {

  const handleClose = () => {
    setOpen(false);
    setInstructionsReaded(true)
    localStorage.setItem('instructionsReaded', 'true')
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Estas son las instrucciones para jugar."}</DialogTitle>
        <DialogContent>

          <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={4}>
                    <Item>
                        <Quiz sx={{ fontSize: 100 }} />
                        <Typography variant="body1">
                            {`Te Preguntaremos sobre derechos humanos. Escoge la respuesta que consideres correcta.`}
                        </Typography>
                    </Item>
                    </Grid>
                    <Grid xs={12} md={4}>
                    <Item>
                        <CheckBox sx={{ fontSize: 100 }} />
                        <Close sx={{ fontSize: 100 }} />
                        <Typography variant="body1">
                            {`Si escoges correctamente, ganarás puntos. Si contestas incorrectamente, perderás una de tus tres vidas.`}
                        </Typography>
                    </Item>
                    </Grid>
                    <Grid xs={12} md={4}>
                    <Item>
                        <Gavel sx={{ fontSize: 100 }} />
                        <Typography variant="body1">
                            {`Si pierdes todas tus vidas, el juego termina.`}
                        </Typography>
                    </Item>
                    </Grid>
                </Grid>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button 
            onClick={handleClose} 
            endIcon={<Gavel />}
            variant="outlined"
            >
              A Jugar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));