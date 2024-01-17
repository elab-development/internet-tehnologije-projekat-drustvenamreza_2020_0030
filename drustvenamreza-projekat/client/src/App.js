import { React, useMemo } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// pages
import Home from 'pages/home/Home';
import Login from 'pages/login/Login';
import Profile from 'pages/profile/Profile';
import Admin from './pages/admin/Admin';

// style
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isAdmin = useSelector((state) => state.user?.admin);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/home'
              element={isAuth ? <Home /> : <Navigate to='/' />}
            />
            <Route
              path='/profile/:userId'
              element={isAuth ? <Profile /> : <Navigate to='/' />}
            />
            <Route
              path='/admin'
              element={
                isAdmin ? (
                  <Admin />
                ) : isAuth ? (
                  <Navigate to='/home' />
                ) : (
                  <Navigate to='/' />
                )
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
