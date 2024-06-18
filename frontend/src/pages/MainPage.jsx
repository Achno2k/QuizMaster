import React from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Paper } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

export default function MainPage() {
    const navigate = useNavigate();
    const authData = useAuthUser();

    const handleStartQuiz = () => {
        navigate("/quiz");
    }

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome, {authData}!
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        Ready to test your knowledge?
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleStartQuiz}
                        startIcon={<QuizIcon />}
                        sx={{ mt: 3 }}
                    >
                        Start Quiz
                    </Button>
                </Paper>
            </Container>
        </>
    );
}
