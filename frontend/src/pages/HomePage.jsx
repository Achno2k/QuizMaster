import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Homepage() {
  const navigate = useNavigate();
  const onClickSignUp = (e) => {
    navigate('/signup');
  }

  return (
    <div>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: "Black" }}>
          Welcome to Cryptic Hunt
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ color: "Black" }}>
          Join the ultimate cryptic treasure hunt and solve puzzles to find the hidden treasures.
        </Typography>
        <Button variant="contained" size="large" color="secondary" sx={{ mt: 3, p: 1.5 }} onClick={onClickSignUp}>
          Sign Up for Free
        </Button>
      </Box>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  What is Cryptic Hunt?
                </Typography>
                <Typography variant="body1" component="p">
                  Cryptic Hunt is an engaging and challenging treasure hunt game where you solve puzzles to find hidden treasures. Test your skills and compete with others!
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" color="primary" variant="outlined">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Get Started
                </Typography>
                <Typography variant="body1" component="p">
                  Sign up today and start your adventure. Explore, solve, and win exciting prizes. Are you ready for the challenge?
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" color="primary" onClick={onClickSignUp} variant="outlined">
                  Sign Up Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          mt: 5,
          py: 3,
          backgroundColor: '#f5f5f5',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Aman Singh. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}

export default Homepage;
