import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip, Button, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Plus, Eye, Printer, Truck, Download } from 'lucide-react';
import { useGetChallansQuery } from '../../store/api/challanApi';
import TableSkeleton from '../../components/TableSkeleton';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';
import ChallanDetailDrawer, { formatDcNumber } from './ChallanDetailDrawer';
import ChallanPrintModal from './ChallanPrintModal';
import { exportToExcel } from '../../utils/exportUtils';

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
      whiteSpace: 'nowrap',
      letterSpacing: '0.04em',
    }}>
      {value?.replace('_', ' ') || 'DISPATCHED'}
    </Box>
  );
};

const ChallansList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChallanId, setSelectedChallanId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [printChallan, setPrintChallan] = useState(null);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const { data, isLoading } = useGetChallansQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchTerm || undefined,
  });

  const handleViewChallan = (row) => {
    setSelectedChallanId(row._id);
    setIsDetailOpen(true);
  };

  const handlePrintChallan = (row) => {
    setPrintChallan(row);
    setIsPrintOpen(true);
  };

  const handleExport = () => {
    if (!data?.data?.length) return;
    const exportData = data.data.map(dc => ({
      'Challan #': formatDcNumber(dc.dcNumber),
      'Customer': dc.partyName || dc.partyId?.name || '-',
      'Dispatch Date': dc.dcDate ? dayjs(dc.dcDate).format('YYYY-MM-DD') : '-',
      'Vehicle No': dc.vehicleNo || dc.vehicleNumber || '-',
      'Transporter': dc.transporterName || dc.dispatchedThrough || '-',
      'Total Qty': dc.totalQuantityPcs || 0,
      'Total Boxes': dc.totalBoxes || 0,
      'Total Weight (kg)': dc.totalWeightKg || 0,
      'Status': dc.trackingStatus || dc.status || 'DISPATCHED',
    }));
    exportToExcel(exportData, `Delivery_Challans_${dayjs().format('YYYYMMDD')}.xlsx`);
  };

  if (isLoading && !data) return <TableSkeleton columns={6} />;

  const columns = [
    {
      field: 'dcNumber',
      headerName: 'DC #',
      width: 170,
      renderCell: (p) => (
        <Box sx={{
          px: 1.2,
          py: 0.4,
          borderRadius: '6px',
          bgcolor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'inline-flex',
        }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: BRAND.primaryLight }}>
            {formatDcNumber(p.value)}
          </Typography>
        </Box>
      )
    },
    {
      field: 'partyName',
      headerName: 'CUSTOMER',
      flex: 1,
      minWidth: 200,
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#f8fafc' }}>
          {p.value || p.row.partyId?.name || 'Customer Dispatch'}
        </Typography>
      )
    },
    {
      field: 'dispatchDate',
      headerName: 'DISPATCH DATE',
      width: 140,
      renderCell: (p) => {
        const dateVal = p.row.dcDate || p.row.dispatchDate || p.value;
        return (
          <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
            {dateVal ? dayjs(dateVal).format('DD MMM YYYY') : dayjs().format('DD MMM YYYY')}
          </Typography>
        );
      }
    },
    {
      field: 'vehicleNo',
      headerName: 'VEHICLE',
      width: 150,
      renderCell: (p) => {
        const vehicle = p.row.vehicleNo || p.row.vehicleNumber || p.value || '-';
        return (
          <Box sx={{ px: 1.2, py: 0.3, borderRadius: '6px', bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Typography variant="body2" fontWeight={700} sx={{ color: '#e2e8f0', fontSize: '0.78rem' }}>
              {vehicle}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'transporterName',
      headerName: 'TRANSPORTER',
      width: 180,
      renderCell: (p) => (
        <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 500 }} noWrap>
          {p.value || p.row.dispatchedThrough || 'Direct Fleet'}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 140,
      renderCell: (p) => <StatusBadge value={p.row.trackingStatus || p.value || p.row.status} />
    },
    {
      field: 'actions',
      headerName: '',
      width: 90,
      sortable: false,
      align: 'center',
      renderCell: (p) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="View Challan">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleViewChallan(p.row);
              }}
              sx={{ color: BRAND.primary, '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.08)' } }}
            >
              <Eye size={15} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print Challan">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handlePrintChallan(p.row);
              }}
              sx={{ color: BRAND.text.secondary, '&:hover': { color: BRAND.primary, bgcolor: '#f1f5f9' } }}
            >
              <Printer size={15} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, p: { xs: 2, sm: 3 }, minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <Truck size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Delivery Challans
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Dispatch documentation, fleet tracking, and gate pass management
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search challans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 260 } }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search size={15} color="#64748b" /></InputAdornment> }}
          />
          <Button
            variant="outlined"
            onClick={handleExport}
            startIcon={<Download size={16} />}
            sx={{ width: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Data Grid Card */}
      <Paper sx={{
        flexGrow: 1,
        borderRadius: '16px',
        overflow: 'hidden',
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`,
      }}>
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          paginationMode="server"
          rowCount={data?.meta?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          rowHeight={52}
          columnHeaderHeight={46}
          onRowClick={(params) => handleViewChallan(params.row)}
          sx={{
            border: 0,
            '& .MuiDataGrid-row': { cursor: 'pointer' },
          }}
        />
      </Paper>

      {/* Modals & Drawers */}
      <ChallanDetailDrawer
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        challanId={selectedChallanId}
        onPrint={(c) => {
          setIsDetailOpen(false);
          setPrintChallan(c);
          setIsPrintOpen(true);
        }}
      />

      <ChallanPrintModal
        open={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        challan={printChallan}
      />
    </Box>
  );
};

export default ChallansList;

