import * as React from 'react'
import { Container  } from '@mui/material'
import ButtonAppBar from '../atoms/ButtonAppBar/ButtonAppBar'


export default function Layout ({ children }: React.PropsWithChildren<object>) {
  return (
    <>
    <ButtonAppBar/>
    <Container sx={{ display:'flex', minHeight:'80vh' }}>
      {children}
      </Container>
    </>
  )
}