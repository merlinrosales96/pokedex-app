import React from 'react';
import { Container, Grid, Box, Skeleton } from '@mui/material';

const InfoSkeleton: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, mt: { xs: '84px', md: '100px' } }}>
    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width="40%" height={60} />
    </Box>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Skeleton variant="rectangular" height={420} sx={{ borderRadius: '24px' }} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Skeleton variant="rectangular" height={420} sx={{ borderRadius: '24px' }} />
      </Grid>
    </Grid>
  </Container>
);

export default InfoSkeleton;