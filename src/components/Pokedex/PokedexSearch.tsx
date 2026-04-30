import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface PokedexSearchProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: () => void;
  isDark: boolean;
}

const PokedexSearch: React.FC<PokedexSearchProps> = ({ value, onChange, onSearch, isDark }) => {
  const fieldBorder    = isDark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)';
  const fieldBorderHov = isDark ? 'rgba(255,255,255,0.2)'  : 'rgba(0,0,0,0.2)';

  return (
    <Box sx={{ mb: 3, maxWidth: 480 }}>
      <TextField
        fullWidth
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: 'background.paper',
            fontSize: '0.95rem',
            color: 'text.primary',
            '& fieldset': { borderColor: fieldBorder },
            '&:hover fieldset': { borderColor: fieldBorderHov },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          },
          '& .MuiInputBase-input::placeholder': { color: 'text.disabled', opacity: 1 },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default PokedexSearch;