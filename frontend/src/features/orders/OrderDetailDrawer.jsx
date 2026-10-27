import React from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Chip, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Button, Tooltip
} from '@mui/material';
import { X, FileText, ExternalLink, CheckCircle2, Clock, AlertCircle, Truck, Calendar } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import { useGetOrderByIdQuery } from '../../store/api/orderApi';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const WORKFLOW_STEPS = [
  { key: 'poEntry', label: 'PO Entry in Tally', who: 'Upasana' },
  { key: 'inventoryCheck', label: 'Check Inventory', who: 'Upasana' },
  { key: 'scheduling', label: 'Create Dispatch Schedule', who: 'Aarti' },
  { key: 'emailSchedule', label: 'Email Dispatch Schedule', who: 'Aarti' },
];

const StatusBadge = ({ value }) => {
  const map = {
    RECEIVED: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warningLight },
    PLANNING: { bg: BRAND.wipBg, border: BRAND.wipBorder, color: BRAND.secondaryLight },
    IN_PROGRESS: { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)', color: BRAND.primaryLight },
    COMPLETED: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.successLight },
    CANCELLED: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.errorLight },
    SHORT_CLOSED: { bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)', color: '#cbd5e1' },
  };
  const badge = map[value] || { bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)', color: '#94a3b8' };

  return (
    <Box sx={{
      px: 1.5,
      py: 0.4,
      borderRadius: '8px',
      bgcolor: badge.bg,
      border: `1px solid ${badge.border}`,
      color: badge.color,
      fontSize: '0.7rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      display: 'inline-block',
      letterSpacing: '0.04em',
    }}>
      {value?.replace('_', ' ')}
    </Box>
  );
};

const StepIcon = ({ status }) => {
  if (status === 'DONE') return <CheckCircle2 size={16} color={BRAND.successLight} />;
  if (status === 'DELAYED') return <AlertCircle size={16} color={BRAND.errorLight} />;
  return <Clock size={16} color="#64748b" />;
};

const InfoRow = ({ label, value, href }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.8, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.8rem' }}>{label}</Typography>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" style={{ color: BRAND.primaryLight, fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
        View <ExternalLink size={12} />
      </a>
    ) : (
      <Typography variant="body2" fontWeight={700} sx={{ color: '#f8fafc', fontSize: '0.8rem' }}>{value || '—'}</Typography>
    )}
  </Box>
);

const OrderDetailDrawer = ({ open, onClose, orderId }) => {
  const { data: orderRes, isLoading } = useGetOrderByIdQuery(orderId, { skip: !orderId });
  const order = orderRes?.data;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      disableEnforceFocus
      PaperProps={{
        sx: {
          width: { xs: '100%', md: 620 },
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: BRAND.surface.card,
          borderLeft: `1px solid ${BRAND.surface.border}`,
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, pb: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Box sx={{
              px: 1.2,
              py: 0.35,
              borderRadius: '6px',
              bgcolor: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
            }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: BRAND.primaryLight }}>
                {order?.soNumber || 'Order Details'}
              </Typography>
            </Box>
            {order && <StatusBadge value={order.status} />}
          </Box>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
            {order?.partyName} • {order?.location || 'Direct Delivery'}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
          <X size={20} />
        </IconButton>
      </Box>

      {/* Body Content */}
      <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Skeleton height={40} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton height={120} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton height={200} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
        ) : order ? (
          <>
            {/* Quick Metrics */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 3 }}>
              <Box sx={{ p: 2, bgcolor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Ordered</Typography>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff' }}>{order.totalOrderQty?.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: BRAND.successBg, border: `1px solid ${BRAND.successBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Dispatched</Typography>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 900, color: BRAND.successLight }}>{order.totalDispatchedQty?.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: BRAND.errorBg, border: `1px solid ${BRAND.errorBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Balance</Typography>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 900, color: BRAND.errorLight }}>{order.totalBalanceQty?.toLocaleString('en-IN')}</Typography>
              </Box>
            </Box>

            {/* SKU Items Table */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              SKU Line Items ({order.items?.length || 0})
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', mb: 3, boxShadow: 'none', border: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header, overflowX: 'auto' }}>
              <Table size="small" sx={{ minWidth: 480 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>SKU</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Code</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Order</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Dispatched</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items?.map((item, idx) => (
                    <TableRow key={item._id || idx} sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <Typography variant="body2" fontWeight={700} sx={{ color: '#f8fafc', fontSize: '0.82rem' }}>{item.skuName}</Typography>
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <Typography variant="caption" sx={{ color: BRAND.primaryLight, fontWeight: 700 }}>{item.skuCode}</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: '#ffffff' }}>
                        {item.orderQty}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: BRAND.successLight }}>
                        {item.dispatchedQty}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: item.balanceQty > 0 ? BRAND.errorLight : BRAND.successLight }}>
                        {item.balanceQty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Order Attributes */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Order Attributes
            </Typography>
            <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: BRAND.surface.header, border: `1px solid ${BRAND.surface.border}` }}>
              <InfoRow label="PO Number" value={order.poNumber} />
              <InfoRow label="PO Date" value={dayjs(order.poDate).format('DD MMMM YYYY')} />
              <InfoRow label="Booked On" value={dayjs(order.orderDate).format('DD MMMM YYYY')} />
              <InfoRow label="Transport Mode" value={order.transport} />
              <InfoRow label="Lead Time Target" value={`${order.leadTimeDays || 7} Days`} />
            </Paper>

            {/* Workflow Progress */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Fulfillment Pipeline
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 2 }}>
              {WORKFLOW_STEPS.map((step) => {
                const data = order[step.key] || {};
                const isDone = data.status === 'DONE';
                return (
                  <Box key={step.key} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.6,
                    borderRadius: '10px',
                    bgcolor: isDone ? BRAND.successBg : 'rgba(255,255,255,0.02)',
                    border: '1px solid',
                    borderColor: isDone ? BRAND.successBorder : 'rgba(255,255,255,0.06)'
                  }}>
                    <StepIcon status={data.status} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={700} sx={{ color: isDone ? '#ffffff' : '#cbd5e1', fontSize: '0.82rem' }}>
                        {step.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>Assigned: {step.who}</Typography>
                    </Box>
                    <Box sx={{
                      px: 1.2,
                      py: 0.3,
                      borderRadius: '6px',
                      bgcolor: isDone ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                      color: isDone ? BRAND.successLight : '#94a3b8',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                    }}>
                      {data.status || 'PENDING'}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </>
        ) : null}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header }}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Close Drawer
        </Button>
      </Box>
    </Drawer>
  );
};

export default OrderDetailDrawer;
