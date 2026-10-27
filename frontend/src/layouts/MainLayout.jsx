import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Divider, IconButton, AppBar, Toolbar,
  useTheme, useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon, LayoutDashboard, ShoppingCart, Truck, FileText,
  Package, Users, Calendar, ScrollText, ShieldCheck
} from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BRAND } from '../theme/brand';

const drawerWidth = 270;

const menuSections = [
  {
    title: 'OPERATIONS & FULFILLMENT',
    items: [
      { text: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
      { text: 'Sales Orders', icon: <ShoppingCart size={18} />, path: '/orders' },
      { text: 'PPC Planning', icon: <Package size={18} />, path: '/ppc-planning' },
      { text: 'Dispatch Planning', icon: <Calendar size={18} />, path: '/planning' },
      { text: 'Delivery Challans', icon: <Truck size={18} />, path: '/challans' },
      { text: 'Invoices & FMS', icon: <FileText size={18} />, path: '/invoices' },
      { text: 'Dispatch Ledger', icon: <ScrollText size={18} />, path: '/ledger' },
    ]
  },
  {
    title: 'MASTER DATA',
    items: [
      { text: 'SKU Master', icon: <Package size={18} />, path: '/skus' },
      { text: 'Parties Master', icon: <Users size={18} />, path: '/parties' },
    ]
  },
  {
    title: 'ADMINISTRATION & SECURITY',
    items: [
      { text: 'Admin Control Center', icon: <ShieldCheck size={18} />, path: '/admin-control', badge: 'ADMIN' },
    ]
  }
];

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: BRAND.surface.sidebar,
      borderRight: `1px solid ${BRAND.surface.border}`,
    }}>
      {/* Brand Header */}
      <Box sx={{ p: 2.5, pb: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            background: BRAND.primaryGradient,
            boxShadow: BRAND.primaryGlow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>H</Typography>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: BRAND.text.primary, lineHeight: 1.2, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              Hemant Global
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 6px #10b981' }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: BRAND.text.secondary, letterSpacing: '0.08em' }}>
                ENTERPRISE ERP
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ width: '100%', mt: 2, borderColor: BRAND.surface.border }} />
      </Box>
      
      {/* Navigation Sections */}
      <Box sx={{ px: 1.8, flexGrow: 1, overflowY: 'auto' }}>
        {menuSections.map((section, sIdx) => (
          <Box key={section.title} sx={{ mb: 2 }}>
            <Typography sx={{
              px: 1.5,
              py: 0.8,
              fontSize: '0.64rem',
              fontWeight: 800,
              color: '#94a3b8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              {section.title}
            </Typography>
            <List sx={{ p: 0 }}>
              {section.items.map((item) => {
                const isSelected = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                
                return (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={isSelected}
                      onClick={() => {
                        navigate(item.path);
                        if (!isDesktop) setMobileOpen(false);
                      }}
                      sx={{
                        borderRadius: '10px',
                        py: 0.9,
                        px: 1.4,
                        position: 'relative',
                        transition: 'all 0.18s ease',
                        bgcolor: isSelected ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                        border: isSelected ? '1px solid rgba(79, 70, 229, 0.25)' : '1px solid transparent',
                        boxShadow: isSelected ? '0 2px 8px rgba(79, 70, 229, 0.1)' : 'none',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(79, 70, 229, 0.08)',
                          '&:hover': { bgcolor: 'rgba(79, 70, 229, 0.14)' },
                        },
                        '&:hover': {
                          bgcolor: '#f1f5f9',
                          borderColor: '#e2e8f0',
                        }
                      }}
                    >
                      <ListItemIcon sx={{
                        minWidth: 32,
                        color: isSelected ? BRAND.primary : '#64748b',
                        transition: 'color 0.2s ease',
                        '& svg': {
                          filter: isSelected ? 'drop-shadow(0 0 6px rgba(79, 70, 229, 0.35))' : 'none'
                        }
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.84rem',
                          color: isSelected ? BRAND.primary : BRAND.text.secondary,
                          letterSpacing: '0.01em',
                        }} 
                      />
                      {item.badge && (
                        <Box sx={{
                          px: 0.8,
                          py: 0.2,
                          borderRadius: '4px',
                          bgcolor: BRAND.primary,
                          color: '#fff',
                          fontSize: '0.58rem',
                          fontWeight: 900,
                          letterSpacing: '0.04em'
                        }}>
                          {item.badge}
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* App Bar (Mobile) */}
      <AppBar position="fixed" sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: { sm: 'none' },
        bgcolor: BRAND.surface.sidebar,
        color: BRAND.text.primary,
        borderBottom: `1px solid ${BRAND.surface.border}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: BRAND.primaryGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: '#fff' }}>H</Typography>
            </Box>
            <Typography variant="h6" noWrap component="div" fontWeight={800} sx={{ fontSize: '1.05rem', color: BRAND.text.primary }}>
              Hemant Global
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              bgcolor: BRAND.surface.sidebar,
            }
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${BRAND.surface.border}`,
              bgcolor: BRAND.surface.sidebar,
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 0, 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        mt: { xs: 7, sm: 0 },
        minWidth: 0,
        bgcolor: BRAND.surface.bg,
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;