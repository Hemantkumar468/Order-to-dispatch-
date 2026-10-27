import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Box,
  Typography, TextField, Button, MenuItem, IconButton, InputAdornment, Stack
} from '@mui/material';
import { X, DollarSign, CheckCircle2 } from 'lucide-react';
import { useUpdateInvoiceMutation, useCreatePaymentMutation } from '../../store/api/fmsApi';
import { useSnackbar } from 'notistack';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const PAYMENT_MODES = ['NEFT / RTGS', 'Cheque', 'Bank Transfer', 'UPI', 'Cash', 'Credit Adjustment'];

const PaymentRecordModal = ({ open, onClose, invoice }) => {
  const [updateInvoice, { isLoading: isUpdating }] = useUpdateInvoiceMutation();
  const [createPayment, { isLoading: isCreating }] = useCreatePaymentMutation();
  const { enqueueSnackbar } = useSnackbar();

  const total = invoice?.invoiceAmount || 0;
  const currentReceived = invoice?.amountReceived || 0;
  const currentBalance = Math.max(0, total - currentReceived);

  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [paymentMode, setPaymentMode] = useState('NEFT / RTGS');
  const [reference, setReference] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (open && invoice) {
      setPaymentAmount(currentBalance > 0 ? String(currentBalance) : '');
      setPaymentDate(dayjs().format('YYYY-MM-DD'));
      setReference('');
      setRemarks('');
    }
  }, [open, invoice, currentBalance]);

  const handleSubmit = async () => {
    const amount = Number(paymentAmount);
    if (!amount || isNaN(amount) || amount <= 0) {
      enqueueSnackbar('Please enter a valid payment amount', { variant: 'error' });
      return;
    }

    const newReceived = currentReceived + amount;
    const newBalance = Math.max(0, total - newReceived);
    const newStatus = newBalance === 0 ? 'PAID' : (newReceived > 0 ? 'PARTIAL' : 'PENDING');

    try {
      await updateInvoice({
        id: invoice._id,
        amountReceived: newReceived,
        balance: newBalance,
        status: newStatus,
        remarks: remarks ? `${invoice.remarks ? invoice.remarks + ' | ' : ''}${remarks}` : invoice.remarks,
      }).unwrap();

      try {
        await createPayment({
          invoiceId: invoice._id,
          dcId: invoice.dcId?._id || invoice.dcId,
          dcNumber: invoice.dcNumber,
          partyId: invoice.partyId?._id || invoice.partyId,
          partyName: invoice.partyName || invoice.partyId?.name,
          type: 'CLIENT_PAYMENT',
          confirmation: {
            creditPeriodDays: 30,
            receivedDate: new Date(paymentDate),
            receivedAmount: amount,
            status: 'DONE',
          },
          remarks: `Mode: ${paymentMode} | Ref: ${reference || 'N/A'}${remarks ? ' | ' + remarks : ''}`,
        }).unwrap();
      } catch (e) {
        // secondary log
      }

      enqueueSnackbar(`Payment of ₹${amount.toLocaleString('en-IN')} recorded successfully!`, { variant: 'success' });
      onClose();
    } catch (err) {
      enqueueSnackbar('Failed to record payment: ' + (err?.data?.message || err.message), { variant: 'error' });
    }
  };

  if (!invoice) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: BRAND.surface.card,
          border: `1px solid ${BRAND.surface.border}`,
          borderRadius: '16px',
          color: '#ffffff',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: `1px solid ${BRAND.surface.border}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ p: 1, borderRadius: '8px', bgcolor: BRAND.successBg, border: `1px solid ${BRAND.successBorder}`, color: BRAND.successLight, display: 'flex' }}>
            <DollarSign size={20} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#ffffff', fontSize: '1.1rem' }}>
              Record Payment
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {invoice.invoiceNo} • {invoice.partyName}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: `1px solid ${BRAND.surface.border}`, borderRadius: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Invoice Total</Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', mt: 0.5 }}>₹{total.toLocaleString('en-IN')}</Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: BRAND.successBg, border: `1px solid ${BRAND.successBorder}`, borderRadius: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Received</Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: BRAND.successLight, mt: 0.5 }}>₹{currentReceived.toLocaleString('en-IN')}</Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: currentBalance > 0 ? BRAND.errorBg : BRAND.successBg, border: `1px solid ${currentBalance > 0 ? BRAND.errorBorder : BRAND.successBorder}`, borderRadius: '10px', textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Balance Due</Typography>
              <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: currentBalance > 0 ? BRAND.errorLight : BRAND.successLight, mt: 0.5 }}>₹{currentBalance.toLocaleString('en-IN')}</Typography>
            </Box>
          </Box>

          <TextField
            label="Payment Amount Received (₹)"
            type="number"
            fullWidth
            required
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Typography sx={{ color: BRAND.successLight, fontWeight: 800 }}>₹</Typography></InputAdornment>
            }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <TextField
              label="Payment Date"
              type="date"
              fullWidth
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Payment Mode"
              fullWidth
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              {PAYMENT_MODES.map((mode) => (
                <MenuItem key={mode} value={mode}>{mode}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            label="Reference / UTR / Cheque #"
            fullWidth
            placeholder="e.g. UTR492817492 or CHQ-0029"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />

          <TextField
            label="Remarks / Note"
            fullWidth
            multiline
            rows={2}
            placeholder="Optional settlement notes..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}` }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="success"
          disabled={isUpdating || isCreating}
          startIcon={<CheckCircle2 size={16} />}
          sx={{ fontWeight: 700 }}
        >
          {isUpdating ? 'Saving...' : 'Confirm Payment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentRecordModal;
