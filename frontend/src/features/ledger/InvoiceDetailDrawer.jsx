import React from 'react';
import {
  Drawer, Box, Typography, IconButton, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Button, LinearProgress
} from '@mui/material';
import {
  X, ExternalLink, DollarSign, Printer
} from 'lucide-react';
import { useGetInvoiceQuery } from '../../store/api/fmsApi';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const STATUS_CONFIG = {
  PAID: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.success },
  PARTIALLY_PAID: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warning },
  PENDING: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.error },
  OVERDUE: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.error },
};

const PaymentBadge = ({ value }) => {
  const cfg = STATUS_CONFIG[value] || { bg: BRAND.infoBg, border: BRAND.infoBorder, color: BRAND.info };
  return (
    <Box sx={{
      px: 1.5,
      py: 0.4,
      borderRadius: '8px',
      bgcolor: cfg.bg,
      border: `1px solid ${cfg.border}`,
      color: cfg.color,
      fontSize: '0.7rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      display: 'inline-block',
      letterSpacing: '0.04em',
    }}>
      {value?.replace('_', ' ') || 'PENDING'}
    </Box>
  );
};

const InfoRow = ({ label, value, href }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.9, borderBottom: `1px solid ${BRAND.surface.border}` }}>
    <Typography variant="body2" sx={{ color: BRAND.text.secondary, fontWeight: 500, fontSize: '0.8rem' }}>{label}</Typography>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" style={{ color: BRAND.primary, fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
        View Document <ExternalLink size={12} />
      </a>
    ) : (
      <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary, fontSize: '0.82rem', textAlign: 'right' }}>{value || '—'}</Typography>
    )}
  </Box>
);

const InvoiceDetailDrawer = ({ open, onClose, invoiceId, onRecordPayment }) => {
  const { data: invoiceRes, isLoading } = useGetInvoiceQuery(invoiceId, { skip: !invoiceId });
  const invoice = invoiceRes?.data;

  const total = invoice?.invoiceAmount || 0;
  const received = invoice?.amountReceived || 0;
  const balance = Math.max(0, total - received);
  const paidPercent = total > 0 ? Math.min(100, Math.round((received / total) * 100)) : 0;

  const dcItems = invoice?.dcId?.items || [];
  const shipment = invoice?.shipment;
  const payments = invoice?.payments || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      disableEnforceFocus
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 660 },
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#ffffff',
          borderLeft: `1px solid ${BRAND.surface.border}`,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${BRAND.surface.border}`, bgcolor: '#ffffff' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box sx={{
              px: 1.2,
              py: 0.35,
              borderRadius: '6px',
              bgcolor: 'rgba(79, 70, 229, 0.1)',
              border: '1px solid rgba(79, 70, 229, 0.25)',
            }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: BRAND.primary }}>
                {invoice?.invoiceNo || 'Tax Invoice'}
              </Typography>
            </Box>
            {invoice && <PaymentBadge value={invoice.status} />}
          </Box>
          <Typography variant="body2" sx={{ color: BRAND.text.secondary, mt: 0.5 }}>
            {invoice?.partyName || invoice?.partyId?.name || 'Customer Billing Details'} • DC: {invoice?.dcNumber || '—'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary } }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Body Content */}
      <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton height={40} sx={{ bgcolor: 'rgba(0,0,0,0.06)' }} />
            <Skeleton height={120} sx={{ bgcolor: 'rgba(0,0,0,0.06)' }} />
            <Skeleton height={200} sx={{ bgcolor: 'rgba(0,0,0,0.06)' }} />
          </Box>
        ) : invoice ? (
          <>
            {/* Quick Metrics */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 2 }}>
              <Box sx={{ p: 2, bgcolor: 'rgba(79, 70, 229, 0.06)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: BRAND.text.secondary, textTransform: 'uppercase', mb: 0.5 }}>Invoice Amount</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: BRAND.text.primary }}>
                  ₹{total.toLocaleString('en-IN')}
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: BRAND.successBg, border: `1px solid ${BRAND.successBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: BRAND.text.secondary, textTransform: 'uppercase', mb: 0.5 }}>Received</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: BRAND.success }}>
                  ₹{received.toLocaleString('en-IN')}
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: balance > 0 ? BRAND.errorBg : BRAND.successBg, border: `1px solid ${balance > 0 ? BRAND.errorBorder : BRAND.successBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: BRAND.text.secondary, textTransform: 'uppercase', mb: 0.5 }}>Balance Due</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: balance > 0 ? BRAND.error : BRAND.success }}>
                  ₹{balance.toLocaleString('en-IN')}
                </Typography>
              </Box>
            </Box>

            {/* Payment Progress Bar */}
            <Box sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                <Typography variant="caption" sx={{ color: BRAND.text.secondary, fontWeight: 600 }}>Payment Clearance</Typography>
                <Typography variant="caption" sx={{ color: BRAND.success, fontWeight: 800 }}>{paidPercent}% Cleared</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={paidPercent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: '#e2e8f0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: paidPercent === 100 ? BRAND.success : BRAND.primary,
                    borderRadius: 4,
                  }
                }}
              />
            </Box>

            {/* Invoice & Client Particulars */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.secondary, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Billing Particulars
            </Typography>
            <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
              <InfoRow label="Invoice Number" value={invoice.invoiceNo} />
              <InfoRow label="Invoice Date" value={invoice.invoiceDate ? dayjs(invoice.invoiceDate).format('DD MMMM YYYY') : '—'} />
              <InfoRow label="Customer / Party" value={invoice.partyName || invoice.partyId?.name} />
              {invoice.partyId?.code && <InfoRow label="Party Code" value={invoice.partyId.code} />}
              {invoice.partyId?.gstNumber && <InfoRow label="GSTIN" value={invoice.partyId.gstNumber} />}
              <InfoRow label="Delivery Challan Ref" value={invoice.dcNumber} />
              {invoice.poNumber && <InfoRow label="Customer PO Number" value={invoice.poNumber} />}
              {invoice.remarks && <InfoRow label="Remarks" value={invoice.remarks} />}
            </Paper>

            {/* SKU Line Items (from DC) */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.secondary, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Dispatched Line Items {dcItems.length > 0 ? `(${dcItems.length})` : ''}
            </Typography>
            {dcItems.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: '12px', mb: 3, boxShadow: 'none', border: `1px solid ${BRAND.surface.border}`, bgcolor: '#ffffff', overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 460 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>SKU Item</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>Qty (Pcs)</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>Boxes</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>Pcs/Box</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: BRAND.text.secondary, borderBottom: `1px solid ${BRAND.surface.border}` }}>Weight</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dcItems.map((item, idx) => (
                      <TableRow key={item._id || idx} sx={{ '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ borderBottom: '1px solid #f1f5f9' }}>
                          <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary, fontSize: '0.82rem' }}>{item.skuName}</Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: BRAND.text.primary }}>
                          {item.quantityPcs?.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: BRAND.text.secondary }}>
                          {item.noOfBoxes || '-'}
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: BRAND.text.muted }}>
                          {item.pcsPerBox || '-'}
                        </TableCell>
                        <TableCell align="right" sx={{ borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: BRAND.primary }}>
                          {item.weightKg ? `${item.weightKg} kg` : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
                <InfoRow label="SKU Description" value={invoice.skuSummary || 'Standard Goods / Components'} />
                <InfoRow label="Dispatched Quantity" value={invoice.dispatchQtySummary || 'As per Delivery Challan'} />
              </Paper>
            )}

            {/* Shipment & Freight Details */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.secondary, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Freight & Logistics (FMS Clearance)
            </Typography>
            <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
              <InfoRow label="Transporter" value={shipment?.transporterName || invoice.dcId?.dispatchedThrough || 'Direct Logistics'} />
              <InfoRow label="Freight Type" value={shipment?.transportType || 'Freight Paid'} />
              <InfoRow label="LR / Docket #" value={shipment?.lrNumber || '—'} />
              {invoice.dcId?.vehicleNo && <InfoRow label="Vehicle No" value={invoice.dcId.vehicleNo} />}
              <InfoRow label="Delivery Status" value={shipment?.tracking?.status || 'DELIVERED'} />
              {shipment?.tracking?.deliveryDate && (
                <InfoRow label="Delivery Date" value={dayjs(shipment.tracking.deliveryDate).format('DD MMMM YYYY')} />
              )}
            </Paper>

            {/* Payment Clearance Ledger */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.secondary, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Payment Clearance Ledger
            </Typography>
            {payments.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                {payments.map((p, idx) => (
                  <Paper key={p._id || idx} sx={{ p: 1.8, borderRadius: '10px', bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.text.primary }}>
                        {p.type?.replace('_', ' ') || 'Client Payment'}
                      </Typography>
                      <Typography variant="body2" fontWeight={800} sx={{ color: BRAND.success }}>
                        ₹{(p.confirmation?.receivedAmount || invoice.amountReceived || 0).toLocaleString('en-IN')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: BRAND.text.muted }}>
                      <span>Credit Period: {p.confirmation?.creditPeriodDays || 30} Days</span>
                      <span>
                        {p.confirmation?.receivedDate ? dayjs(p.confirmation.receivedDate).format('DD MMM YYYY') : 'Pending settlement'}
                      </span>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: '#f8fafc', border: `1px solid ${BRAND.surface.border}` }}>
                <InfoRow label="Amount Received" value={`₹${received.toLocaleString('en-IN')}`} />
                <InfoRow label="Outstanding Amount" value={`₹${balance.toLocaleString('en-IN')}`} />
                <InfoRow label="Settlement Status" value={invoice.status || 'PENDING'} />
              </Paper>
            )}
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: BRAND.text.muted }}>
            <Typography>Invoice details not found.</Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}`, bgcolor: '#ffffff', display: 'flex', gap: 1.5 }}>
        {onRecordPayment && (
          <Button
            variant="contained"
            color="success"
            startIcon={<DollarSign size={16} />}
            onClick={() => onRecordPayment(invoice)}
            sx={{ flex: 1, fontWeight: 700 }}
          >
            Record Payment
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<Printer size={16} />}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Drawer>
  );
};

export default InvoiceDetailDrawer;
