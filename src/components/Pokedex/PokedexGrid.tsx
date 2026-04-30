import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, Typography, Box, CardMedia, Chip, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { itemsPerPage, typeColors } from '../../utils/Utils';
import { Pokemon } from '../../utils/Types';

const typeStyle: Record<string, { bg: string; darkBg: string; color: string }> = {
  fire:     { bg: '#FEE2E2', darkBg: '#3B1212', color: '#991B1B' },
  water:    { bg: '#DBEAFE', darkBg: '#0F1F3D', color: '#1E40AF' },
  grass:    { bg: '#DCFCE7', darkBg: '#0F2B1A', color: '#166534' },
  poison:   { bg: '#F3E8FF', darkBg: '#2A1040', color: '#6B21A8' },
  flying:   { bg: '#E0F2FE', darkBg: '#0A1E2E', color: '#0C4A6E' },
  bug:      { bg: '#ECFCCB', darkBg: '#1A2A08', color: '#3F6212' },
  normal:   { bg: '#F5F5F4', darkBg: '#242424', color: '#44403C' },
  electric: { bg: '#FEF9C3', darkBg: '#2E2408', color: '#713F12' },
  psychic:  { bg: '#FCE7F3', darkBg: '#2E0A1E', color: '#831843' },
  rock:     { bg: '#FEF3C7', darkBg: '#2A1E08', color: '#78350F' },
  ice:      { bg: '#CFFAFE', darkBg: '#062830', color: '#164E63' },
  ground:   { bg: '#FEF3C7', darkBg: '#2A1E08', color: '#713F12' },
  fighting: { bg: '#FEE2E2', darkBg: '#2E0A0A', color: '#7F1D1D' },
  ghost:    { bg: '#EDE9FE', darkBg: '#1C1040', color: '#4C1D95' },
  dragon:   { bg: '#E0E7FF', darkBg: '#0A0E2E', color: '#1E1B4B' },
  steel:    { bg: '#F1F5F9', darkBg: '#1A202C', color: '#334155' },
  dark:     { bg: '#F5F5F4', darkBg: '#1A1612', color: '#78716C' },
  fairy:    { bg: '#FCE7F3', darkBg: '#2E0A1E', color: '#9D174D' },
};

interface PokedexGridProps {
  filteredData: Pokemon[];
  pokemonDetails: Record<string, any>;
  isDark: boolean;
  borderColor: string;
}

const PokedexGrid: React.FC<PokedexGridProps> = ({ filteredData, pokemonDetails, isDark, borderColor }) => (
  <Grid container spacing={2.5}>
    {filteredData.map((pokemon: Pokemon, index: number) => {
      const detail = pokemonDetails[pokemon.name];
      const mainType = detail?.types[0].type.name || 'normal';
      const ts = typeStyle[mainType] || { bg: '#f5f5f5', darkBg: '#222', color: '#555' };
      const imageBg = isDark ? ts.darkBg : ts.bg;
      const accent = typeColors[mainType] || '#888';

      return (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={pokemon.name}>
          <m.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: (index % itemsPerPage) * 0.04 }}
          >
            <Link to={`/pokemon/${detail?.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  borderRadius: '20px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: borderColor,
                  boxShadow: 'none',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: `${accent}55`,
                    boxShadow: `0 16px 40px ${accent}20`,
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                <CardActionArea sx={{ p: 0 }}>
                  <Box
                    sx={{
                      bgcolor: imageBg,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      pt: 2.5,
                      pb: 1,
                      px: 2,
                      position: 'relative',
                    }}
                  >
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 12,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: isDark ? 'rgba(255,255,255,0.3)' : `${ts.color}70`,
                        letterSpacing: '0.5px',
                      }}
                    >
                      #{detail?.id.toString().padStart(3, '0')}
                    </Typography>
                    <CardMedia
                      component="img"
                      image={detail?.sprites.other['official-artwork'].front_default}
                      alt={pokemon.name}
                      sx={{ width: 100, height: 100, objectFit: 'contain' }}
                    />
                  </Box>

                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: 'text.primary',
                        textTransform: 'capitalize',
                        fontSize: '0.88rem',
                        mb: 1,
                      }}
                    >
                      {pokemon.name.replace('-', ' ')}
                    </Typography>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      {detail?.types.map((t: any) => {
                        const tts = typeStyle[t.type.name] || { bg: '#eee', darkBg: '#333', color: '#444' };
                        return (
                          <Chip
                            key={t.type.name}
                            label={t.type.name}
                            size="small"
                            sx={{
                              bgcolor: isDark ? tts.darkBg : tts.bg,
                              color: isDark ? '#fff' : tts.color,
                              fontWeight: 700,
                              fontSize: '0.62rem',
                              height: 20,
                              textTransform: 'capitalize',
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </CardActionArea>
              </Card>
            </Link>
          </m.div>
        </Grid>
      );
    })}
  </Grid>
);

export default PokedexGrid;