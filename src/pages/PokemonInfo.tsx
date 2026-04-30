import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Pagination } from '@mui/material';
import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { usePokemonById } from '../hooks/usePokemons';
import { typeColors, PokemonCount } from '../utils/Utils';

import PokemonInfoHeader from '../components/PokemonInfo/PokemonInfoHeader';
import PokemonHeroCard from '../components/PokemonInfo/PokemonHeroCard';
import PokemonBaseStats from '../components/PokemonInfo/PokemonBaseStats';
import PokemonMoveset from '../components/PokemonInfo/PokemonMoveset';
import InfoSkeleton from '../components/PokemonInfo/InfoSkeleton';

const typeStyle: Record<string, { bg: string; darkBg: string }> = {
  fire: { bg: '#FEE2E2', darkBg: '#3B1212' },
  water: { bg: '#DBEAFE', darkBg: '#0F1F3D' },
  grass: { bg: '#DCFCE7', darkBg: '#0F2B1A' },
  poison: { bg: '#F3E8FF', darkBg: '#2A1040' },
  flying: { bg: '#E0F2FE', darkBg: '#0A1E2E' },
  bug: { bg: '#ECFCCB', darkBg: '#1A2A08' },
  normal: { bg: '#F5F5F4', darkBg: '#242424' },
  electric: { bg: '#FEF9C3', darkBg: '#2E2408' },
  psychic: { bg: '#FCE7F3', darkBg: '#2E0A1E' },
  rock: { bg: '#FEF3C7', darkBg: '#2A1E08' },
  ice: { bg: '#CFFAFE', darkBg: '#062830' },
  ground: { bg: '#FEF3C7', darkBg: '#2A1E08' },
  fighting: { bg: '#FEE2E2', darkBg: '#2E0A0A' },
  ghost: { bg: '#EDE9FE', darkBg: '#1C1040' },
  dragon: { bg: '#E0E7FF', darkBg: '#0A0E2E' },
  steel: { bg: '#F1F5F9', darkBg: '#1A202C' },
  dark: { bg: '#F5F5F4', darkBg: '#1A1612' },
  fairy: { bg: '#FCE7F3', darkBg: '#2E0A1E' },
};

const PokemonInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const [page, setPage] = useState<number>(id ? parseInt(id) : 1);
  const { data, loading } = usePokemonById(page);

  const mainType = data?.types[0].type.name || 'normal';
  const ts = typeStyle[mainType] || { bg: '#f5f5f5', darkBg: '#222' };
  const heroBg = isDark ? ts.darkBg : ts.bg;
  const themeColor = typeColors[mainType];

  const subtleHover = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';

  const card = {
    borderRadius: '20px',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    p: 3,
  };

  useEffect(() => {
    const numId = id ? parseInt(id, 10) : 1;
    if (isNaN(numId) || numId < 1 || numId > PokemonCount) navigate('/not-found');
  }, [id, navigate]);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    navigate(`/pokemon/${value}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPokedex = () => {
    navigate(`/pokedex/${Math.ceil((id ? parseInt(id) : 1) / 20)}`);
  };

  if (loading) return <InfoSkeleton />;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, mt: { xs: '84px', md: '96px' }, minHeight: '100vh' }}>

      <PokemonInfoHeader
        name={data!.name}
        id={data!.id}
        onBack={goPokedex}
        isDark={isDark}
      />

      <Grid container spacing={3}>
        {/* Left column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <m.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <PokemonHeroCard
              data={data!}
              heroBg={heroBg}
              themeColor={themeColor}
              isDark={isDark}
            />
          </m.div>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <m.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}>

            {/* Base Stats */}
            <Box sx={{ ...card, mb: 2.5 }}>
              <Box
                component="p"
                sx={{
                  m: 0,
                  mb: 3,
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Base Stats
              </Box>
              <PokemonBaseStats
                stats={data!.stats}
                themeColor={themeColor}
                isDark={isDark}
              />
            </Box>

            {/* Moveset */}
            <Box sx={{ ...card, p: 0, overflow: 'hidden' }}>
              <PokemonMoveset moves={data!.moves} isDark={isDark} />
            </Box>

          </m.div>
        </Grid>
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 3 }}>
        <Pagination
          count={PokemonCount}
          page={page}
          onChange={handleChange}
          shape="rounded"
          siblingCount={window.innerWidth < 600 ? 0 : 1}
          boundaryCount={1}
          size={window.innerWidth < 600 ? 'small' : 'large'}
          sx={{
            '& .MuiPaginationItem-root': {
              fontWeight: 600,
              borderRadius: '10px',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&:hover': { bgcolor: subtleHover },
              '&.Mui-selected': {
                bgcolor: themeColor,
                color: '#fff',
                borderColor: themeColor,
                '&:hover': { filter: 'brightness(0.88)' },
              },
            },
          }}
        />
      </Box>

    </Container>
  );
};

export default PokemonInfo;