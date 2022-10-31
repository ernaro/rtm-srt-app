import Grid from "@mui/material/Grid";
import LoginForm from "../components/LoginForm";
import MessageSnackbar from '../components/MessageSnackbar';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, error, handleError } = useAuth();

  const handleSubmit = credentials => login(credentials);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "30rem" }}
    >
      <Grid item sx={{ width: "20rem" }}>
        <LoginForm submitHandler={ handleSubmit } />
        <MessageSnackbar
          severity="error"
          message="Login fail"
          open={ error }
          onClose={ handleError }
        />
      </Grid>
    </Grid>
  );
}
