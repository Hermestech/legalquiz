/* eslint-disable @next/next/no-html-link-for-pages */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAuth0 } from '@auth0/auth0-react';

export default function ButtonAppBar() {
  const { loginWithRedirect, logout, user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
          >
            menu
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {
            isAuthenticated ? (
              <>
                <Button color="inherit">{user?.name}</Button>
                <Button color="inherit" onClick={() => logout()}>Logout</Button>
              </>
            ) : (
                <Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>
              )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}