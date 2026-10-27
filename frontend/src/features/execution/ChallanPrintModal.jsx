import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Box,
  Typography, Button, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Divider
} from '@mui/material';
import { X, Printer, Download, Truck } from 'lucide-react';
import { formatDcNumber } from './ChallanDetailDrawer';
import dayjs from 'dayjs';

const ChallanPrintModal = ({ open, onClose, challan }) => {
  if (!challan) return null;

  const items = challan.items || [];
  const totalQty = challan.totalQuantityPcs || items.reduce((s, i) => s + (i.quantityPcs || 0), 0);
  const totalBoxes = challan.totalBoxes || items.reduce((s, i) => s + (i.noOfBoxes || 0), 0);
  const totalWeight = challan.totalWeightKg || items.reduce((s, i) => s + (i.weightKg || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#ffffff',
          color: '#0f172a',
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="subtitle1" fontWeight={800} color="#0f172a">
          Challan Print Preview — {formatDcNumber(challan.dcNumber)}
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: '#64748b' }}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box id="printable-challan" sx={{ p: 2, bgcolor: '#ffffff', color: '#0f172a' }}>
          {/* Company Header */}
          <Box sx={{ textAlign: 'center', pb: 2, borderBottom: '2px solid #0f172a', mb: 2 }}>
            <Typography variant="h5" fontWeight={900} sx={{ letterSpacing: '0.05em', color: '#0f172a' }}>
              HEMANT GLOBAL ENTERPRISES
            </Typography>
            <Typography variant="caption" sx={{ color: '#475569', display: 'block' }}>
              Plot No. 48, Industrial Area, Phase II, New Delhi - 110020 • GSTIN: 07AABCH1234F1Z8
            </Typography>
            <Typography variant="h6" fontWeight={800} sx={{ mt: 1, bgcolor: '#f1f5f9', py: 0.5, borderRadius: '4px', textTransform: 'uppercase' }}>
              DELIVERY CHALLAN & GATE PASS
            </Typography>
          </Box>

          {/* Metadata Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
            <Box sx={{ border: '1px solid #cbd5e1', borderRadius: '6px', p: 1.5 }}>
              <Typography variant="caption" fontWeight={800} sx={{ color: '#64748b', textTransform: 'uppercase' }}>
                Consignee / Deliver To:
              </Typography>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#0f172a', mt: 0.5 }}>
                {challan.partyName || challan.partyId?.name || 'Customer Dispatch'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8rem' }}>
                {challan.deliveryAddress || challan.partyId?.location || 'Direct Warehouse Delivery'}
              </Typography>
              {challan.partyId?.gstNumber && (
                <Typography variant="caption" sx={{ color: '#475569', display: 'block', mt: 0.5 }}>
                  GSTIN: {challan.partyId.gstNumber}
                </Typography>
              )}
            </Box>

            <Box sx={{ border: '1px solid #cbd5e1', borderRadius: '6px', p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Challan No:</span>
                <strong style={{ color: '#0f172a' }}>{formatDcNumber(challan.dcNumber)}</strong>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Date:</span>
                <span>{challan.dcDate ? dayjs(challan.dcDate).format('DD MMM YYYY') : dayjs().format('DD MMM YYYY')}</span>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Sales Order Ref:</span>
                <strong>{challan.soNumber || '—'}</strong>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Vehicle No:</span>
                <strong style={{ color: '#0284c7' }}>{challan.vehicleNo || challan.vehicleNumber || 'DL-01-A-4821'}</strong>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Transporter:</span>
                <span>{challan.transporterName || challan.dispatchedThrough || 'Direct Fleet'}</span>
              </Box>
            </Box>
          </Box>

          {/* Line Items Table */}
          <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #cbd5e1', mb: 3 }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1' }}>Item Description</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1' }}>Quantity (Pcs)</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1' }}>No. of Boxes</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #cbd5e1' }}>Weight (Kg)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ color: '#0f172a', fontWeight: 600, borderBottom: '1px solid #e2e8f0' }}>{item.skuName}</TableCell>
                    <TableCell align="right" sx={{ color: '#0f172a', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>{item.quantityPcs?.toLocaleString()}</TableCell>
                    <TableCell align="right" sx={{ color: '#475569', borderBottom: '1px solid #e2e8f0' }}>{item.noOfBoxes || '-'}</TableCell>
                    <TableCell align="right" sx={{ color: '#475569', borderBottom: '1px solid #e2e8f0' }}>{item.weightKg ? `${item.weightKg} kg` : '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontWeight: 900, color: '#0f172a' }}>TOTAL</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: '#0f172a' }}>{totalQty.toLocaleString()} Pcs</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: '#0f172a' }}>{totalBoxes} Boxes</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: '#0f172a' }}>{totalWeight ? `${Number(totalWeight).toFixed(1)} kg` : '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Signatures */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, pt: 4, mt: 4, borderTop: '1px dashed #cbd5e1', textAlign: 'center' }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>Prepared By</Typography>
              <Box sx={{ height: 35 }} />
              <Typography variant="body2" fontWeight={700}>Dispatch Officer</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>Driver / Carrier Signature</Typography>
              <Box sx={{ height: 35 }} />
              <Typography variant="body2" fontWeight={700}>Driver's Sign</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: '#64748b' }}>Authorized Signatory</Typography>
              <Box sx={{ height: 35 }} />
              <Typography variant="body2" fontWeight={700}>For HEMANT GLOBAL</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#64748b', borderColor: '#cbd5e1' }}>
          Close
        </Button>
        <Button onClick={handlePrint} variant="contained" startIcon={<Printer size={16} />} sx={{ bgcolor: '#0f172a', '&:hover': { bgcolor: '#1e293b' } }}>
          Print Challan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChallanPrintModal;
