import React from 'react';
import { Box, Skeleton, Paper } from '@mui/material';
import { BRAND } from '../theme/brand';

const TableSkeleton = ({ rows = 8, columns = 5 }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2.5, p: 3, bgcolor: BRAND.surface.bg, minHeight: '100vh' }}>
      {/* Header Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Skeleton variant="text" width={220} height={36} sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.06)' }} />
          <Skeleton variant="text" width={320} height={20} sx={{ borderRadius: 1, mt: 0.5, bgcolor: 'rgba(255,255,255,0.04)' }} />
        </Box>
        <Skeleton variant="rectangular" width={140} height={42} sx={{ borderRadius: '10px', bgcolor: 'rgba(99,102,241,0.2)' }} />
      </Box>

      {/* Grid Skeleton */}
      <Paper sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        p: 0,
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`
      }}>
        {/* Column Headers */}
        <Box sx={{ display: 'flex', gap: 2, p: 2, bgcolor: BRAND.surface.header, borderBottom: `1px solid ${BRAND.surface.border}` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" width={`${100 / columns}%`} height={18} sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.08)' }} />
          ))}
        </Box>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box 
            key={rowIndex} 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              p: 2, 
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              bgcolor: rowIndex % 2 === 0 ? BRAND.surface.card : 'rgba(255,255,255,0.015)',
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton 
                key={colIndex} 
                variant="text" 
                width={`${100 / columns}%`} 
                height={20}
                sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.05)' }}
              />
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default TableSkeleton;
