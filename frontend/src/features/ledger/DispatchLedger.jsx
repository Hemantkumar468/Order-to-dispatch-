import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, MenuItem, Grid, IconButton,
  Tooltip, Chip, Button, Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from '../../hooks/DispatchContext';
import dayjs from 'dayjs';
import { Download, ScrollText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { BRAND } from '../../theme/brand';

export default function DispatchLedger() {
  const { getLedger, state } = useDispatch();
  const fullLedger = getLedger();
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = fullLedger.filter(row => {
    if (orderFilter !== 'ALL' && row.orderId !== orderFilter) return false;
    if (statusFilter !== 'ALL' && row.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    {
      field: 'date',
      headerName: 'SCHEDULE DATE',
      width: 140,
      renderCell: (p) => <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{dayjs(p.value).format('DD MMM YYYY')}</Typography>
    },
    {
      field: 'orderId',
      headerName: 'ORDER REF',
      width: 170,
      renderCell: (p) => <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: BRAND.primary }}>{p.value}</Typography>
    },
    {
      field: 'customer',
      headerName: 'CUSTOMER',
      flex: 1,
      minWidth: 200,
      renderCell: (p) => <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: BRAND.text.primary }}>{p.value}</Typography>
    },
    {
      field: 'plannedQty',
      headerName: 'PLANNED',
      width: 110,
      type: 'number',
      renderCell: (p) => <Typography sx={{ fontSize: '0.82rem', fontWeight: 700 }}>{p.value.toLocaleString()}</Typography>
    },
    {
      field: 'inheritedCarry',
      headerName: 'ROLLOVER',
      width: 110,
      renderCell: (p) => (
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: p.value > 0 ? BRAND.warning : BRAND.text.secondary }}>
          {p.value > 0 ? `+${p.value.toLocaleString()}` : '—'}
        </Typography>
      )
    },
    {
      field: 'expectedTotal',
      headerName: 'TARGET',
      width: 110,
      type: 'number',
      renderCell: (p) => <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: BRAND.text.primary }}>{p.value.toLocaleString()}</Typography>
    },
    {
      field: 'actualQty',
      headerName: 'ACTUAL',
      width: 110,
      renderCell: (p) => (
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: p.value > 0 ? BRAND.success : BRAND.text.secondary }}>
          {p.value > 0 ? p.value.toLocaleString() : '—'}
        </Typography>
      )
    },
    {
      field: 'referenceNumber',
      headerName: 'CHALLAN #',
      width: 160,
      renderCell: (p) => <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: BRAND.text.secondary }}>{p.value || 'Pending'}</Typography>
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 110,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => {
        const isDone = p.value === 'Done';
        const isWip = p.value === 'WIP';
        const bg = isDone ? BRAND.successBg : isWip ? BRAND.warningBg : 'rgba(148, 163, 184, 0.12)';
        const color = isDone ? BRAND.successLight : isWip ? BRAND.warningLight : BRAND.text.secondary;
        const border = isDone ? BRAND.successBorder : isWip ? BRAND.warningBorder : BRAND.surface.border;
        return (
          <Box sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: '6px',
            bgcolor: bg,
            border: `1px solid ${border}`,
            color: color,
            fontSize: '0.7rem',
            fontWeight: 800,
            textTransform: 'uppercase'
          }}>
            {p.value}
          </Box>
        );
      }
    },
  ];

  const handleExportExcel = () => {
    const exportData = filtered.map(r => ({
      'Date': dayjs(r.date).format('YYYY-MM-DD'),
      'Order': r.orderId,
      'Customer': r.customer,
      'Planned': r.plannedQty,
      'Rollover': r.inheritedCarry,
      'Target': r.expectedTotal,
      'Actual': r.actualQty,
      'Challan Ref': r.referenceNumber,
      'Status': r.status
    }));
    exportToExcel(exportData, 'dispatch_ledger');
  };

  const handleExportPDF = async () => {
    const exportData = filtered.map(r => ({
      date: dayjs(r.date).format('YYYY-MM-DD'),
      orderId: r.orderId,
      plannedQty: r.plannedQty,
      expectedTotal: r.expectedTotal,
      actualQty: r.actualQty,
      status: r.status
    }));
    await exportToPDF(exportData, 'Dispatch_Ledger', columns);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5, minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <ScrollText size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Dispatch Ledger
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Archival log of all planned targets, rollovers, and executed shipment cycles
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" onClick={handleExportExcel} startIcon={<Download size={16} />}>
            Export Excel
          </Button>
          <Button variant="outlined" onClick={handleExportPDF} startIcon={<Download size={16} />}>
            Export PDF
          </Button>
        </Stack>
      </Box>

      {/* Filter Card & DataGrid */}
      <Paper sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`,
      }}>
        <Box sx={{ p: 2, bgcolor: BRAND.surface.header, borderBottom: `1px solid ${BRAND.surface.border}`, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField
            select
            size="small"
            label="Filter by Order"
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260 } }}
          >
            <MenuItem value="ALL">All Master Orders</MenuItem>
            {state.orders.map(o => (
              <MenuItem key={o.id} value={o.id}>
                {o.id} — {o.customer}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: { xs: '100%', sm: 180 } }}
          >
            <MenuItem value="ALL">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="WIP">WIP</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Delayed">Delayed</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            getRowId={(row) => `${row.id || row.planId}_${row.date}`}
            disableRowSelectionOnClick
            rowHeight={50}
            columnHeaderHeight={46}
            sx={{ border: 'none' }}
          />
        </Box>
      </Paper>
    </Box>
  );
}