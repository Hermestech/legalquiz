import * as React from 'react'
import { Box, Container,  } from '@mui/material'
import ButtonAppBar from './ButtonAppBar'

export default function Layout ({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
    <ButtonAppBar/>
    <Container sx={{ display:'flex', minHeight:'80vh' }}>
      {children}
    </Container>
    </>
  )
}