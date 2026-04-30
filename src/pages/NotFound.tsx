import { Box, Typography, Button, Container, Chip } from '@mui/material';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeProvider';

export default function NotFound() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      {/* Red blob top-right */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Giant 404 watermark */}
      <Typography
        sx={{
          position: 'absolute',
          fontWeight: 900,
          fontSize: 'clamp(180px, 30vw, 320px)',
          color: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.04)',
          letterSpacing: '-20px',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        404
      </Typography>

      <Container maxWidth="sm" sx={{ zIndex: 1, textAlign: 'center' }}>
        {/* Pokéball spinning animation */}
        <m.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block', marginBottom: 16 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              border: '4px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
              mx: 'auto',
            }}
          >
            {/* Top half — red */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', bgcolor: '#e53e3e' }} />
            {/* Bottom half */}
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', bgcolor: isDark ? '#2d3748' : '#f0f0f0' }} />
            {/* Center line */}
            <Box sx={{ position: 'absolute', top: '46%', left: 0, right: 0, height: 4, bgcolor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }} />
            {/* Center button */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 18,
                height: 18,
                borderRadius: '50%',
                bgcolor: isDark ? '#1a1d27' : '#fff',
                border: '3px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                zIndex: 2,
              }}
            />
          </Box>
        </m.div>

        <m.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Chip
            label="Error 404"
            size="small"
            sx={{
              mb: 3,
              bgcolor: 'rgba(229,62,62,0.08)',
              color: '#e53e3e',
              fontWeight: 600,
              fontSize: '0.72rem',
              border: '1px solid rgba(229,62,62,0.2)',
            }}
          />

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.8rem' },
              letterSpacing: '-1.5px',
              mb: 1.5,
              lineHeight: 1.1,
            }}
          >
            A wild error appeared!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1rem',
              lineHeight: 1.7,
              mb: 4,
              maxWidth: 380,
              mx: 'auto',
            }}
          >
            The page you're looking for has fled into the tall grass.
            It might have been moved, deleted, or never existed at all.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<Home />}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.9rem',
                bgcolor: '#e53e3e',
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(229,62,62,0.3)',
                '&:hover': {
                  bgcolor: '#c53030',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(229,62,62,0.4)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Back to Home
            </Button>

            <Button
              component={Link}
              to="/pokedex/1"
              variant="outlined"
              startIcon={<ArrowBack />}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'text.secondary',
                  bgcolor: 'action.hover',
                },
              }}
            >
              Open Pokédex
            </Button>
          </Box>
        </m.div>
      </Container>
    </Box>
  );
}