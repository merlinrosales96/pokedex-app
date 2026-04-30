import React, { createContext, useContext, useState, useMemo } from 'react';
import { PaletteMode, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => { },
});

export const useThemeMode = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const saved = localStorage.getItem('theme') as PaletteMode;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          h1: { fontWeight: 800, letterSpacing: '-2px' },
          h2: { fontWeight: 800, letterSpacing: '-1px' },
          h3: { fontWeight: 700, letterSpacing: '-0.5px' },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: { borderRadius: 16 },
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              primary: { main: '#e53e3e' },
              secondary: { main: '#EAB308' },
              background: { default: '#F7F8FA', paper: '#FFFFFF' },
              text: { primary: '#111827', secondary: '#6B7280' },
              divider: 'rgba(0,0,0,0.07)',
            }
            : {
              primary: { main: '#fc5c5c' },
              secondary: { main: '#EAB308' },
              background: { default: '#0f1117', paper: '#1a1d27' },
              text: { primary: '#F9FAFB', secondary: '#9CA3AF' },
              divider: 'rgba(255,255,255,0.07)',
            }),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.3px',
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};