import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { axiosFetcher, changeUserPassword } from '../../service/apiService';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import Link from '../../components/Link';
import UserForm from '../../components/UserForm';
import { useAuth } from '../../context/AuthContext';
import MessageSnackbar from '../../components/MessageSnackbar';


export default function EditUser() {
  const { logout } = useAuth();
  const router = useRouter();
  const username = router.query.userId;
  const { data: user, error } = useSWR(`/users?name=${username}`, axiosFetcher);
  const [formActive, setFormActive] = useState(false);
  const [showSnack, setShowSnack] = useState(false);

  const showForm = () => setFormActive(!formActive);

  const handleSnackClose = () => setShowSnack(false);

  const handleSubmit = (passwords) => {
    changeUserPassword(user.id, passwords)
      .then(() => logout())
      .catch(() => setShowSnack(true))
  }

  if (error) return <Error message="Failed to load data!"/>;
  if (!user) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1, mt: 2 }}>
      <Typography sx={{ ml: 2 }} variant="button">User profile</Typography>
      <Grid container gap={ 2 }>
        <Grid item>
          <Paper sx={{ p: 2, maxWidth: "16rem" }}>
            <Typography>Username: { user.username }</Typography>
            <Typography>Access: { user.roles.startsWith("ROLE_ADMIN") ? "Full" : "Restricted" }</Typography>
            <Typography>Active: { user.active.toString() }</Typography>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              size="small"
              color="warning"
              variant="outlined"
              onClick={ showForm }
            >
              Edit password
            </Button>
            <Button
              sx={{ mt: 2 }}
              fullWidth
              size="small"
              color="success"
              variant="outlined"
              component={ Link }
              href="/"
            >
              Go to channels
            </Button>
          </Paper>
        </Grid>
        <Grid item>
          { formActive && <UserForm submitHandler={ handleSubmit } /> }
        </Grid>
        <MessageSnackbar
          message="Can't change password"
          severity="error"
          open={ showSnack }
          onClose={ handleSnackClose }
        />
      </Grid>
    </Container>
  )
}