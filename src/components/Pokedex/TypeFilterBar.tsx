import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

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

interface TypeFilterBarProps {
  types: string[];
  activeType: string | null;
  onSelect: (type: string | null) => void;
  page: number;
  isDark: boolean;
}

const TypeFilterBar: React.FC<TypeFilterBarProps> = ({ types, activeType, onSelect, page, isDark }) => {
  const allChipBg    = isDark ? '#e2e8f0' : '#111';
  const allChipColor = isDark ? '#111'    : '#fff';

  return (
    <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      <Chip
        label="All"
        onClick={() => onSelect(null)}
        sx={{
          fontWeight: 600,
          fontSize: '0.72rem',
          height: 28,
          bgcolor: activeType === null ? allChipBg : 'transparent',
          color: activeType === null ? allChipColor : 'text.secondary',
          border: '1px solid',
          borderColor: activeType === null ? allChipBg : 'divider',
          '&:hover': { bgcolor: allChipBg, color: allChipColor },
          transition: 'all 0.15s ease',
        }}
      />
      {types.map((type) => {
        const ts = typeStyle[type] || { bg: '#eee', darkBg: '#333', color: '#444' };
        const isActive = activeType === type;
        const chipBg = isActive ? ts.color : isDark ? ts.darkBg : ts.bg;
        const chipColor = isActive || isDark ? '#fff' : ts.color;
        return (
          <Chip
            key={type}
            label={type.toUpperCase()}
            onClick={() => onSelect(isActive ? null : type)}
            sx={{
              fontWeight: 700,
              fontSize: '0.68rem',
              height: 28,
              letterSpacing: '0.3px',
              bgcolor: chipBg,
              color: chipColor,
              border: '1px solid transparent',
              '&:hover': { bgcolor: ts.color, color: '#fff' },
              transition: 'all 0.15s ease',
            }}
          />
        );
      })}
      <Typography
        variant="caption"
        sx={{ alignSelf: 'center', color: 'text.disabled', fontSize: '0.68rem', ml: 0.5, fontStyle: 'italic' }}
      >
        Page {page} · resets on navigation
      </Typography>
    </Box>
  );
};

export default TypeFilterBar;