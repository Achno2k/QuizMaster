import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const theme = createTheme();

function Login() {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([]);
    const [formData, setFormData] = useState({ enroll: "", password: "" });
    const signIn = useSignIn();

    const doLogin = async (e) => {
        e.preventDefault();
        if (!formData.enroll || !formData.password) {
            setErrorMessages(["Both fields are required"]);
            return;
        }
        try {
            const response = await axios.post("https://quizmaster-beryl.vercel.app//users/login", formData);
            if (response.status === 200) {
                localStorage.setItem("enroll", response.data.user.enroll);
                if (signIn({
                    auth: {
                        token: response.data.access_token,
                        type: "Bearer",
                    },
                    userState: response.data.user.firstname
                })) {
                    navigate('/main');
                }
            } else {
                setErrorMessages(["Error in response data"]);
            }
        } catch (err) {
            if (err.response && err.response.data.detail) {
                const errorDetail = err.response.data.detail;
                const formattedErrorMessages = Array.isArray(errorDetail)
                    ? errorDetail.map(err => err.msg)
                    : [errorDetail];
                setErrorMessages(formattedErrorMessages);
            } else {
                setErrorMessages(['An error occurred. Please try again later.'])
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={doLogin}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="enroll"
                            label="Enrollment Number"
                            value={formData.enroll}
                            onChange={handleInputChange}
                            name="enroll"
                            autoComplete="enroll"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                    {errorMessages.length > 0 && (
                        <Box mt={2}>
                            {errorMessages.map((message, index) => (
                                <Typography key={index} color="error" variant="body2">{message}</Typography>
                            ))}
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                        <Typography variant="h6" component="h2">
                            Don't have an account?
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => navigate("/signup")}
                            sx={{ ml: 1.5 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
