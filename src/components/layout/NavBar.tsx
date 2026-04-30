import { AppBar, Box, Container, Toolbar, Typography, IconButton, useScrollTrigger } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../theme/ThemeProvider';

function NavBar() {
  const { mode, toggleTheme } = useThemeMode();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });
  const location = useLocation();
  const isDark = mode === 'dark';

  const navBg = isDark
    ? trigger ? 'rgba(26,29,39,0.95)' : 'rgba(26,29,39,0.72)'
    : trigger ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)';

  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(204,0,0,0.2)';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ bgcolor: 'transparent', backgroundImage: 'none', pt: 2 }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            borderRadius: '16px',
            bgcolor: navBg,
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor,
            px: 2,
            transition: 'all 0.3s ease',
            boxShadow: trigger
              ? isDark ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)'
              : 'none',
            minHeight: '52px !important',
          }}
        >
          {/* Blue indicator light */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 38%, #b8e0ff, #1a7fd4)',
              border: '2px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.7)' : 'white',
              boxShadow: '0 0 0 2px #0a4a8a',
              flexShrink: 0,
            }}
          />

          {/* Three indicator dots */}
          <Box sx={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
            {['#ff6b6b', '#ffe566', '#6bff8e'].map((color) => (
              <Box
                key={color}
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  bgcolor: color,
                  border: '1px solid rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </Box>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '-0.2px',
                color: 'text.primary',
                '& span': { color: '#CC0000' },
              }}
            >
              Poké<span>dex</span>
            </Typography>
          </Link>

          {/* Nav links — hidden on mobile */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Pokédex', to: '/pokedex/1' },
            ].map(({ label, to }) => {
              const active =
                to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(to.replace('/1', ''));
              return (
                <Link key={label} to={to} style={{ textDecoration: 'none' }}>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.6,
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#CC0000' : 'text.secondary',
                      bgcolor: active ? 'rgba(204,0,0,0.08)' : 'transparent',
                      border: '1px solid',
                      borderColor: active ? 'rgba(204,0,0,0.22)' : 'transparent',
                      transition: 'all 0.15s ease',
                      '&:hover': { color: '#CC0000', bgcolor: 'rgba(204,0,0,0.06)' },
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </Box>
                </Link>
              );
            })}
          </Box>

          {/* Dark mode toggle */}
          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="Toggle dark mode"
            sx={{
              color: 'text.secondary',
              bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              borderRadius: '9px',
              width: 34,
              height: 34,
              flexShrink: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)',
                color: 'text.primary',
              },
            }}
          >
            {isDark ? <LightMode sx={{ fontSize: 15 }} /> : <DarkMode sx={{ fontSize: 15 }} />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;