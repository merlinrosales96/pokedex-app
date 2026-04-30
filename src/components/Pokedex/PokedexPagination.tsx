import React from 'react';
import { Box, Pagination } from '@mui/material';
import { PokemonCount, itemsPerPage } from '../../utils/Utils';

interface PokedexPaginationProps {
  page: number;
  onChange: (_: React.ChangeEvent<unknown>, value: number) => void;
  isDark: boolean;
}

const PokedexPagination: React.FC<PokedexPaginationProps> = ({ page, onChange, isDark }) => {
  const hoverBg       = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const paginSelected = isDark ? '#e2e8f0' : '#111';
  const paginSelColor = isDark ? '#111'    : '#fff';
  const paginSelHov   = isDark ? '#cbd5e1' : '#333';

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7, mb: 3 }}>
      <Pagination
        count={Math.ceil(PokemonCount / itemsPerPage)}
        page={page}
        onChange={onChange}
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            fontWeight: 600,
            borderRadius: '10px',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:hover': { bgcolor: hoverBg },
            '&.Mui-selected': {
              bgcolor: paginSelected,
              color: paginSelColor,
              borderColor: paginSelected,
              '&:hover': { bgcolor: paginSelHov },
            },
          },
        }}
      />
    </Box>
  );
};

export default PokedexPagination;