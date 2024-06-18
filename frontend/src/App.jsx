import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import ErrorPage from './components/ErrorPage';
import Quiz from './pages/Quiz';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/theme';
import { ErrorBoundary } from "react-error-boundary";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Layout from './components/Layout';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AuthOutlet fallbackPath='/login' />}>
              <Route path='/main' element={<MainPage />} />
              <Route path='/quiz' element={<Quiz />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
