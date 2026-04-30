import React from 'react';
import { Grid, Box, Skeleton } from '@mui/material';
import { itemsPerPage } from '../../utils/Utils';

const PokedexSkeleton: React.FC = () => (
  <Grid container spacing={2.5}>
    {Array.from({ length: itemsPerPage || 20 }).map((_, i) => (
      <Grid size={{ xs: 6, sm: 4, md: 3 }} key={i}>
        <Box
          sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            p: 2.5,
          }}
        >
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: '12px', mb: 1.5 }} />
          <Skeleton variant="text" width="50%" height={16} sx={{ mx: 'auto', mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={22} sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="rounded" width={60} height={22} sx={{ mx: 'auto', borderRadius: '20px' }} />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default PokedexSkeleton;