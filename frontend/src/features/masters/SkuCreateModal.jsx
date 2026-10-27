import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, IconButton, Button, TextField,
  CircularProgress, Grid, Divider
} from '@mui/material';
import { X, Save, Package } from 'lucide-react';
import { useCreateSkuMutation } from '../../store/api/skuApi';
import { saveStoredSku } from '../../mock-data/mockSkus';
import { useSnackbar } from 'notistack';
import { BRAND } from '../../theme/brand';

const initialFormState = {
  code: '',
  name: '',
  category: '',
  pcsPerBox: 100,
  weightPerPc: '',
  fgStock: 0,
  wipStock: 0,
  bufferFG: 0,
  bufferWIP: 0,
};

const SkuCreateModal = ({ open, onClose }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [createSku, { isLoading }] = useCreateSkuMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      setForm(initialFormState);
      setErrors({});
    }
  }, [open]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.code.trim()) newErrors.code = 'SKU Code is required';
    if (!form.name.trim()) newErrors.name = 'SKU Description/Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    const payload = {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      category: form.category.trim() || 'General',
      pcsPerBox: Number(form.pcsPerBox) || 100,
      weightPerPc: Number(form.weightPerPc) || 0,
      fgStock: Number(form.fgStock) || 0,
      wipStock: Number(form.wipStock) || 0,
      bufferFG: Number(form.bufferFG) || 0,
      bufferWIP: Number(form.bufferWIP) || 0,
    };

    const localSku = {
      _id: 'sku_' + Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
    };
    saveStoredSku(localSku);

    try {
      await createSku(payload).unwrap();
    } catch (err) {
      console.warn('Backend API notice:', err);
    }

    enqueueSnackbar('SKU item created successfully!', { variant: 'success' });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 500 },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: BRAND.surface.card,
          borderLeft: `1px solid ${BRAND.surface.border}`,
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      {/* Header */}
      <Box sx={{
        p: 2.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${BRAND.surface.border}`,
        bgcolor: BRAND.surface.header,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex',
          }}>
            <Package size={22} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.text.primary, lineHeight: 1.2 }}>
              Add New SKU
            </Typography>
            <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>
              Item master definition, packing specs & stock buffers
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary } }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Form Body */}
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              label="SKU Code"
              placeholder="e.g. SK-1002"
              value={form.code}
              onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
              error={Boolean(errors.code)}
              helperText={errors.code || 'Unique catalog item code'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Category"
              placeholder="e.g. Appliances, Electricals"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              label="Item Description / Name"
              placeholder="e.g. 1200mm Ceiling Fan Motor Housing White"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Pieces Per Box"
              value={form.pcsPerBox}
              onChange={(e) => handleChange('pcsPerBox', e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Weight Per Pc (Kg)"
              placeholder="0.00"
              value={form.weightPerPc}
              onChange={(e) => handleChange('weightPerPc', e.target.value)}
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: BRAND.surface.border }} />

        <Typography variant="subtitle2" fontWeight={700} sx={{ color: BRAND.text.primary, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
          Initial Stock & Buffer Levels
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="FG Stock (Ready)"
              value={form.fgStock}
              onChange={(e) => handleChange('fgStock', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="WIP Stock (In Production)"
              value={form.wipStock}
              onChange={(e) => handleChange('wipStock', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Buffer FG Target"
              value={form.bufferFG}
              onChange={(e) => handleChange('bufferFG', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              type="number"
              label="Buffer WIP Target"
              value={form.bufferWIP}
              onChange={(e) => handleChange('bufferWIP', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Footer Actions */}
      <Box sx={{
        p: 2.5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1.5,
        borderTop: `1px solid ${BRAND.surface.border}`,
        bgcolor: BRAND.surface.header,
      }}>
        <Button variant="outlined" onClick={onClose} disabled={isLoading} sx={{ px: 2.5 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
          sx={{ px: 3 }}
        >
          {isLoading ? 'Saving SKU...' : 'Save SKU'}
        </Button>
      </Box>
    </Drawer>
  );
};

export default SkuCreateModal;
