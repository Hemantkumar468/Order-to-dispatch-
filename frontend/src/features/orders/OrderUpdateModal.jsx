import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Button, 
  Chip,
  TextField,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { X, CheckCircle2, Clock, AlertCircle, Save } from 'lucide-react';
import { useUpdateOrderMutation } from '../../store/api/orderApi';
import { useSnackbar } from 'notistack';
import { BRAND } from '../../theme/brand';

const WORKFLOW_STEPS = [
  { key: 'poEntry', label: 'PO Entry' },
  { key: 'inventoryCheck', label: 'Inventory Check' },
  { key: 'scheduling', label: 'PPC Scheduling' },
  { key: 'emailSchedule', label: 'Email Schedule' },
  { key: 'paymentCheck', label: 'Payment Check' },
  { key: 'ocEntry', label: 'OC Entry' },
  { key: 'productionFollowUp', label: 'Production Follow-up' },
  { key: 'loadingAdvice', label: 'Loading Advice' },
  { key: 'loadingFollowUp', label: 'Loading Follow-up' },
  { key: 'invoicing', label: 'Invoicing' },
  { key: 'dispatchDetails', label: 'Dispatch Details' },
  { key: 'podFollowUp', label: 'POD Follow-up' },
  { key: 'paymentFollowUp', label: 'Payment Follow-up' },
];

const StatusIcon = ({ status }) => {
  if (status === 'DONE') return <CheckCircle2 size={20} color={BRAND.successLight} />;
  if (status === 'DELAYED') return <AlertCircle size={20} color={BRAND.errorLight} />;
  return <Clock size={20} color="#64748b" />;
};

const OrderUpdateModal = ({ open, onClose, order }) => {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(order || {});

  const handleStatusChange = (stepKey, newStatus) => {
    setFormData({
      ...formData,
      [stepKey]: {
        ...formData[stepKey],
        status: newStatus,
        completedAt: newStatus === 'DONE' ? new Date().toISOString() : formData[stepKey]?.completedAt
      }
    });
  };

  const handleSave = async () => {
    try {
      await updateOrder({ id: order._id, ...formData }).unwrap();
      enqueueSnackbar('Order updated successfully', { variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar('Failed to update order', { variant: 'error' });
    }
  };

  if (!order) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      disableEnforceFocus
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 460 },
          p: 0,
          bgcolor: BRAND.surface.card,
          borderLeft: `1px solid ${BRAND.surface.border}`,
          display: 'flex',
          flexDirection: 'column',
        }
      }}
    >
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#ffffff', borderBottom: `1px solid ${BRAND.surface.border}` }}>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ color: BRAND.text.primary }}>Update Workflow</Typography>
          <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>SO: {order.soNumber} • {order.partyName}</Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary } }}>
          <X size={20} />
        </IconButton>
      </Box>

      <Box sx={{ p: 2.5, flexGrow: 1, overflowY: 'auto' }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 0 }}>
          {WORKFLOW_STEPS.map((step) => {
            const stepData = formData[step.key] || { status: 'PENDING' };
            const isDone = stepData.status === 'DONE';
            return (
              <ListItem 
                key={step.key}
                sx={{ 
                  border: '1px solid',
                  borderColor: isDone ? BRAND.successBorder : BRAND.surface.border,
                  borderRadius: '12px',
                  p: 1.8,
                  bgcolor: isDone ? BRAND.successBg : '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <StatusIcon status={stepData.status} />
                  <ListItemText 
                    primary={step.label} 
                    primaryTypographyProps={{ fontWeight: 700, fontSize: '0.85rem', color: BRAND.text.primary }}
                  />
                </Box>
                <TextField
                  select
                  size="small"
                  value={stepData.status || 'PENDING'}
                  onChange={(e) => handleStatusChange(step.key, e.target.value)}
                  sx={{ width: 130 }}
                >
                  <MenuItem value="PENDING">PENDING</MenuItem>
                  <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
                  <MenuItem value="DONE">DONE</MenuItem>
                  <MenuItem value="DELAYED">DELAYED</MenuItem>
                </TextField>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}`, display: 'flex', gap: 2, bgcolor: '#ffffff' }}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={handleSave}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
        >
          Save Updates
        </Button>
      </Box>
    </Drawer>
  );
};

export default OrderUpdateModal;
