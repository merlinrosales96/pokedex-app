import React from 'react';
import { PaletteMode, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RoutesApp from './components/common/Routes';
import './App.css';

function App() {

  const [mode] = React.useState<PaletteMode>('light');

  const defaultTheme = createTheme({
    typography: {
      // Usamos una fuente moderna para lectura y mantenemos la de Pokemon para títulos
      //fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
      fontFamily: 'PokemonGB, sans-serif',
    },
    shape: {
      borderRadius: 16, // Bordes más suaves y modernos
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: { main: '#ff1c1c' }, // Rojo Pokedex
          secondary: { main: '#ffcb05' }, // Amarillo Pokemon
          background: {
            default: '#f0f2f5',
            paper: '#ffffff',
          },
        }
        : {
          primary: { main: '#ff3d3d' },
          secondary: { main: '#ffcb05' },
          background: {
            default: '#0a0d14',
            paper: '#161b22',
          },
        }),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)', // Efecto de flotación
              boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RoutesApp />
    </ThemeProvider>
  );
}

export default App;
