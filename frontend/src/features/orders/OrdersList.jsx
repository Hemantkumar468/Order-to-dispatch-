import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, InputAdornment, Button, IconButton, Tooltip, Tabs, Tab, Autocomplete, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search, Plus, Eye, Edit3, ShoppingCart, Clock, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { alpha } from '@mui/material/styles';
import { useGetOrdersQuery, useGetOrderStatsQuery } from '../../store/api/orderApi';
import { useGetPartiesQuery } from '../../store/api/partyApi';
import OrderCreateModal from './OrderCreateModal';
import OrderUpdateModal from './OrderUpdateModal';
import OrderDetailDrawer from './OrderDetailDrawer';
import TableSkeleton from '../../components/TableSkeleton';
import { BRAND } from '../../theme/brand';
import dayjs from 'dayjs';

const STATUS_TABS = [
  { label: 'All Orders', value: '' },
  { label: 'Received', value: 'RECEIVED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Short Closed', value: 'SHORT_CLOSED' },
];

const StatusBadge = ({ value }) => {
  const map = {
    RECEIVED: { bg: BRAND.warningBg, border: BRAND.warningBorder, color: BRAND.warningLight },
    IN_PROGRESS: { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)', color: BRAND.primaryLight },
    COMPLETED: { bg: BRAND.successBg, border: BRAND.successBorder, color: BRAND.successLight },
    CANCELLED: { bg: BRAND.errorBg, border: BRAND.errorBorder, color: BRAND.errorLight },
    SHORT_CLOSED: { bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)', color: '#cbd5e1' },
    PLANNING: { bg: BRAND.wipBg, border: BRAND.wipBorder, color: BRAND.secondaryLight },
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
      fontSize: '0.68rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      letterSpacing: '0.04em',
    }}>
      {value?.replace('_', ' ')}
    </Box>
  );
};

const StatCard = ({ title, value, icon: Icon, color, lightColor, loading }) => (
  <Paper sx={{
    p: 2.2,
    borderRadius: '16px',
    bgcolor: BRAND.surface.card,
    border: `1px solid ${BRAND.surface.border}`,
    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.35)',
    transition: 'all 0.25s ease',
    '&:hover': {
      boxShadow: `0 6px 24px ${alpha(color, 0.2)}`,
      borderColor: alpha(color, 0.35),
      transform: 'translateY(-1px)'
    }
  }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>
          {title}
        </Typography>
        {loading ? <Skeleton width={60} height={32} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} /> : (
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.2 }}>
            {value}
          </Typography>
        )}
      </Box>
      <Box sx={{
        p: 1,
        borderRadius: '10px',
        bgcolor: alpha(color, 0.12),
        border: `1px solid ${alpha(color, 0.25)}`,
        color: lightColor || color
      }}>
        <Icon size={18} strokeWidth={2.5} />
      </Box>
    </Box>
  </Paper>
);

const PipelineBar = ({ row }) => {
  const steps = ['poEntry', 'inventoryCheck', 'scheduling', 'emailSchedule'];
  const done = steps.filter(s => row[s]?.status === 'DONE').length;
  const pct = Math.round((done / steps.length) * 100);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: BRAND.primaryLight }}>{done}/{steps.length}</Typography>
        <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8' }}>{pct}%</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '3px', height: 5, borderRadius: '3px', overflow: 'hidden', bgcolor: 'rgba(255,255,255,0.06)' }}>
        {steps.map(s => (
          <Box
            key={s}
            sx={{
              flex: 1,
              bgcolor: row[s]?.status === 'DONE' ? BRAND.success : row[s]?.status === 'DELAYED' ? BRAND.error : 'rgba(255,255,255,0.1)',
              boxShadow: row[s]?.status === 'DONE' ? `0 0 6px ${BRAND.success}` : 'none',
              transition: 'all 0.2s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const OrdersList = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 25 });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [partyFilter, setPartyFilter] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [detailOrderId, setDetailOrderId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const queryParams = {
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
    partyId: partyFilter?._id || undefined,
    sort: '-orderDate',
  };

  const { data, isLoading } = useGetOrdersQuery(queryParams);
  const { data: statsRes, isLoading: statsLoading } = useGetOrderStatsQuery();
  const { data: partiesData } = useGetPartiesQuery({ limit: 200 });

  const stats = statsRes?.data?.summary || {};
  const parties = partiesData?.data || [];

  const handleViewDetail = (order) => { setDetailOrderId(order._id); setIsDetailOpen(true); };
  const handleUpdateClick = (order) => { setSelectedOrder(order); setIsUpdateOpen(true); };

  if (isLoading && !data) return <TableSkeleton columns={8} />;

  const columns = [
    {
      field: 'soNumber',
      headerName: 'SO #',
      width: 150,
      renderCell: (p) => (
        <Box sx={{
          px: 1.2,
          py: 0.35,
          borderRadius: '6px',
          bgcolor: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          display: 'inline-flex',
          cursor: 'pointer',
          '&:hover': { borderColor: BRAND.primaryLight }
        }}
        onClick={(e) => { e.stopPropagation(); handleViewDetail(p.row); }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: BRAND.primaryLight }}>
            {p.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'poNumber',
      headerName: 'PO #',
      width: 140,
      renderCell: (p) => <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.8rem' }}>{p.value}</Typography>
    },
    {
      field: 'partyName',
      headerName: 'CUSTOMER',
      flex: 1,
      minWidth: 200,
      renderCell: (p) => <Typography variant="body2" fontWeight={600} noWrap sx={{ color: '#f8fafc', fontSize: '0.82rem' }}>{p.value}</Typography>
    },
    {
      field: 'orderDate',
      headerName: 'DATE',
      width: 105,
      renderCell: (p) => <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.8rem' }}>{dayjs(p.value).format('DD MMM YY')}</Typography>
    },
    {
      field: 'items',
      headerName: 'SKUS',
      width: 70,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => (
        <Box sx={{ px: 1, py: 0.3, borderRadius: '6px', bgcolor: BRAND.wipBg, color: BRAND.secondaryLight, fontSize: '0.75rem', fontWeight: 800, border: `1px solid ${BRAND.wipBorder}` }}>
          {p.value?.length || 0}
        </Box>
      )
    },
    {
      field: 'totalOrderQty',
      headerName: 'ORDER QTY',
      width: 110,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <Typography variant="body2" fontWeight={700} sx={{ color: '#ffffff', fontSize: '0.82rem' }}>{p.value?.toLocaleString('en-IN') || '0'}</Typography>
    },
    {
      field: 'totalDispatchedQty',
      headerName: 'DISPATCHED',
      width: 110,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <Typography variant="body2" fontWeight={700} sx={{ color: BRAND.successLight, fontSize: '0.82rem' }}>{p.value?.toLocaleString('en-IN') || '0'}</Typography>
    },
    {
      field: 'totalBalanceQty',
      headerName: 'BALANCE',
      width: 100,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => (
        <Typography variant="body2" fontWeight={700} sx={{ color: p.value > 0 ? BRAND.errorLight : BRAND.successLight, fontSize: '0.82rem' }}>
          {p.value?.toLocaleString('en-IN') || '0'}
        </Typography>
      )
    },
    {
      field: 'workflow',
      headerName: 'PROGRESS',
      width: 140,
      sortable: false,
      renderCell: (p) => <PipelineBar row={p.row} />
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 130,
      renderCell: (p) => <StatusBadge value={p.value} />
    },
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      align: 'center',
      renderCell: (p) => (
        <Box sx={{ display: 'flex', gap: 0.5 }} onClick={(e) => e.stopPropagation()}>
          <Tooltip title="Edit Workflow">
            <IconButton size="small" onClick={() => handleUpdateClick(p.row)} sx={{ color: BRAND.primaryLight }}>
              <Edit3 size={15} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleViewDetail(p.row)} sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
              <Eye size={15} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, p: { xs: 2, sm: 3 }, minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Sales Orders
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Order booking, tracking, line fulfillment & dispatch status
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<Plus size={16} />} 
          onClick={() => setIsCreateOpen(true)}
          sx={{ width: { xs: '100%', sm: 'auto' }, whiteSpace: 'nowrap' }}
        >
          New Order
        </Button>
      </Box>

      {/* Stat Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
        gap: 2 
      }}>
        <StatCard title="Total Orders" value={stats.totalOrders || 0} icon={ShoppingCart} color={BRAND.primary} lightColor={BRAND.primaryLight} loading={statsLoading} />
        <StatCard title="Total SKU Lines" value={stats.totalSkuLines || 0} icon={Package} color={BRAND.wip} lightColor={BRAND.secondaryLight} loading={statsLoading} />
        <StatCard title="Dispatched Qty" value={(stats.totalDispatchedQty || 0).toLocaleString('en-IN')} icon={CheckCircle} color={BRAND.success} lightColor={BRAND.successLight} loading={statsLoading} />
        <StatCard title="Pending Balance" value={(stats.totalBalanceQty || 0).toLocaleString('en-IN')} icon={AlertCircle} color={BRAND.error} lightColor={BRAND.errorLight} loading={statsLoading} />
      </Box>

      {/* Filters Bar & Data Grid */}
      <Paper sx={{
        borderRadius: '16px',
        p: 0,
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`,
        overflow: 'hidden',
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' }, 
          justifyContent: 'space-between', 
          p: 1.5, 
          borderBottom: `1px solid ${BRAND.surface.border}`,
          bgcolor: BRAND.surface.header,
          gap: 1.5
        }}>
          <Tabs 
            value={statusFilter} 
            onChange={(_, v) => { setStatusFilter(v); setPaginationModel(prev => ({ ...prev, page: 0 })); }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              minHeight: 38, 
              '& .MuiTab-root': {
                minHeight: 38,
                py: 0.5,
                px: 1.8,
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#94a3b8',
                '&.Mui-selected': { color: '#ffffff' }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: BRAND.primary,
                height: 3,
                borderRadius: '3px 3px 0 0',
                boxShadow: `0 0 10px ${BRAND.primary}`
              }
            }}
          >
            {STATUS_TABS.map(t => <Tab key={t.value} label={t.label} value={t.value} />)}
          </Tabs>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1.5, px: 0.5 }}>
            <Autocomplete
              options={parties}
              getOptionLabel={(opt) => opt.name || ''}
              value={partyFilter}
              onChange={(_, val) => { setPartyFilter(val); setPaginationModel(prev => ({ ...prev, page: 0 })); }}
              size="small"
              fullWidth
              sx={{ width: { xs: '100%', sm: 220 } }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Filter by Party..."
                  variant="outlined"
                  size="small" 
                  sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.8rem' } }}
                />
              )}
            />
            <TextField 
              size="small" 
              placeholder="Search orders..." 
              value={searchTerm}
              fullWidth
              onChange={(e) => { setSearchTerm(e.target.value); setPaginationModel(prev => ({ ...prev, page: 0 })); }}
              sx={{ width: { xs: '100%', sm: 200 } }}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search size={15} color="#64748b" /></InputAdornment> }}
            />
          </Box>
        </Box>

        {/* Data Grid */}
        <DataGrid
          rows={data?.data || []}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isLoading}
          paginationMode="server"
          rowCount={data?.meta?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
          rowHeight={50}
          columnHeaderHeight={44}
          onRowClick={(params) => handleViewDetail(params.row)}
          sx={{
            border: 0,
            '& .MuiDataGrid-row': { cursor: 'pointer' },
          }}
        />
      </Paper>

      {/* Modals & Drawers */}
      <OrderCreateModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <OrderUpdateModal open={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} order={selectedOrder} />
      <OrderDetailDrawer open={isDetailOpen} onClose={() => setIsDetailOpen(false)} orderId={detailOrderId} />
    </Box>
  );
};

export default OrdersList;
