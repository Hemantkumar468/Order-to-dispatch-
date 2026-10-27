import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, IconButton, Button, TextField,
  CircularProgress, Grid, Divider
} from '@mui/material';
import { X, Save, Users, Building, Phone, CreditCard, Clock, MapPin } from 'lucide-react';
import { useCreatePartyMutation } from '../../store/api/partyApi';
import { useSnackbar } from 'notistack';
import { BRAND } from '../../theme/brand';

const initialFormState = {
  name: '',
  code: '',
  location: '',
  state: '',
  gstNo: '',
  contactPerson: '',
  phone: '',
  email: '',
  creditPeriodDays: 30,
  leadTimeDays: 7,
  line1: '',
  line2: '',
  city: '',
  pin: '',
};

const PartyCreateModal = ({ open, onClose }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [createParty, { isLoading }] = useCreatePartyMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      setForm(initialFormState);
      setErrors({});
    }
  }, [open]);

  const handleChange = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-suggest code if name changes and code is empty or untouched
      if (field === 'name' && (!prev.code || prev.code === prev.name.slice(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, ''))) {
        updated.code = value.slice(0, 8).toUpperCase().replace(/[^A-Z0-9]/g, '');
      }
      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Party name is required';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (form.gstNo && form.gstNo.length > 20) {
      newErrors.gstNo = 'GST number cannot exceed 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      code: form.code.trim().toUpperCase() || undefined,
      location: form.location.trim() || undefined,
      state: form.state.trim() || undefined,
      gstNo: form.gstNo.trim().toUpperCase() || undefined,
      contactPerson: form.contactPerson.trim() || undefined,
      phone: form.phone.trim() || undefined,
      email: form.email.trim().toLowerCase() || undefined,
      creditPeriodDays: Number(form.creditPeriodDays) || 30,
      leadTimeDays: Number(form.leadTimeDays) || 7,
      addresses: (form.line1 || form.city || form.pin) ? [{
        label: 'Primary',
        line1: form.line1.trim() || undefined,
        line2: form.line2.trim() || undefined,
        city: form.city.trim() || form.location.trim() || undefined,
        state: form.state.trim() || undefined,
        pin: form.pin.trim() || undefined,
      }] : [],
    };

    try {
      await createParty(payload).unwrap();
      enqueueSnackbar('Party account created successfully!', { variant: 'success' });
      onClose();
    } catch (err) {
      const msg = err?.data?.message || err?.message || 'Failed to create party. Please verify details.';
      enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 540, md: 600 },
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
            <Building size={22} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.text.primary, lineHeight: 1.2 }}>
              Add New Party
            </Typography>
            <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>
              Create customer account, credit terms & logistics lead time
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary } }}
        >
          <X size={20} />
        </IconButton>
      </Box>

      {/* Form Content */}
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Section 1: Basic Information */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Users size={16} color={BRAND.primary} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: BRAND.text.primary, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              Account Identity
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                size="small"
                label="Party / Company Name"
                placeholder="e.g. Sunrise Home Appliances Ltd."
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
                label="Party Code"
                placeholder="e.g. SUNRISE"
                value={form.code}
                onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                helperText="Short uppercase code for billing & reports"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="GSTIN Number"
                placeholder="e.g. 33AABCS1429B1Z1"
                value={form.gstNo}
                onChange={(e) => handleChange('gstNo', e.target.value.toUpperCase())}
                error={Boolean(errors.gstNo)}
                helperText={errors.gstNo}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: BRAND.surface.border }} />

        {/* Section 2: Contact & Location */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Phone size={16} color={BRAND.primary} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: BRAND.text.primary, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              Contact & Location
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Location / City"
                placeholder="e.g. Chennai"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="State"
                placeholder="e.g. Tamil Nadu"
                value={form.state}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Contact Person"
                placeholder="e.g. Rajesh Kumar"
                value={form.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                placeholder="e.g. +91 98765 43210"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="email"
                label="Email Address"
                placeholder="e.g. accounts@sunriseappliances.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: BRAND.surface.border }} />

        {/* Section 3: Commercial & Planning Parameters */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <CreditCard size={16} color={BRAND.primary} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: BRAND.text.primary, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              Commercial & Fulfillment Parameters
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Credit Period (Days)"
                value={form.creditPeriodDays}
                onChange={(e) => handleChange('creditPeriodDays', e.target.value)}
                InputProps={{
                  inputProps: { min: 0, max: 365 },
                  endAdornment: <Typography variant="caption" sx={{ color: BRAND.text.secondary, mr: 1 }}>Days</Typography>
                }}
                helperText="Allowed payment credit duration"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Fulfillment Lead Time (Days)"
                value={form.leadTimeDays}
                onChange={(e) => handleChange('leadTimeDays', e.target.value)}
                InputProps={{
                  inputProps: { min: 0, max: 90 },
                  endAdornment: <Typography variant="caption" sx={{ color: BRAND.text.secondary, mr: 1 }}>Days</Typography>
                }}
                helperText="Standard order-to-dispatch transit days"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: BRAND.surface.border }} />

        {/* Section 4: Primary Address */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <MapPin size={16} color={BRAND.primary} />
            <Typography variant="subtitle2" fontWeight={700} sx={{ color: BRAND.text.primary, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
              Billing / Delivery Address (Optional)
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Address Line 1"
                placeholder="Plot/Building No., Industrial Area"
                value={form.line1}
                onChange={(e) => handleChange('line1', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Address Line 2"
                placeholder="Street, Landmark"
                value={form.line2}
                onChange={(e) => handleChange('line2', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="City / District"
                placeholder="City"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Postal PIN Code"
                placeholder="6-digit PIN"
                value={form.pin}
                onChange={(e) => handleChange('pin', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

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
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          sx={{ px: 2.5 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
          sx={{ px: 3 }}
        >
          {isLoading ? 'Saving Party...' : 'Save Party'}
        </Button>
      </Box>
    </Drawer>
  );
};

export default PartyCreateModal;
