import React from 'react';
import { Box, Typography } from '@mui/material';
import { PokemonCount } from '../../utils/Utils';

const PokedexHeader: React.FC = () => (
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="h3"
      sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-1px', mb: 1, fontSize: { xs: '2rem', md: '2.8rem' } }}
    >
      Pokédex
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
      {PokemonCount} Pokémon · Generation I–IX
    </Typography>
  </Box>
);

export default PokedexHeader;