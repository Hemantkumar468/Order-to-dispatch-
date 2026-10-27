import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, Button, MenuItem,
  Stack, Divider, IconButton, Tooltip, Card, CardContent
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from '../../hooks/DispatchContext';
import { useSnackbar } from 'notistack';
import { Plus, Download, Calendar, Layers } from 'lucide-react';
import dayjs from 'dayjs';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';
import { BRAND } from '../../theme/brand';

export default function PlanCreation() {
  const { state, addPlan } = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedOrder, setSelectedOrder] = useState(state.orders[0]?.id || '');
  const [planDate, setPlanDate] = useState(dayjs().add(3, 'day').format('YYYY-MM-DD'));
  const [plannedQty, setPlannedQty] = useState('');

  const order = state.orders.find(o => o.id === selectedOrder);
  const existingPlans = selectedOrder
    ? state.plans.filter(p => p.orderId === selectedOrder)
    : state.plans;
  const totalPlannedSoFar = existingPlans.reduce((sum, p) => sum + p.plannedQty, 0);
  const remainingToPlan = order ? Math.max(0, order.totalQty - totalPlannedSoFar) : 0;

  const handleAddPlan = () => {
    if (!selectedOrder || !planDate || !plannedQty) {
      enqueueSnackbar('Please fill all required fields', { variant: 'error' });
      return;
    }
    const qty = Number(plannedQty);
    if (qty <= 0) {
      enqueueSnackbar('Quantity must be greater than 0', { variant: 'warning' });
      return;
    }
    addPlan(selectedOrder, planDate, qty);
    enqueueSnackbar('Fulfillment plan created successfully!', { variant: 'success' });
    setPlannedQty('');
  };

  const columns = [
    { field: 'orderId', headerName: 'ORDER REF', width: 170, renderCell: (p) => <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: BRAND.primary }}>{p.value}</Typography> },
    { field: 'date', headerName: 'SCHEDULED DATE', flex: 1, renderCell: (p) => <Typography sx={{ fontSize: '0.82rem', fontWeight: 600 }}>{dayjs(p.value).format('DD MMM YYYY')}</Typography> },
    { field: 'plannedQty', headerName: 'ALLOCATED UNITS', flex: 1, type: 'number', renderCell: (p) => <Typography sx={{ fontSize: '0.84rem', fontWeight: 800, color: BRAND.text.primary }}>{p.value.toLocaleString()} units</Typography> },
  ];

  const handleExportExcel = () => {
    const exportData = existingPlans.map(p => ({ 'Plan ID': p.id, 'Order Ref': p.orderId, 'Date': dayjs(p.date).format('YYYY-MM-DD'), 'Planned Qty': p.plannedQty }));
    exportToExcel(exportData, `plans_${selectedOrder || 'all'}`);
  };

  const handleExportPDF = async () => {
    const exportData = existingPlans.map(p => ({ id: p.id, date: dayjs(p.date).format('YYYY-MM-DD'), plannedQty: p.plannedQty }));
    const pdfCols = [{ field: 'id', headerName: 'Plan ID' }, { field: 'date', headerName: 'Date' }, { field: 'plannedQty', headerName: 'Planned Qty' }];
    await exportToPDF(exportData, `Plans_${selectedOrder || 'all'}`, pdfCols);
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
            <Calendar size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Dispatch Planning
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Allocate future fulfillment capacity against master customer orders
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

      {/* Main Grid */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4.5}>
          <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.primary, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Create Allocation
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Target Order"
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              sx={{ mb: 2 }}
            >
              {state.orders.map(o => (
                <MenuItem key={o.id} value={o.id}>
                  {o.id} — {o.customer}
                </MenuItem>
              ))}
            </TextField>

            {order && (
              <Box sx={{ bgcolor: BRAND.surface.header, p: 2, borderRadius: '10px', mb: 2.5, border: `1px solid ${BRAND.surface.border}` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>Item Description:</Typography>
                  <Typography variant="caption" fontWeight={700} sx={{ color: BRAND.text.primary }}>{order.item}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                  <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>Contract Total:</Typography>
                  <Typography variant="caption" fontWeight={800} sx={{ color: BRAND.text.primary }}>{order.totalQty.toLocaleString()} units</Typography>
                </Box>
                <Divider sx={{ my: 0.8 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: BRAND.primary, fontWeight: 700 }}>Unplanned Balance:</Typography>
                  <Typography variant="caption" fontWeight={900} sx={{ color: BRAND.primary }}>{remainingToPlan.toLocaleString()} units</Typography>
                </Box>
              </Box>
            )}

            <Stack spacing={2}>
              <TextField
                type="date"
                size="small"
                label="Scheduled Dispatch Date"
                InputLabelProps={{ shrink: true }}
                value={planDate}
                onChange={(e) => setPlanDate(e.target.value)}
              />
              <TextField
                type="number"
                size="small"
                label="Allocation Units"
                placeholder="e.g. 2500"
                value={plannedQty}
                onChange={(e) => setPlannedQty(e.target.value)}
              />
              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={handleAddPlan}
                sx={{ py: 1 }}
              >
                Confirm Allocation
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7.5}>
          <Paper sx={{ borderRadius: '16px', overflow: 'hidden', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <Box sx={{ p: 2, px: 2.5, borderBottom: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.primary }}>
                Allocated Delivery Schedules ({existingPlans.length})
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>
                {selectedOrder ? `Filtered for ${selectedOrder}` : 'All active schedules'}
              </Typography>
            </Box>
            <Box sx={{ height: 420, width: '100%' }}>
              <DataGrid
                rows={existingPlans}
                columns={columns}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                rowHeight={50}
                columnHeaderHeight={44}
                sx={{ border: 'none' }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}