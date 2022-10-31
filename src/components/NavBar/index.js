import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth } from '../../context/AuthContext';
import UserAccount from '../UserAccount';

const NavBar = () => {
  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          RTM SRT
        </Typography>
        { !!user && <UserAccount onLogout={ handleLogout } user={ user } /> }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
