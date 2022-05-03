import * as React from 'react';
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
import {useForm, Controller} from "react-hook-form";
import agent from "../Data/agent";
import {Alert, AlertTitle} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../store/Slices/userSlice";


const theme = createTheme();

export default function LoginPage() {
    const {isAuthenticated} = useSelector(state => state.user)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const { handleSubmit, control } = useForm();
    const [isAuthorized, setIsAuthorized] = useState(true);

    const onSubmit = async data => {
        try{
            const result = await agent.account.login(data);
            dispatch(setUser(JSON.parse(localStorage.getItem('user')) || null))
            navigate('/');
            window.location.reload();
        }
        catch{
            setIsAuthorized( false);
        }
    };
    
    return (
       
            <Container component="main" maxWidth="xs" sx={{backgroundColor: "#eeedde", borderRadius: '10px', height: '500px'}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        paddingTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#eeedde' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {
                        !isAuthorized ? (
                            <Alert severity="error">
                                <AlertTitle>Unauthorized</AlertTitle>
                            </Alert>
                        ) : ''
                    }
                    
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: 'Username required' }}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: 'Password required' }}
                        />
                        
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={() => navigate("/register")} variant="body2" sx={{'&:hover': {cursor: 'pointer'} }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
      
    );
}
