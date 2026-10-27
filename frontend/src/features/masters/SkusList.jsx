import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, InputAdornment, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Plus, Package } from 'lucide-react';
import { useGetSkusQuery } from '../../store/api/skuApi';
import { BRAND } from '../../theme/brand';

const SkusList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetSkusQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchTerm || undefined,
  });

  const columns = [
    {
      field: 'code',
      headerName: 'SKU CODE',
      width: 170,
      renderCell: (p) => (
        <Box sx={{
          px: 1.2,
          py: 0.4,
          borderRadius: '6px',
          bgcolor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: BRAND.primaryLight, letterSpacing: '0.04em' }}>
            {p.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'name',
      headerName: 'DESCRIPTION',
      flex: 1,
      minWidth: 260,
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={600} sx={{ color: '#f8fafc' }}>
          {p.value}
        </Typography>
      )
    },
    {
      field: 'category',
      headerName: 'CATEGORY',
      width: 150,
      renderCell: (p) => (
        <Box sx={{
          px: 1.6,
          py: 0.5,
          borderRadius: '8px',
          bgcolor: BRAND.wipBg,
          border: `1px solid ${BRAND.wipBorder}`,
          color: BRAND.secondaryLight,
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          display: 'inline-flex',
          alignItems: 'center',
          boxShadow: '0 0 10px rgba(168, 85, 247, 0.12)',
        }}>
          {p.value || 'General'}
        </Box>
      )
    },
    {
      field: 'pcsPerBox',
      headerName: 'PCS / BOX',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={700} sx={{ color: '#e2e8f0' }}>
          {p.value || '-'}
        </Typography>
      )
    },
    {
      field: 'weightPerPc',
      headerName: 'WEIGHT (KG)',
      width: 130,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.infoLight }}>
          {p.value ? `${p.value.toFixed(3)} kg` : '-'}
        </Typography>
      )
    },
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2.5,
      p: { xs: 2, sm: 3 },
      minHeight: '100vh',
      bgcolor: BRAND.surface.bg,
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            color: BRAND.primaryLight,
            display: 'flex'
          }}>
            <Package size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              SKU Master
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Stock Keeping Units directory, weight specifications, and packaging norms
            </Typography>
          </Box>
        </Box>

        {/* Search & Actions */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 1.5,
          width: { xs: '100%', md: 'auto' }
        }}>
          <TextField
            size="small"
            placeholder="Search SKUs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="#64748b" />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            sx={{ width: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
          >
            Add SKU
          </Button>
        </Box>
      </Box>

      {/* Data Grid Card */}
      <Paper sx={{
        flexGrow: 1,
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`,
      }}>
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          paginationMode="server"
          rowCount={data?.meta?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          rowHeight={52}
          columnHeaderHeight={46}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default SkusList;
