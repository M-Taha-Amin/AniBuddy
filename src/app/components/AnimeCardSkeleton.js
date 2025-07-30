import { Box, Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

const AnimeCardSkeleton = () => {
  return (
    <Card className="h-fit w-[300px]" elevation={2}>
      <Skeleton variant="rounded" height="224px" animation="wave" />
      <CardContent>
        <Skeleton height="30px" variant="rectangular" sx={{ mb: 1.5 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {new Array(3).fill(0).map((_val, i) => (
            <Skeleton key={i} variant="rounded" width="60px" height="22px" />
          ))}
        </Box>
        <Box className="flex gap-2 mt-12">
          <Skeleton width="90px" height="60px" />
          <Skeleton width="120px" height="60px" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCardSkeleton;
