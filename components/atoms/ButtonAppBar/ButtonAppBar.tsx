import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';

export default function ButtonAppBar() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => { 
                router.push('/')
            }}
          >
            <Image src="/lawyer-logo.png"
              alt="logo de un gatito abogado"
              width={40}
              height={40}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={'/about'}>
              Sobre el proyecto
            </Link>
          </Typography>
          
          {
            user ? (
              <>
                <Button color="inherit">
                    {user.name}
                </Button>
                <Button color="inherit">
                  <a href="/api/auth/logout">
                    Logout
                  </a>
                </Button>
              </>
            ) : (
                <Button color="inherit">
                  <a href="/api/auth/login">
                    Login
                  </a>
                </Button>
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}