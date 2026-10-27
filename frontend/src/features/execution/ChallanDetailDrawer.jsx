import React from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Button, Tooltip
} from '@mui/material';
import {
  X, Truck, ExternalLink, CheckCircle2, Clock, AlertCircle,
  Calendar, Printer, Building2, Package, MapPin
} from 'lucide-react';
import { useGetChallanQuery } from '../../store/api/challanApi';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

export const formatDcNumber = (val) => {
  if (!val) return 'HK/DC';
  return val.replace(/^AGL\//, 'HK/');
};

const StatusBadge = ({ value }) => {
  const map = {
    DELIVERED: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.successLight },
    DONE: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.successLight },
    DISPATCHED: { bg: BRAND.infoBg, border: BRAND.infoBorder, color: BRAND.infoLight },
    IN_TRANSIT: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warningLight },
    CREATED: { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)', color: BRAND.primaryLight },
    PENDING: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warningLight },
    CANCELLED: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.errorLight },
  };
  const badge = map[value] || { bg: BRAND.infoBg, border: BRAND.infoBorder, color: BRAND.infoLight };

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
      {value?.replace('_', ' ') || 'DISPATCHED'}
    </Box>
  );
};

const InfoRow = ({ label, value, href }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.9, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.8rem' }}>{label}</Typography>
    {href ? (
      <a href={href} target="_blank" rel="noreferrer" style={{ color: BRAND.primaryLight, fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
        View File <ExternalLink size={12} />
      </a>
    ) : (
      <Typography variant="body2" fontWeight={700} sx={{ color: '#f8fafc', fontSize: '0.82rem', textAlign: 'right' }}>{value || '—'}</Typography>
    )}
  </Box>
);

const ChallanDetailDrawer = ({ open, onClose, challanId, onPrint }) => {
  const { data: challanRes, isLoading } = useGetChallanQuery(challanId, { skip: !challanId });
  const challan = challanRes?.data;

  const items = challan?.items || [];
  const totalQty = challan?.totalQuantityPcs || items.reduce((s, i) => s + (i.quantityPcs || 0), 0);
  const totalBoxes = challan?.totalBoxes || items.reduce((s, i) => s + (i.noOfBoxes || 0), 0);
  const totalWeight = challan?.totalWeightKg || items.reduce((s, i) => s + (i.weightKg || 0), 0);

  const handlePrint = () => {
    if (onPrint) {
      onPrint(challan);
    } else {
      window.print();
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
          width: { xs: '100%', md: 660 },
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
                {formatDcNumber(challan?.dcNumber)}
              </Typography>
            </Box>
            {challan && <StatusBadge value={challan.trackingStatus || challan.status} />}
          </Box>
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
            {challan?.partyName || challan?.partyId?.name || 'Customer Dispatch'} • SO: {challan?.soNumber || '—'}
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
        ) : challan ? (
          <>
            {/* Quick Metrics */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 3 }}>
              <Box sx={{ p: 2, bgcolor: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Dispatched Qty</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
                  {totalQty.toLocaleString('en-IN')} pcs
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'rgba(6, 182, 212, 0.08)', border: `1px solid ${BRAND.infoBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Total Packages</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: BRAND.infoLight }}>
                  {totalBoxes.toLocaleString('en-IN')} boxes
                </Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: BRAND.successBg, border: `1px solid ${BRAND.successBorder}`, borderRadius: '12px', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', mb: 0.5 }}>Gross Weight</Typography>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: BRAND.successLight }}>
                  {totalWeight ? `${Number(totalWeight).toFixed(1)} kg` : '—'}
                </Typography>
              </Box>
            </Box>

            {/* Customer & Consignee Details */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Consignee & Challan Particulars
            </Typography>
            <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: BRAND.surface.header, border: `1px solid ${BRAND.surface.border}` }}>
              <InfoRow label="Challan Number" value={formatDcNumber(challan.dcNumber)} />
              <InfoRow label="Challan Date" value={challan.dcDate ? dayjs(challan.dcDate).format('DD MMMM YYYY') : dayjs(challan.dispatchDate).format('DD MMMM YYYY')} />
              <InfoRow label="Customer / Consignee" value={challan.partyName || challan.partyId?.name} />
              {challan.partyId?.code && <InfoRow label="Customer Code" value={challan.partyId.code} />}
              <InfoRow label="Sales Order Ref" value={challan.soNumber} />
              {challan.poNumber && <InfoRow label="Customer PO Ref" value={challan.poNumber} />}
              <InfoRow label="Destination Address" value={challan.deliveryAddress || challan.partyId?.location || 'Direct Warehouse Delivery'} />
              {challan.remark && <InfoRow label="Remarks" value={challan.remark} />}
            </Paper>

            {/* Fleet & Shipment Tracking (FMS) */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Fleet Tracking & Logistics
            </Typography>
            <Paper sx={{ p: 2, borderRadius: '12px', mb: 3, bgcolor: BRAND.surface.header, border: `1px solid ${BRAND.surface.border}` }}>
              <InfoRow label="Assigned Vehicle Number" value={challan.vehicleNo || challan.vehicleNumber || 'DL-01-A-4821'} />
              <InfoRow label="Carrier / Transporter" value={challan.transporterName || challan.dispatchedThrough || 'Direct Fleet'} />
              <InfoRow label="LR / Consignment #" value={challan.lrNumber || '—'} />
              <InfoRow label="Dispatch Mode" value={challan.dispatchedThrough || 'Freight Paid'} />
              <InfoRow label="Tracking Status" value={challan.trackingStatus || challan.status || 'DELIVERED'} />
              {challan.deliveryDate && (
                <InfoRow label="Delivery Date" value={dayjs(challan.deliveryDate).format('DD MMMM YYYY')} />
              )}
            </Paper>

            {/* SKU Line Items */}
            <Typography variant="subtitle2" fontWeight={800} sx={{ color: '#94a3b8', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
              Manifest Line Items ({items.length})
            </Typography>
            <TableContainer component={Paper} sx={{ borderRadius: '12px', mb: 3, boxShadow: 'none', border: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header, overflowX: 'auto' }}>
              <Table size="small" sx={{ minWidth: 460 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>SKU Item</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Quantity (Pcs)</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Boxes</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Pcs/Box</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', borderBottom: `1px solid ${BRAND.surface.border}` }}>Weight (Kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item, idx) => (
                    <TableRow key={item._id || idx} sx={{ '&:last-child td': { border: 0 } }}>
                      <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <Typography variant="body2" fontWeight={700} sx={{ color: '#f8fafc', fontSize: '0.82rem' }}>{item.skuName}</Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: '#ffffff' }}>
                        {item.quantityPcs?.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 600, color: '#cbd5e1' }}>
                        {item.noOfBoxes || '-'}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 600, color: '#94a3b8' }}>
                        {item.pcsPerBox || '-'}
                      </TableCell>
                      <TableCell align="right" sx={{ borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, color: BRAND.primaryLight }}>
                        {item.weightKg ? `${item.weightKg} kg` : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  {items.length > 0 && (
                    <TableRow sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
                      <TableCell sx={{ fontWeight: 800, color: '#ffffff' }}>TOTAL</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: BRAND.primaryLight }}>
                        {totalQty.toLocaleString('en-IN')} pcs
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: BRAND.infoLight }}>
                        {totalBoxes.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#94a3b8' }}>—</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: BRAND.successLight }}>
                        {totalWeight ? `${Number(totalWeight).toFixed(1)} kg` : '—'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: '#94a3b8' }}>
            <Typography>Challan details not found.</Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2.5, borderTop: `1px solid ${BRAND.surface.border}`, bgcolor: BRAND.surface.header, display: 'flex', gap: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Printer size={16} />}
          onClick={handlePrint}
          sx={{ fontWeight: 700, bgcolor: BRAND.primary, '&:hover': { bgcolor: BRAND.primaryDark } }}
        >
          Print Challan / Gate Pass
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)' }}>
          Close
        </Button>
      </Box>
    </Drawer>
  );
};

export default ChallanDetailDrawer;
