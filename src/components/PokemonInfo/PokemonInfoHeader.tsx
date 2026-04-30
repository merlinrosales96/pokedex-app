import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface PokemonInfoHeaderProps {
    name: string;
    id: number;
    onBack: () => void;
    isDark: boolean;
}

const PokemonInfoHeader: React.FC<PokemonInfoHeaderProps> = ({ name, id, onBack, isDark }) => {
    const subtleHover = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)';
    const idColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

    return (
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
                onClick={onBack}
                size="small"
                sx={{
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '10px',
                    width: 38,
                    height: 38,
                    '&:hover': { bgcolor: subtleHover },
                }}
            >
                <ArrowBack sx={{ fontSize: 18 }} />
            </IconButton>

            <Typography
                variant="h3"
                sx={{
                    fontWeight: 800,
                    textTransform: 'capitalize',
                    fontSize: { xs: '1.6rem', md: '2.5rem' },
                    color: 'text.primary',
                    letterSpacing: '-1px',
                    lineHeight: 1,
                }}
            >
                {name.replace('-', ' ')}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    ml: 'auto',
                    fontWeight: 800,
                    fontSize: { xs: '1.1rem', md: '1.8rem' },
                    color: idColor,
                    letterSpacing: '-1px',
                }}
            >
                #{id.toString().padStart(3, '0')}
            </Typography>
        </Box>
    );
};

export default PokemonInfoHeader;