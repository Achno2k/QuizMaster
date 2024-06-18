import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    enroll: "",
    password: ""
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/users/signup", {
        ...formData,
        enroll: parseInt(formData.enroll, 10)
      });
      setResponseMessage(response.data.message);
      setErrorMessages([]);
      setSuccessMessage("Account successfully created. Please login to continue.");

      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 3 seconds
      }, 2500);
    } catch (error) {
      if (error.response && error.response.data.detail) {
        const errorDetail = error.response.data.detail;
        const formattedErrorMessages = Array.isArray(errorDetail)
          ? errorDetail.map(err => err.msg)
          : [errorDetail];
        setErrorMessages(formattedErrorMessages);
      } else {
        setErrorMessages(['An error occurred. Please try again.']);
      }
      setResponseMessage('');
      setSuccessMessage('');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="given-name"
            autoFocus
            value={formData.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="family-name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="enroll"
            label="Enrollment Number"
            name="enroll"
            autoComplete="enroll"
            value={formData.enroll}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          {responseMessage && <Typography color="primary" variant="h6">{responseMessage}</Typography>}
          {successMessage && <Typography color="primary" variant="h6">{successMessage}</Typography>}
          {errorMessages.length > 0 && (
            <Box mt={2}>
              {errorMessages.map((message, index) => (
                <Typography key={index} color="error" variant="body2">{message}</Typography>
              ))}
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box display="flex" alignItems="center" sx={{ mt: 1, pl: 3 }}>
            <Typography variant="h6" component="h2">
              Already have an account?
            </Typography>
            <Button
              variant="outlined"
              sx={{ ml: 3 }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
