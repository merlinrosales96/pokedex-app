import React, { useMemo } from 'react';
import { PaletteMode, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LazyMotion, domAnimation } from "framer-motion"; // 1. Importación para optimizar bundle
import RoutesApp from './components/common/Routes';
import './App.css';

function App() {
  const [mode] = React.useState<PaletteMode>('light');

  // 2. Memorizamos el tema para que no se recree innecesariamente
  const defaultTheme = useMemo(() => createTheme({
    typography: {
      fontFamily: 'PokemonGB, sans-serif',
    },
    shape: {
      borderRadius: 16,
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#ff1c1c' },
            secondary: { main: '#ffcb05' },
            background: { default: '#f0f2f5', paper: '#ffffff' },
          }
        : {
            primary: { main: '#ff3d3d' },
            secondary: { main: '#ffcb05' },
            background: { default: '#0a0d14', paper: '#161b22' },
          }),
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  }), [mode]);

  return (
    // 3. Envolvemos con LazyMotion para activar el ahorro de ~30kb
    <LazyMotion features={domAnimation} strict>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RoutesApp />
      </ThemeProvider>
    </LazyMotion>
  );
}

export default App;
