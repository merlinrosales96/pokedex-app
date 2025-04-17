import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaletteMode, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/layout/NavBar';
import Home from './pages/Home';
import Pokedex from './pages/Pokedex';
import PokemonInfo from './pages/PokemonInfo';
import NotFound from './pages/NotFound';
import './App.css';

function App() {

  const [mode] = React.useState<PaletteMode>('light');

  const defaultTheme = createTheme({
    typography: {
      fontFamily: 'PokemonGB, Arial',
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: '#f3efee',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#f3efee',
          },
        }
        : {
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#0F141F',
            paper: '#172030',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b0bec5',
          },
        }),
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokedex/:id' element={<Pokedex />} />
        <Route path='/pokemon/:id' element={<PokemonInfo />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
