import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { data } from "../assets/utils";
import { Container, Box, Typography, Button, TextField, Paper } from '@mui/material';
import { CircularProgress, Alert, AlertTitle, LinearProgress } from '@mui/material';
import { updateScore } from "../assets/score_updater";

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[0]);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setQuestion(data[index]);
        setCorrectAnswer(false);
        setTimeLeft(600); // Reset timer for each question
    }, [index]);

    useEffect(() => {
        if (timeLeft === 0) {
            next();
        }
        const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const checkAnswer = () => {
        if (subjectiveAnswer.trim().toLowerCase() === question.ans.trim().toLowerCase()) {
            setScore(prev => prev + 1);
            setCorrectAnswer(true);
        } else {
            setCorrectAnswer(false);
        }
    };

    const next = () => {
        if (correctAnswer || timeLeft === 0) {
            if (index === data.length - 1) {
                setLoading(true);
                setResult(true);
                updateScore(score)
                    .then(() => {
                        setLoading(false);
                    })
            } else {
                setIndex(index + 1);
                setSubjectiveAnswer("");
            }
        }
    };

    const handleSubjectiveChange = (e) => {
        setSubjectiveAnswer(e.target.value);
    };

    const handleReturn = () => {
        navigate('/main');
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} p={3} component={Paper} elevation={3}>
                <Typography variant="h4" gutterBottom>
                    Quiz App
                </Typography>
                <hr />
                {result ? (
                    loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <CircularProgress />
                            <Typography variant="h6" gutterBottom>
                                Submitting your answers...
                            </Typography>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Alert severity="success" sx={{ fontSize: '1rem' }}>
                                <AlertTitle sx={{ fontSize: '1.5rem' }}>Success</AlertTitle>
                                Your Quiz has been successfully submitted.
                            </Alert>
                            <Button variant="outlined" onClick={handleReturn} sx={{ mt: 2, alignSelf: 'center' }}>
                                Return
                            </Button>
                        </Box>
                    )
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            {index + 1}. <span dangerouslySetInnerHTML={{ __html: question.question }} />
                        </Typography>
                        <Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={subjectiveAnswer}
                                onChange={handleSubjectiveChange}
                                placeholder="Type your answer here..."
                                margin="normal"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={checkAnswer}
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={next}
                            disabled={!correctAnswer && timeLeft > 0}
                            sx={{ mt: 2 }}
                        >
                            Next
                        </Button>
                        <Box mt={2}>
                            <Typography variant="body2" color="textSecondary">
                                {index + 1} of {data.length} questions
                            </Typography>
                            <LinearProgress variant="determinate" value={(index / data.length) * 100} sx={{ mt: 1 }} />
                        </Box>
                        <Box mt={2}>
                            <Typography variant="body2" color="textSecondary">
                                Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                            </Typography>
                            <CircularProgress variant="determinate" value={(timeLeft / 600) * 100} sx={{ mt: 1 }} />
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default Quiz;
