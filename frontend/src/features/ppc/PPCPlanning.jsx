import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, TextField, MenuItem, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Download, Calendar, Layers } from 'lucide-react';
import { useGetPpcMonthDataQuery } from '../../store/api/ppcApi';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const PPCPlanning = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const year = currentDate.year();
  const month = currentDate.month() + 1;

  const { data, isLoading } = useGetPpcMonthDataQuery({ year, month });

  const dynamicColumns = useMemo(() => {
    const daysInMonth = currentDate.daysInMonth();
    const cols = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      cols.push({
        field: `plan_${dateStr}`,
        headerName: `${String(i).padStart(2, '0')}`,
        width: 65,
        align: 'center',
        headerAlign: 'center',
        sortable: false,
        renderCell: (params) => {
          const planData = params.row.dailyPlan?.find(p => p.date.startsWith(dateStr));
          const plan = planData?.dispPlan;
          const actual = planData?.dispActual;
          return (
            <Box sx={{ textAlign: 'center', lineHeight: 1.3 }}>
              <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: BRAND.primaryLight }}>{plan || '-'}</Typography>
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: actual ? BRAND.successLight : '#64748b' }}>{actual || '-'}</Typography>
            </Box>
          );
        }
      });
    }
    return cols;
  }, [currentDate, year, month]);

  const baseColumns = [
    {
      field: 'soNumber',
      headerName: 'SO #',
      width: 140,
      renderCell: (p) => (
        <Box sx={{
          px: 1.2,
          py: 0.35,
          borderRadius: '6px',
          bgcolor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'inline-flex',
        }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: BRAND.primaryLight }}>
            {p.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'partyName',
      headerName: 'PARTY',
      width: 180,
      renderCell: (p) => <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#f8fafc' }}>{p.value}</Typography>
    },
    {
      field: 'skuName',
      headerName: 'SKU',
      width: 180,
      renderCell: (p) => <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 500 }} noWrap>{p.value}</Typography>
    },
    {
      field: 'orderQty',
      headerName: 'ORD QTY',
      width: 95,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary }}>{p.value?.toLocaleString('en-IN') || '-'}</Typography>
    },
    {
      field: 'balanceQty',
      headerName: 'BAL QTY',
      width: 95,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.error }}>{p.value?.toLocaleString('en-IN') || '-'}</Typography>
    },
    {
      field: 'totalQtyToProduce',
      headerName: 'TO PROD',
      width: 95,
      type: 'number',
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.warning }}>{p.value?.toLocaleString('en-IN') || '-'}</Typography>
    },
  ];

  const columns = [...baseColumns, ...dynamicColumns];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, p: { xs: 2, sm: 3 }, minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <Layers size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              PPC Schedule vs Supply
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Production planning matrix, daily target vs actual dispatch tracking
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            select
            size="small"
            value={month}
            onChange={(e) => setCurrentDate(currentDate.month(e.target.value - 1))}
            sx={{ width: { xs: 'calc(50% - 6px)', sm: 140 } }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{dayjs().month(i).format('MMMM')}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            value={year}
            onChange={(e) => setCurrentDate(currentDate.year(e.target.value))}
            sx={{ width: { xs: 'calc(50% - 6px)', sm: 110 } }}
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            startIcon={<Download size={16} />} 
            sx={{ width: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
          >
            Export Matrix
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
          getRowId={(row) => `${row.orderId}_${row.skuId}`}
          loading={isLoading}
          disableRowSelectionOnClick
          rowHeight={50}
          columnHeaderHeight={46}
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
};

export default PPCPlanning;
