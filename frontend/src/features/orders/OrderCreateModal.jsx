import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Button, TextField,
  MenuItem, Autocomplete, CircularProgress, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, InputAdornment
} from '@mui/material';
import { X, Plus, Trash2, Save, FileText, Package } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import { useCreateOrderMutation } from '../../store/api/orderApi';
import { useGetPartiesQuery } from '../../store/api/partyApi';
import { useGetSkusQuery } from '../../store/api/skuApi';
import { useSnackbar } from 'notistack';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const TRANSPORT_OPTIONS = ['Road', 'Rail', 'Air', 'Sea', 'Courier'];

const emptyItem = () => ({
  _tempId: Date.now() + Math.random(),
  skuId: '', skuName: '', skuCode: '', orderQty: '', asnCode: '', remark: '',
});

const OrderCreateModal = ({ open, onClose }) => {
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const { data: partiesData } = useGetPartiesQuery({ limit: 200 });
  const { data: skusData } = useGetSkusQuery({ limit: 500 });
  const { enqueueSnackbar } = useSnackbar();

  const parties = partiesData?.data || [];
  const skus = skusData?.data || [];

  const [form, setForm] = useState({
    poDate: dayjs().format('YYYY-MM-DD'),
    poNumber: '',
    partyId: null,
    partyName: '',
    location: '',
    orderDate: dayjs().format('YYYY-MM-DD'),
    transport: 'Road',
    partyGroup: '',
    orderDocument: '',
    leadTimeDays: 7,
  });

  const [items, setItems] = useState([emptyItem()]);

  useEffect(() => {
    if (open) {
      setForm({
        poDate: dayjs().format('YYYY-MM-DD'),
        poNumber: '',
        partyId: null,
        partyName: '',
        location: '',
        orderDate: dayjs().format('YYYY-MM-DD'),
        transport: 'Road',
        partyGroup: '',
        orderDocument: '',
        leadTimeDays: 7,
      });
      setItems([emptyItem()]);
    }
  }, [open]);

  const handlePartyChange = (_, party) => {
    if (party) {
      setForm(prev => ({
        ...prev,
        partyId: party._id,
        partyName: party.name,
        location: party.location || '',
        leadTimeDays: party.leadTimeDays || 7,
      }));
    } else {
      setForm(prev => ({ ...prev, partyId: null, partyName: '', location: '' }));
    }
  };

  const handleSkuChange = (index, sku) => {
    const updated = [...items];
    if (sku) {
      updated[index] = { ...updated[index], skuId: sku._id, skuName: sku.name, skuCode: sku.code };
    } else {
      updated[index] = { ...updated[index], skuId: '', skuName: '', skuCode: '' };
    }
    setItems(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => setItems(prev => [...prev, emptyItem()]);

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const totalQty = items.reduce((sum, item) => sum + (parseInt(item.orderQty) || 0), 0);
  const validItems = items.filter(i => i.skuId && i.orderQty > 0);

  const handleSubmit = async () => {
    if (!form.poNumber.trim()) {
      return enqueueSnackbar('PO Number is required', { variant: 'warning' });
    }
    if (!form.partyId) {
      return enqueueSnackbar('Please select a Party', { variant: 'warning' });
    }
    if (validItems.length === 0) {
      return enqueueSnackbar('Add at least one SKU line item', { variant: 'warning' });
    }

    try {
      const payload = {
        ...form,
        orderDate: new Date(form.orderDate),
        poDate: form.poDate ? new Date(form.poDate) : null,
        items: validItems.map(({ _tempId, ...item }) => ({
          ...item,
          orderQty: parseInt(item.orderQty),
        })),
      };
      await createOrder(payload).unwrap();
      enqueueSnackbar('Sales Order created successfully!', { variant: 'success' });
      onClose();
    } catch (err) {
      enqueueSnackbar(err?.data?.message || 'Failed to create order', { variant: 'error' });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      disableEnforceFocus
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 740 },
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: BRAND.surface.card,
          borderLeft: `1px solid ${BRAND.surface.border}`,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${BRAND.surface.border}`, bgcolor: '#ffffff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <FileText size={22} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.text.primary }}>New Sales Order</Typography>
            <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>Order Booking Form — Auto SO# Generation</Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary } }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Form Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 2, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.72rem' }}>
          Order Information
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
          <TextField
            label="PO Number *" size="small" value={form.poNumber}
            onChange={(e) => setForm(prev => ({ ...prev, poNumber: e.target.value }))}
            placeholder="e.g. PODM02537/25-26"
          />
          <TextField
            label="PO Date" size="small" type="date" value={form.poDate}
            onChange={(e) => setForm(prev => ({ ...prev, poDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <Autocomplete
            options={parties}
            getOptionLabel={(opt) => opt.name || ''}
            onChange={handlePartyChange}
            renderInput={(params) => <TextField {...params} label="Party Name *" size="small" placeholder="Search parties..." />}
            isOptionEqualToValue={(opt, val) => opt._id === val?._id}
            renderOption={(props, opt) => (
              <li {...props} key={opt._id}>
                <Box>
                  <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary }}>{opt.name}</Typography>
                  <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>{opt.location} • {opt.code}</Typography>
                </Box>
              </li>
            )}
          />
          <TextField
            label="Order Date *" size="small" type="date" value={form.orderDate}
            onChange={(e) => setForm(prev => ({ ...prev, orderDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Transport" size="small" select value={form.transport}
            onChange={(e) => setForm(prev => ({ ...prev, transport: e.target.value }))}
          >
            {TRANSPORT_OPTIONS.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField
            label="Location" size="small" value={form.location}
            onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Auto-filled from party"
          />
          <TextField
            label="Party Group" size="small" value={form.partyGroup}
            onChange={(e) => setForm(prev => ({ ...prev, partyGroup: e.target.value }))}
          />
          <TextField
            label="Lead Time (Days)" size="small" type="number" value={form.leadTimeDays}
            onChange={(e) => setForm(prev => ({ ...prev, leadTimeDays: parseInt(e.target.value) || 7 }))}
          />
        </Box>

        <TextField
          fullWidth label="PO Document Link" size="small" value={form.orderDocument}
          onChange={(e) => setForm(prev => ({ ...prev, orderDocument: e.target.value }))}
          placeholder="Paste Google Drive or document URL"
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><FileText size={16} color="#64748b" /></InputAdornment>,
          }}
        />

        <Divider sx={{ mb: 3, borderColor: BRAND.surface.border }} />

        {/* SKU Line Items */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Package size={16} color={BRAND.primaryLight} />
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.72rem' }}>
              SKU Line Items ({validItems.length})
            </Typography>
          </Box>
          <Button size="small" startIcon={<Plus size={14} />} onClick={addItem}
            sx={{ fontSize: '0.75rem', fontWeight: 800, color: BRAND.primaryLight }}>
            Add Row
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: '12px', mb: 2.5, boxShadow: 'none', border: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header, overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>SKU (Item Name)</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', color: BRAND.text.secondary, width: 100, borderBottom: `1px solid ${BRAND.surface.border}` }}>Code</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', color: BRAND.text.secondary, width: 90, borderBottom: `1px solid ${BRAND.surface.border}` }}>Qty *</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', color: BRAND.text.secondary, width: 110, borderBottom: `1px solid ${BRAND.surface.border}` }}>ASN/FCI</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', color: BRAND.text.secondary, width: 120, borderBottom: `1px solid ${BRAND.surface.border}` }}>Remark</TableCell>
                <TableCell sx={{ width: 40, borderBottom: `1px solid ${BRAND.surface.border}` }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item._tempId} sx={{ '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.05)' }, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <TableCell sx={{ p: 1, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <Autocomplete
                      options={skus}
                      getOptionLabel={(opt) => opt.name || ''}
                      onChange={(_, sku) => handleSkuChange(index, sku)}
                      value={skus.find(s => s._id === item.skuId) || null}
                      size="small"
                      renderInput={(params) => <TextField {...params} placeholder="Select SKU..." variant="standard" InputProps={{ ...params.InputProps, disableUnderline: true, sx: { fontSize: '0.8rem', color: BRAND.text.primary } }} />}
                      isOptionEqualToValue={(opt, val) => opt._id === val?._id}
                      renderOption={(props, opt) => (
                        <li {...props} key={opt._id}>
                          <Box>
                            <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary }}>{opt.name}</Typography>
                            <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>{opt.code}</Typography>
                          </Box>
                        </li>
                      )}
                    />
                  </TableCell>
                  <TableCell sx={{ p: 1, borderBottom: `1px solid ${BRAND.surface.border}` }}>
                    <Typography variant="body2" sx={{ color: BRAND.primary, fontSize: '0.75rem', fontWeight: 700 }}>
                      {item.skuCode || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 1, borderBottom: `1px solid ${BRAND.surface.border}` }}>
                    <TextField
                      variant="standard" type="number" value={item.orderQty}
                      onChange={(e) => handleItemChange(index, 'orderQty', e.target.value)}
                      InputProps={{ disableUnderline: true, sx: { fontSize: '0.82rem', fontWeight: 800, color: BRAND.text.primary } }}
                      placeholder="0"
                    />
                  </TableCell>
                  <TableCell sx={{ p: 1, borderBottom: `1px solid ${BRAND.surface.border}` }}>
                    <TextField
                      variant="standard" value={item.asnCode}
                      onChange={(e) => handleItemChange(index, 'asnCode', e.target.value)}
                      InputProps={{ disableUnderline: true, sx: { fontSize: '0.75rem', color: BRAND.text.secondary } }}
                      placeholder="—"
                    />
                  </TableCell>
                  <TableCell sx={{ p: 1, borderBottom: `1px solid ${BRAND.surface.border}` }}>
                    <TextField
                      variant="standard" value={item.remark}
                      onChange={(e) => handleItemChange(index, 'remark', e.target.value)}
                      InputProps={{ disableUnderline: true, sx: { fontSize: '0.75rem', color: BRAND.text.secondary } }}
                      placeholder="—"
                    />
                  </TableCell>
                  <TableCell sx={{ p: 0.5, borderBottom: `1px solid ${BRAND.surface.border}` }}>
                    <IconButton size="small" onClick={() => removeItem(index)} disabled={items.length === 1}
                      sx={{ color: '#64748b', '&:hover': { color: BRAND.error } }}>
                      <Trash2 size={14} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Bar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 3 }, 
          p: 2.2, 
          bgcolor: 'rgba(79, 70, 229, 0.06)',
          border: '1px solid rgba(79, 70, 229, 0.2)',
          borderRadius: '12px' 
        }}>
          <Box>
            <Typography variant="caption" sx={{ color: BRAND.text.secondary, fontWeight: 700 }}>TOTAL SKUS</Typography>
            <Typography variant="h6" fontWeight={900} sx={{ color: BRAND.text.primary }}>{validItems.length}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: BRAND.text.secondary, fontWeight: 700 }}>TOTAL ORDER QTY</Typography>
            <Typography variant="h6" fontWeight={900} sx={{ color: BRAND.primary }}>{totalQty.toLocaleString('en-IN')}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer Actions */}
      <Box sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}`, display: 'flex', gap: 2, bgcolor: '#ffffff' }}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={isCreating}
          startIcon={isCreating ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
        >
          Create Sales Order
        </Button>
      </Box>
    </Drawer>
  );
};

export default OrderCreateModal;
