import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { GlobalContext } from "../../Context/context";
import { Loginhandler } from '../../services/services';
import { useNavigate } from 'react-router';
import axios from 'axios'

const theme = createTheme();

export default function Login() {

  let { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setverify] = useState(false)
  const user = state.user

  useEffect(() => {

    if (user) {
      navigate("/Dashboard")
    }
  }, [navigate, user])


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("enter Email")
      return
    }
    if (!password) {
      toast.error("enter Password")
      return
    }

    const response = await Loginhandler({
      email,
      password
    })
    if (response.status === 200) {
      dispatch({ type: "USER_LOGIN", payload: response.data.profile })
      navigate("/Dashboard")
    }
    if (response.response.status === 402) {
      console.log("aaa🚗🚗🚗🚗🚗")
      setverify(true)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >{verify ? <p style={{ width: "56vw" }}>Your Email is not Varifed,<button onClick={async () => {

          try {
            let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ResendOtp`,{
              email : email
            }
            )
            console.log(response, "response");
          }
          catch (e) {
            console.log(e, "Error");
          }
        }}>Click here</button>  to Resend Verifiction Email</p> : <></>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}   >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}