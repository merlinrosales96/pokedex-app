import { Box, Typography, Button, Container, Stack, Chip } from '@mui/material';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { East } from '@mui/icons-material';
import { useThemeMode } from '../theme/ThemeProvider';

const FEATURED = [
  { id: 6,   name: 'Charizard', color: '#F97316' },
  { id: 25,  name: 'Pikachu',   color: '#EAB308' },
  { id: 150, name: 'Mewtwo',    color: '#8B5CF6' },
  { id: 131, name: 'Lapras',    color: '#3B82F6' },
];

const Home = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background grid dots */}
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

      {/* Red accent blob */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,62,62,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ zIndex: 1, pt: { xs: 12, md: 0 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Left — text */}
          <Box sx={{ flex: 1, maxWidth: 560, width: '100%' }}>
            <m.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Chip
                label="1,025 Pokémon · Gen I–IX"
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
                variant="h1"
                sx={{
                  fontSize: { xs: '2.6rem', md: '4.2rem' },
                  fontWeight: 800,
                  color: 'text.primary',
                  lineHeight: 1.05,
                  letterSpacing: '-2px',
                  mb: 2.5,
                }}
              >
                Your Pokémon<br />
                <Box component="span" sx={{ color: '#e53e3e' }}>companion.</Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: 420,
                }}
              >
                Explore stats, moves, types, and forms of every Pokémon
                from Generation I to Generation IX.
              </Typography>

              {/* Buttons — row on desktop, column on mobile */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  component={Link}
                  to="/pokedex/1"
                  variant="contained"
                  size="large"
                  endIcon={<East />}
                  fullWidth={false}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    bgcolor: '#e53e3e',
                    boxShadow: '0 8px 24px rgba(229,62,62,0.3)',
                    textTransform: 'none',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      bgcolor: '#c53030',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(229,62,62,0.4)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Open Pokédex
                </Button>

                <Button
                  component={Link}
                  to="/pokemon/25"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    color: 'text.primary',
                    borderColor: 'divider',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      borderColor: 'text.secondary',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  View Pikachu
                </Button>
              </Stack>
            </m.div>
          </Box>

          {/* Right — featured pokemon grid (desktop only) */}
          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              maxWidth: 420,
            }}
          >
            {FEATURED.map((p, i) => (
              <m.div
                key={p.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                <Box
                  component={Link}
                  to={`/pokemon/${p.id}`}
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    borderRadius: '20px',
                    bgcolor: `${p.color}12`,
                    border: `1px solid ${p.color}28`,
                    p: 2.5,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 32px ${p.color}22`,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                    alt={p.name}
                    sx={{ width: 90, height: 90, objectFit: 'contain' }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: p.color, fontSize: '0.8rem' }}
                  >
                    {p.name}
                  </Typography>
                </Box>
              </m.div>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;