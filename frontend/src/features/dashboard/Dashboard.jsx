import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, LinearProgress, Skeleton } from '@mui/material';
import { ShoppingCart, CheckCircle, Clock, TrendingUp, AlertCircle, Sparkles, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { alpha } from '@mui/material/styles';
import { useGetOrdersQuery } from '../../store/api/orderApi';
import { useGetInvoicesQuery } from '../../store/api/fmsApi';
import { BRAND } from '../../theme/brand';

const StatCard = ({ title, value, icon: Icon, color, lightColor, trend, loading }) => (
  <Card sx={{
    height: '100%',
    bgcolor: BRAND.surface.card,
    border: `1px solid ${BRAND.surface.border}`,
    borderRadius: '16px',
    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.4)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      boxShadow: `0 8px 30px ${alpha(color, 0.25)}`,
      borderColor: alpha(color, 0.4),
      transform: 'translateY(-2px)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '120px',
      height: '120px',
      background: `radial-gradient(circle, ${alpha(color, 0.12)} 0%, transparent 70%)`,
      pointerEvents: 'none',
    }
  }}>
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{
          p: 1.2,
          borderRadius: '12px',
          bgcolor: alpha(color, 0.12),
          border: `1px solid ${alpha(color, 0.25)}`,
          color: lightColor || color,
          display: 'flex',
          boxShadow: `0 0 16px ${alpha(color, 0.2)}`
        }}>
          <Icon size={22} strokeWidth={2.3} />
        </Box>
        {trend && !loading && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.4,
            borderRadius: '6px',
            bgcolor: BRAND.successBg,
            border: `1px solid ${BRAND.successBorder}`,
          }}>
            <TrendingUp size={12} color={BRAND.successLight} />
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: BRAND.successLight }}>
              {trend}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 0.5 }}>
        {title}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }} />
      ) : (
        <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {value}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: '#0f172a',
        p: 1.5,
        borderRadius: '10px',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
      }}>
        <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', mb: 0.5 }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>
          {payload[0].value} <span style={{ fontSize: '0.75rem', color: BRAND.primaryLight }}>Units Dispatched</span>
        </Typography>
      </Box>
    );
  }
  return null;
};

const Dashboard = () => {
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery({ limit: 100 });
  const { data: invoicesData, isLoading: invoicesLoading } = useGetInvoicesQuery({ limit: 100 });

  const dispatchTrendData = [
    { name: 'Mon', value: 420 },
    { name: 'Tue', value: 380 },
    { name: 'Wed', value: 640 },
    { name: 'Thu', value: 820 },
    { name: 'Fri', value: 590 },
    { name: 'Sat', value: 940 },
    { name: 'Sun', value: 760 },
  ];

  const bottleneckData = [
    { name: 'PO Entry', value: 95, color: BRAND.success, light: BRAND.successLight },
    { name: 'Inventory Check', value: 85, color: BRAND.info, light: BRAND.infoLight },
    { name: 'PPC Scheduling', value: 65, color: BRAND.warning, light: BRAND.warningLight },
    { name: 'Loading & Transit', value: 45, color: BRAND.wip, light: BRAND.secondaryLight },
    { name: 'Invoicing & FMS', value: 35, color: BRAND.error, light: BRAND.errorLight },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* Header */}
      <Box sx={{ mb: 3.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Typography variant="h4" fontWeight={900} sx={{ color: '#ffffff', fontSize: { xs: '1.6rem', sm: '2.25rem' }, letterSpacing: '-0.02em' }}>
            Control Tower
          </Typography>
          <Box sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: '20px',
            bgcolor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.6
          }}>
            <Sparkles size={12} color={BRAND.primaryLight} />
            <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: BRAND.primaryLight }}>
              REAL-TIME OPS
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          Operational overview for Hemant Global Dispatch & Supply Systems
        </Typography>
      </Box>

      {/* Stat Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales Orders"
            value={ordersData?.meta?.total || '10'}
            icon={ShoppingCart}
            color={BRAND.primary}
            lightColor={BRAND.primaryLight}
            trend="+12% this week"
            loading={ordersLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="WIP Orders"
            value="24"
            icon={Clock}
            color={BRAND.wip}
            lightColor={BRAND.secondaryLight}
            loading={ordersLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Units Dispatched"
            value="158"
            icon={CheckCircle}
            color={BRAND.success}
            lightColor={BRAND.successLight}
            trend="+5.2% vs target"
            loading={invoicesLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Receivables"
            value="₹12.4L"
            icon={AlertCircle}
            color={BRAND.error}
            lightColor={BRAND.errorLight}
            loading={invoicesLoading}
          />
        </Grid>
      </Grid>

      {/* Main Content Charts & Pipeline */}
      <Grid container spacing={2.5}>
        {/* Weekly Dispatch Trend */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{
            p: 3,
            borderRadius: '16px',
            bgcolor: BRAND.surface.card,
            border: `1px solid ${BRAND.surface.border}`,
            boxShadow: '0 4px 24px -2px rgba(0,0,0,0.4)',
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={800} sx={{ color: '#ffffff' }}>
                  Weekly Dispatch Velocity
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Units shipped per day across all distribution channels
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.primary, boxShadow: `0 0 10px ${BRAND.primary}` }} />
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: '#e2e8f0' }}>7-Day Output</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 320, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dispatchTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={BRAND.primaryLight}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Bottleneck & Fulfillment Stages */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{
            p: 3,
            borderRadius: '16px',
            bgcolor: BRAND.surface.card,
            border: `1px solid ${BRAND.surface.border}`,
            boxShadow: '0 4px 24px -2px rgba(0,0,0,0.4)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={800} sx={{ color: '#ffffff' }}>
                Pipeline Fulfillment
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Stage completion rates & operational clearance
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.8, flexGrow: 1, justifyContent: 'center' }}>
              {bottleneckData.map((item) => (
                <Box key={item.name}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{
                      px: 1,
                      py: 0.2,
                      borderRadius: '6px',
                      bgcolor: alpha(item.color, 0.12),
                      border: `1px solid ${alpha(item.color, 0.25)}`,
                      color: item.light,
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}>
                      {item.value}%
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.value}
                    sx={{
                      height: 7,
                      borderRadius: 4,
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        bgcolor: item.color,
                        boxShadow: `0 0 10px ${alpha(item.color, 0.5)}`,
                      }
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;