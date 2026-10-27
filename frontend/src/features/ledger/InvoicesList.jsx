import React, { useState, useMemo } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip, Button, TextField, InputAdornment } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Download, Eye, DollarSign, FileText } from 'lucide-react';
import { useGetInvoicesQuery } from '../../store/api/fmsApi';
import { mockInvoices } from '../../mock-data/mockInvoices';
import TableSkeleton from '../../components/TableSkeleton';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';
import InvoiceDetailDrawer from './InvoiceDetailDrawer';
import PaymentRecordModal from './PaymentRecordModal';
import { exportToExcel } from '../../utils/exportUtils';

const PaymentBadge = ({ value }) => {
  const map = {
    PAID: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.successLight },
    PARTIAL: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warningLight },
    PENDING: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.errorLight },
    CANCELLED: { bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)', color: '#94a3b8' },
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
      whiteSpace: 'nowrap',
      letterSpacing: '0.04em',
    }}>
      {value || 'PENDING'}
    </Box>
  );
};

const InvoicesList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [paymentInvoice, setPaymentInvoice] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { data, isLoading } = useGetInvoicesQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchTerm || undefined,
  });

  const displayRows = useMemo(() => {
    let list = (data?.data && data.data.length > 0) ? data.data : mockInvoices;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(i =>
        i.invoiceNo?.toLowerCase().includes(term) ||
        (i.partyName || i.partyId?.name)?.toLowerCase().includes(term) ||
        i.dcNumber?.toLowerCase().includes(term)
      );
    }
    return list;
  }, [data, searchTerm]);

  const handleViewInvoice = (row) => {
    setSelectedInvoiceId(row._id);
    setIsDetailOpen(true);
  };

  const handlePaymentClick = (row) => {
    setPaymentInvoice(row);
    setIsPaymentOpen(true);
  };

  const handleExport = () => {
    if (!displayRows.length) return;
    const exportData = displayRows.map(inv => ({
      'Invoice #': inv.invoiceNo,
      'Customer': inv.partyName || inv.partyId?.name || '-',
      'Invoice Date': inv.invoiceDate ? dayjs(inv.invoiceDate).format('YYYY-MM-DD') : '-',
      'DC Ref': inv.dcNumber || '-',
      'PO #': inv.poNumber || '-',
      'Invoice Amount (₹)': inv.invoiceAmount || 0,
      'Amount Received (₹)': inv.amountReceived || 0,
      'Balance (₹)': (inv.invoiceAmount || 0) - (inv.amountReceived || 0),
      'Status': inv.status || 'PENDING',
    }));
    exportToExcel(exportData, `Invoices_Export_${dayjs().format('YYYYMMDD')}.xlsx`);
  };

  const columns = [
    {
      field: 'invoiceNo',
      headerName: 'INVOICE #',
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
            {p.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'partyName',
      headerName: 'CUSTOMER',
      flex: 1,
      minWidth: 220,
      renderCell: (p) => <Typography variant="body2" fontWeight={600} noWrap sx={{ color: BRAND.text.primary }}>{p.value || p.row.partyId?.name || '-'}</Typography>
    },
    {
      field: 'invoiceDate',
      headerName: 'DATE',
      width: 130,
      renderCell: (p) => <Typography variant="body2" sx={{ color: BRAND.text.secondary, fontWeight: 500 }}>{p.value ? dayjs(p.value).format('DD MMM YYYY') : '-'}</Typography>
    },
    {
      field: 'invoiceAmount',
      headerName: 'AMOUNT',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => {
        const val = p.row.invoiceAmount ?? p.value ?? 0;
        return (
          <Typography variant="body2" fontWeight={800} sx={{ color: BRAND.success }}>
            ₹{Number(val).toLocaleString('en-IN')}
          </Typography>
        );
      }
    },
    {
      field: 'status',
      headerName: 'PAYMENT',
      width: 130,
      renderCell: (p) => <PaymentBadge value={p.value || p.row.status} />
    },
    {
      field: 'dcNumber',
      headerName: 'DC REF',
      width: 150,
      renderCell: (p) => (
        <Typography variant="body2" sx={{ color: BRAND.text.secondary, fontWeight: 600 }}>
          {p.value || '-'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: '',
      width: 90,
      sortable: false,
      align: 'center',
      renderCell: (p) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleViewInvoice(p.row);
              }}
              sx={{ color: BRAND.primaryLight, '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.15)' } }}
            >
              <Eye size={15} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Payment">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handlePaymentClick(p.row);
              }}
              sx={{ color: BRAND.successLight, '&:hover': { bgcolor: 'rgba(16, 185, 129, 0.15)' } }}
            >
              <DollarSign size={15} />
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
            <FileText size={24} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Invoices & FMS
            </Typography>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Billing, receivables ledger, and freight management clearance
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <TextField
            size="small"
            placeholder="Search invoices..."
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
            Export Report
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
          rows={displayRows}
          columns={columns}
          getRowId={(row) => row._id || row.invoiceNo}
          loading={isLoading && displayRows.length === 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          rowHeight={52}
          columnHeaderHeight={46}
          onRowClick={(params) => handleViewInvoice(params.row)}
          sx={{
            border: 0,
            '& .MuiDataGrid-row': { cursor: 'pointer' },
          }}
        />
      </Paper>

      {/* Modals & Drawers */}
      <InvoiceDetailDrawer
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        invoiceId={selectedInvoiceId}
        onRecordPayment={(inv) => {
          setPaymentInvoice(inv);
          setIsPaymentOpen(true);
        }}
      />

      <PaymentRecordModal
        open={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        invoice={paymentInvoice}
      />
    </Box>
  );
};

export default InvoicesList;
