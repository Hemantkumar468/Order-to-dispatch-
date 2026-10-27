import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Paper, TextField, InputAdornment, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Plus, Users, Clock, CreditCard } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import { useGetPartiesQuery } from '../../store/api/partyApi';
import PartyCreateModal from './PartyCreateModal';
import { defaultMockParties, getStoredParties } from '../../mock-data/mockParties';
import { BRAND } from '../../theme/brand';

const PartiesList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [localUpdatedTick, setLocalUpdatedTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setLocalUpdatedTick(prev => prev + 1);
    window.addEventListener('parties-updated', handleUpdate);
    return () => window.removeEventListener('parties-updated', handleUpdate);
  }, []);

  const { data, isLoading } = useGetPartiesQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchTerm || undefined,
  });

  const displayRows = useMemo(() => {
    const custom = getStoredParties();
    const baseList = (data?.data && data.data.length > 0) ? data.data : defaultMockParties;
    const existingCodes = new Set(custom.map(c => c.code || c._id));
    const merged = [...custom, ...baseList.filter(p => !existingCodes.has(p.code || p._id))];

    if (!searchTerm.trim()) return merged;
    const term = searchTerm.toLowerCase();
    return merged.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.code?.toLowerCase().includes(term) ||
      p.location?.toLowerCase().includes(term)
    );
  }, [data, searchTerm, localUpdatedTick]);

  const columns = [
    {
      field: 'code',
      headerName: 'CODE',
      width: 150,
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
      headerName: 'PARTY NAME',
      flex: 1,
      minWidth: 260,
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={600} sx={{ color: '#f8fafc' }}>
          {p.value}
        </Typography>
      )
    },
    {
      field: 'location',
      headerName: 'LOCATION',
      width: 200,
      renderCell: (p) => (
        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
          {p.value || '-'}
        </Typography>
      )
    },
    {
      field: 'creditPeriodDays',
      headerName: 'CREDIT PERIOD',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => (
        <Box sx={{
          px: 1.6,
          py: 0.5,
          borderRadius: '8px',
          bgcolor: BRAND.infoBg,
          border: `1px solid ${BRAND.infoBorder}`,
          color: BRAND.infoLight,
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          boxShadow: '0 0 12px rgba(6, 182, 212, 0.15)',
        }}>
          <CreditCard size={12} />
          {p.value || 0} days
        </Box>
      )
    },
    {
      field: 'leadTimeDays',
      headerName: 'LEAD TIME',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => (
        <Box sx={{
          px: 1.6,
          py: 0.5,
          borderRadius: '8px',
          bgcolor: BRAND.wipBg,
          border: `1px solid ${BRAND.wipBorder}`,
          color: BRAND.secondaryLight,
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          boxShadow: '0 0 12px rgba(168, 85, 247, 0.15)',
        }}>
          <Clock size={12} />
          {p.value || 0} days
        </Box>
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
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <Users size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Parties Master
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Manage customer accounts, credit parameters, and fulfillment lead times
            </Typography>
          </Box>
        </Box>

        {/* Action Controls */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 1.5,
          width: { xs: '100%', md: 'auto' }
        }}>
          <TextField
            size="small"
            placeholder="Search parties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 260 },
            }}
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
            onClick={() => setIsCreateOpen(true)}
            sx={{ width: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
          >
            Add Party
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
          rows={displayRows}
          columns={columns}
          getRowId={(row) => row._id || row.code}
          loading={isLoading && displayRows.length === 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          rowHeight={52}
          columnHeaderHeight={46}
          sx={{ border: 0 }}
        />
      </Paper>

      {/* Add Party Drawer */}
      <PartyCreateModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </Box>
  );
};

export default PartiesList;
