import React from 'react';
import {
    Box, Typography, Chip, Grid, Stack, Avatar, Tooltip,
} from '@mui/material';
import { PokemonDetail } from '../../utils/Types';

const typeStyle: Record<string, { bg: string; darkBg: string; color: string }> = {
    fire: { bg: '#FEE2E2', darkBg: '#3B1212', color: '#991B1B' },
    water: { bg: '#DBEAFE', darkBg: '#0F1F3D', color: '#1E40AF' },
    grass: { bg: '#DCFCE7', darkBg: '#0F2B1A', color: '#166534' },
    poison: { bg: '#F3E8FF', darkBg: '#2A1040', color: '#6B21A8' },
    flying: { bg: '#E0F2FE', darkBg: '#0A1E2E', color: '#0C4A6E' },
    bug: { bg: '#ECFCCB', darkBg: '#1A2A08', color: '#3F6212' },
    normal: { bg: '#F5F5F4', darkBg: '#242424', color: '#44403C' },
    electric: { bg: '#FEF9C3', darkBg: '#2E2408', color: '#713F12' },
    psychic: { bg: '#FCE7F3', darkBg: '#2E0A1E', color: '#831843' },
    rock: { bg: '#FEF3C7', darkBg: '#2A1E08', color: '#78350F' },
    ice: { bg: '#CFFAFE', darkBg: '#062830', color: '#164E63' },
    ground: { bg: '#FEF3C7', darkBg: '#2A1E08', color: '#713F12' },
    fighting: { bg: '#FEE2E2', darkBg: '#2E0A0A', color: '#7F1D1D' },
    ghost: { bg: '#EDE9FE', darkBg: '#1C1040', color: '#4C1D95' },
    dragon: { bg: '#E0E7FF', darkBg: '#0A0E2E', color: '#1E1B4B' },
    steel: { bg: '#F1F5F9', darkBg: '#1A202C', color: '#334155' },
    dark: { bg: '#F5F5F4', darkBg: '#1A1612', color: '#1C1917' },
    fairy: { bg: '#FCE7F3', darkBg: '#2E0A1E', color: '#9D174D' },
};

interface PokemonHeroCardProps {
    data: PokemonDetail;
    heroBg: string;
    themeColor: string;
    isDark: boolean;
}

const PokemonHeroCard: React.FC<PokemonHeroCardProps> = ({ data, heroBg, themeColor, isDark }) => {
    const infoCardBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.6)';

    const card = {
        borderRadius: '20px',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        p: 3,
    };

    const sprites = [
        { src: data.sprites.front_default, title: 'Normal' },
        { src: data.sprites.front_shiny, title: 'Shiny' },
        { src: data.sprites.front_female, title: 'Female' },
        { src: data.sprites.front_shiny_female, title: 'Shiny ♀' },
    ];

    return (
        <>
            {/* Hero image */}
            <Box
                sx={{
                    ...card,
                    textAlign: 'center',
                    bgcolor: heroBg,
                    borderColor: 'transparent',
                    mb: 2.5,
                }}
            >
                <Box
                    component="img"
                    src={data.sprites.other['official-artwork'].front_default}
                    alt={data.name}
                    sx={{
                        width: '75%',
                        maxWidth: 220,
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
                    }}
                />

                <Stack direction="row" spacing={0.75} justifyContent="center" sx={{ mt: 2, mb: 2.5 }}>
                    {data.types.map((item) => {
                        const tts = typeStyle[item.type.name] || { color: '#444' };
                        return (
                            <Chip
                                key={item.type.name}
                                label={item.type.name.toUpperCase()}
                                size="small"
                                sx={{
                                    bgcolor: tts.color,
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.5px',
                                }}
                            />
                        );
                    })}
                </Stack>

                <Grid container spacing={1.5}>
                    {[
                        { label: 'Weight', value: `${data.weight / 10} kg` },
                        { label: 'Height', value: `${data.height / 10} m` },
                    ].map((info) => (
                        <Grid size={6} key={info.label}>
                            <Box sx={{ bgcolor: infoCardBg, borderRadius: '12px', p: 1.5, textAlign: 'center' }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'text.secondary',
                                        display: 'block',
                                        fontWeight: 600,
                                        mb: 0.3,
                                        fontSize: '0.68rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    {info.label}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '1rem' }}>
                                    {info.value}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Available Forms */}
            <Box sx={card}>
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 700,
                        color: 'text.secondary',
                        display: 'block',
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.7rem',
                    }}
                >
                    Available Forms
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ gap: 1 }}>
                    {sprites.map(
                        (sprite) =>
                            sprite.src && (
                                <Tooltip key={sprite.title} title={sprite.title} arrow>
                                    <Avatar
                                        src={sprite.src}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            bgcolor: heroBg,
                                            border: '2px solid',
                                            borderColor: 'divider',
                                            cursor: 'pointer',
                                            transition: '0.2s',
                                            '&:hover': { borderColor: themeColor, transform: 'scale(1.1)' },
                                        }}
                                    />
                                </Tooltip>
                            )
                    )}
                </Stack>
            </Box>
        </>
    );
};

export default PokemonHeroCard;