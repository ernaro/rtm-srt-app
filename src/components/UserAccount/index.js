import { useState } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';


const UserAccount = ({ onLogout, user }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const redirectToUserPage = () => {
    setAnchorEl(null);
    router.push(`/users/${ user.username }`);
  }

  return (
    <Box>
      <Tooltip title={ `Current user: ${ user.username }` }>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={ handleMenu }
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={ anchorEl }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
      >
        <MenuItem onClick={ redirectToUserPage }>User Profile</MenuItem>
        <MenuItem onClick={ onLogout }>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default UserAccount;