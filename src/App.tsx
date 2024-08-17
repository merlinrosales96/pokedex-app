import React from 'react';
import { PaletteMode } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from './components/organs/NavBar';
import Pokedex from './components/pages/Pokedex';
import './App.css';

function App() {

  const [mode] = React.useState<PaletteMode>('light');

  const defaultTheme = createTheme({
    /*typography: {
      fontFamily:  "New Amsterdam, sans-serif", // Especifica la fuente de Google y una fuente de respaldo
    },*/
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
            secondary: '#424242',
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
      <NavBar mode={mode} />
      <Pokedex />
    </ThemeProvider>
  );
}

export default App;
