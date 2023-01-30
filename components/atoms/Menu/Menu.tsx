import * as React from 'react';
import IconButton from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

//Icons
import MenuIcon from '@mui/icons-material/Menu';

//hooks
import { useUser } from '@auth0/nextjs-auth0';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useUser();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSessionButtons = () => {
    if (user ) {
      return (
          <MenuItem onClick={handleClose}>
            <a href="/api/auth/logout">
              Cerrar sesión
            </a>
          </MenuItem>
      )
    } else {
      return (
        <MenuItem onClick={handleClose}>
          <a href="/api/auth/login">
            Iniciar sesión
          </a>
        </MenuItem>
      )
    }
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
            <Link href="/about">
                Sobre Nosotros
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link href="/">
                Inicio
            </Link>
        </MenuItem>
        {handleSessionButtons()}
      </Menu>
    </div>
  );
}