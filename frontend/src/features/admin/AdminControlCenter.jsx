import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Chip, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs,
  Tab, Button, Divider, IconButton, Tooltip
} from '@mui/material';
import {
  ShieldCheck, Users, Server, Database, Key, CheckCircle,
  Clock, Activity, FileText, ShoppingCart, Truck, CreditCard, Lock
} from 'lucide-react';
import { BRAND } from '../../theme/brand';

const SYSTEM_USERS = [
  {
    name: 'Admin',
    email: 'admin@hemantglobal.com',
    role: 'ADMIN',
    roleColor: BRAND.primary,
    status: 'ACTIVE',
    accessScope: 'Full System Control, Masters, Orders, Financials, All Modules',
    demoPass: 'admin123',
  },
  {
    name: 'PPC User',
    email: 'ppc@hemantglobal.com',
    role: 'PPC',
    roleColor: BRAND.wip,
    status: 'ACTIVE',
    accessScope: 'Production Planning, Capacity Allocation, Backlog Readiness',
    demoPass: 'ppc12345',
  },
  {
    name: 'Accounts Executive',
    email: 'accounts@hemantglobal.com',
    role: 'ACCOUNTS',
    roleColor: BRAND.success,
    status: 'ACTIVE',
    accessScope: 'Invoices, GST Tax Breakdown, Payment Collections, Customer Ledger',
    demoPass: 'acc12345',
  },
  {
    name: 'Dispatch Manager',
    email: 'dispatch@hemantglobal.com',
    role: 'DISPATCH',
    roleColor: BRAND.warning,
    status: 'ACTIVE',
    accessScope: 'Delivery Challans, Vehicle Scheduling, FMS Transport Tracking',
    demoPass: 'disp12345',
  },
];

const PERMISSIONS_MATRIX = [
  { module: 'Sales Orders', admin: 'Full Control', ppc: 'View Only', dispatch: 'View & Status', accounts: 'View Only' },
  { module: 'PPC Planning', admin: 'Full Control', ppc: 'Create & Manage', dispatch: 'View Schedules', accounts: 'No Access' },
  { module: 'Dispatch Scheduling', admin: 'Full Control', ppc: 'Allocate Ready', dispatch: 'Plan & Dispatch', accounts: 'View' },
  { module: 'Delivery Challans', admin: 'Full Control', ppc: 'View Only', dispatch: 'Create & Issue', accounts: 'View & Bill' },
  { module: 'Invoices & Tax Calculation', admin: 'Full Control', ppc: 'No Access', dispatch: 'View Invoices', accounts: 'Full Control' },
  { module: 'Customer Ledger & Payments', admin: 'Full Control', ppc: 'No Access', dispatch: 'No Access', accounts: 'Full Control' },
  { module: 'Parties & SKU Masters', admin: 'Full Control', ppc: 'View SKUs', dispatch: 'View Masters', accounts: 'View Parties' },
  { module: 'System Security & Users', admin: 'Full Control', ppc: 'No Access', dispatch: 'No Access', accounts: 'No Access' },
];

export default function AdminControlCenter() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{
      p: { xs: 2, sm: 3 },
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minHeight: '100vh',
      bgcolor: BRAND.surface.bg,
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            p: 1.25,
            borderRadius: '12px',
            bgcolor: 'rgba(79, 70, 229, 0.1)',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            color: BRAND.primary,
            display: 'flex'
          }}>
            <ShieldCheck size={26} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Typography variant="h4" fontWeight={900} sx={{ color: BRAND.text.primary, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                Admin Control Center
              </Typography>
              <Chip
                label="ADMIN VIEW"
                size="small"
                sx={{
                  bgcolor: BRAND.primaryGradient,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '0.68rem',
                  letterSpacing: '0.05em'
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: BRAND.text.secondary }}>
              Enterprise governance, system users, permission matrices & platform health
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '16px', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <CardContent sx={{ p: 2.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: BRAND.text.secondary, textTransform: 'uppercase' }}>
                  System Roles
                </Typography>
                <Users size={18} color={BRAND.primary} />
              </Box>
              <Typography variant="h5" fontWeight={900} sx={{ color: BRAND.text.primary }}>
                4 Active Roles
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.success, fontWeight: 700 }}>
                ADMIN, PPC, ACCOUNTS, DISPATCH
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '16px', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <CardContent sx={{ p: 2.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: BRAND.text.secondary, textTransform: 'uppercase' }}>
                  Database Engine
                </Typography>
                <Database size={18} color={BRAND.success} />
              </Box>
              <Typography variant="h5" fontWeight={900} sx={{ color: BRAND.text.primary }}>
                MongoDB
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.success, fontWeight: 700 }}>
                ● Connected & Collections Seeded
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '16px', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <CardContent sx={{ p: 2.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: BRAND.text.secondary, textTransform: 'uppercase' }}>
                  Security & Auth
                </Typography>
                <Key size={18} color={BRAND.warning} />
              </Box>
              <Typography variant="h5" fontWeight={900} sx={{ color: BRAND.text.primary }}>
                JWT Secured
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.text.secondary, fontWeight: 600 }}>
                Bcrypt 12 Rounds + Token Expiry
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: '16px', bgcolor: BRAND.surface.card, border: `1px solid ${BRAND.surface.border}` }}>
            <CardContent sx={{ p: 2.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight={700} sx={{ color: BRAND.text.secondary, textTransform: 'uppercase' }}>
                  System Health
                </Typography>
                <Activity size={18} color="#059669" />
              </Box>
              <Typography variant="h5" fontWeight={900} sx={{ color: '#059669' }}>
                Operational
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.text.secondary, fontWeight: 600 }}>
                All Micro-Services Running
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Paper sx={{
        borderRadius: '16px',
        bgcolor: BRAND.surface.card,
        border: `1px solid ${BRAND.surface.border}`,
        overflow: 'hidden',
      }}>
        <Box sx={{ borderBottom: `1px solid ${BRAND.surface.border}`, px: 2, pt: 1, bgcolor: BRAND.surface.header }}>
          <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 700,
                fontSize: '0.85rem',
                minHeight: 46,
                color: BRAND.text.secondary,
                '&.Mui-selected': { color: BRAND.primary }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: BRAND.primary,
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab label="System Accounts & Credentials" />
            <Tab label="Role Permissions Matrix" />
            <Tab label="Architecture & Micro-Services" />
          </Tabs>
        </Box>

        {/* Tab 0: System Accounts */}
        {tabValue === 0 && (
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: BRAND.text.primary }}>
                Configured Organization Users
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>
                Pre-seeded enterprise role accounts available for operational login & permission testing
              </Typography>
            </Box>

            <TableContainer sx={{ border: `1px solid ${BRAND.surface.border}`, borderRadius: '12px' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: BRAND.surface.header }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>USER NAME</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>EMAIL IDENTIFIER</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>ROLE ASSIGNMENT</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>PERMISSIONS & SCOPE</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>DEMO PASSWORD</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SYSTEM_USERS.map((user) => (
                    <TableRow key={user.email} sx={{ '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.04)' } }}>
                      <TableCell sx={{ fontWeight: 700, color: BRAND.text.primary }}>{user.name}</TableCell>
                      <TableCell sx={{ color: BRAND.text.secondary, fontFamily: 'monospace', fontSize: '0.8rem' }}>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            bgcolor: `${user.roleColor}15`,
                            border: `1px solid ${user.roleColor}40`,
                            color: user.roleColor,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: BRAND.text.secondary, fontSize: '0.8rem' }}>{user.accessScope}</TableCell>
                      <TableCell>
                        <Box sx={{
                          px: 1.2,
                          py: 0.3,
                          borderRadius: '6px',
                          bgcolor: 'rgba(15, 23, 42, 0.05)',
                          border: `1px solid ${BRAND.surface.border}`,
                          display: 'inline-block',
                          fontFamily: 'monospace',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: BRAND.text.primary
                        }}>
                          {user.demoPass}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                          <CheckCircle size={14} color="#059669" />
                          <Typography variant="caption" sx={{ color: '#059669', fontWeight: 800 }}>
                            {user.status}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Tab 1: Permissions Matrix */}
        {tabValue === 1 && (
          <Box sx={{ p: 2.5 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ color: BRAND.text.primary }}>
                Role-Based Access Control (RBAC) Matrix
              </Typography>
              <Typography variant="caption" sx={{ color: BRAND.text.secondary }}>
                Security policies determining module access across manufacturing & supply chain departments
              </Typography>
            </Box>

            <TableContainer sx={{ border: `1px solid ${BRAND.surface.border}`, borderRadius: '12px' }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: BRAND.surface.header }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.text.secondary }}>FUNCTIONAL MODULE</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.primary }}>ADMIN</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.wip }}>PPC</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.warning }}>DISPATCH</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: '0.72rem', color: BRAND.success }}>ACCOUNTS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {PERMISSIONS_MATRIX.map((row) => (
                    <TableRow key={row.module} sx={{ '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.04)' } }}>
                      <TableCell sx={{ fontWeight: 700, color: BRAND.text.primary }}>{row.module}</TableCell>
                      <TableCell sx={{ color: BRAND.primary, fontWeight: 700, fontSize: '0.8rem' }}>{row.admin}</TableCell>
                      <TableCell sx={{ color: BRAND.text.secondary, fontSize: '0.8rem' }}>{row.ppc}</TableCell>
                      <TableCell sx={{ color: BRAND.text.secondary, fontSize: '0.8rem' }}>{row.dispatch}</TableCell>
                      <TableCell sx={{ color: BRAND.text.secondary, fontSize: '0.8rem' }}>{row.accounts}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Tab 2: Architecture */}
        {tabValue === 2 && (
          <Box sx={{ p: 2.5 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, borderRadius: '12px', bgcolor: BRAND.surface.header, border: `1px solid ${BRAND.surface.border}` }}>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.primary, mb: 1.5 }}>
                    Backend Services Configuration
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.82rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>API Server:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>Express.js 4.x (ES Modules)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>Database:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>MongoDB (Mongoose ODM v8)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>PDF Engine:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>PDFKit (Delivery Challan & Invoices)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>Security Suite:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>Helmet, CORS, Rate-Limiting, HPP</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2, borderRadius: '12px', bgcolor: BRAND.surface.header, border: `1px solid ${BRAND.surface.border}` }}>
                  <Typography variant="subtitle2" fontWeight={800} sx={{ color: BRAND.text.primary, mb: 1.5 }}>
                    Frontend Client System
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, fontSize: '0.82rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>Client Framework:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>React 18 + Vite</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>UI Components:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>Material-UI (MUI v5) + Emotion</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>State Manager:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>Redux Toolkit & RTK Query</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: BRAND.text.secondary }}>Data Grid:</Typography>
                      <Typography fontWeight={700} sx={{ color: BRAND.text.primary }}>@mui/x-data-grid Server & Client Modes</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
