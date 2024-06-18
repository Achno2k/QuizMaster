import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const signOut = useSignOut();

    const handleLogout = () => {
        signOut();
        navigate('/');
    };

    const renderButtons = () => {
        switch (location.pathname) {
            case '/login':
                return (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </>
                );
            case '/signup':
                return (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </>
                );
            case '/main':
            case '/quiz':
                return (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                );
            default:
                return (
                    <>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </>
                );
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Cryptic Hunt
                    </Typography>
                    {renderButtons()}
                </Toolbar>
            </AppBar>
            <Container>
                <Box mt={4}>
                    <Outlet />
                </Box>
            </Container>
        </>
    );
};

export default Layout;
