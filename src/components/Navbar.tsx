"use client"; // Make this a client component

import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface MenuNavigationProps {
  session: Session | null; // Accept session as a prop
}

export default function MenuNavigation({ session }: MenuNavigationProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    handleMenuClose();
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    handleMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
      <IconButton
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* Home option available to all users */}
        <MenuItem onClick={() => handleNavigation('/')}>
          <HomeIcon sx={{ mr: 1 }} /> Home
        </MenuItem>

        {/* Conditional options based on authentication status */}
        {session ? (
          <>
            <MenuItem onClick={handleSignOut}>
              <LogoutIcon sx={{ mr: 1 }} /> Sign Out
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => handleNavigation('/auth/prihlasenie')}>
              <LoginIcon sx={{ mr: 1 }} /> Sign In
            </MenuItem>
            <MenuItem onClick={() => handleNavigation('/auth/registracia')}>
              <HowToRegIcon sx={{ mr: 1 }} /> Register
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
