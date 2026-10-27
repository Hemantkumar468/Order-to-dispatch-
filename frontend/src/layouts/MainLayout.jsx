import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton, AppBar, Toolbar, useTheme, useMediaQuery, alpha } from '@mui/material';
import { Menu as MenuIcon, LayoutDashboard, ShoppingCart, Truck, FileText, Package, Users, ShieldCheck, Activity } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BRAND } from '../theme/brand';

const drawerWidth = 265;

const menuItems = [
  { text: 'Dashboard', icon: <LayoutDashboard size={19} />, path: '/dashboard' },
  { text: 'Sales Orders', icon: <ShoppingCart size={19} />, path: '/orders' },
  { text: 'PPC Planning', icon: <Package size={19} />, path: '/ppc-planning' },
  { text: 'Delivery Challans', icon: <Truck size={19} />, path: '/challans' },
  { text: 'Invoices & FMS', icon: <FileText size={19} />, path: '/invoices' },
  { divider: true },
  { text: 'SKU Master', icon: <Package size={19} />, path: '/skus' },
  { text: 'Parties', icon: <Users size={19} />, path: '/parties' },
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
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
          <Box sx={{
            width: 42,
            height: 42,
            borderRadius: '12px',
            background: BRAND.primaryGradient,
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>H</Typography>
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              Hemant Global
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em' }}>
                ENTERPRISE ERP
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ width: '100%', mt: 2, borderColor: 'rgba(255, 255, 255, 0.08)' }} />
      </Box>
      
      {/* Navigation Links */}
      <List sx={{ px: 2, flexGrow: 1, py: 0 }}>
        {menuItems.map((item, index) => {
          if (item.divider) return <Divider key={`div-${index}`} sx={{ my: 1.5, borderColor: 'rgba(255, 255, 255, 0.06)' }} />;
          
          const isSelected = location.pathname.startsWith(item.path);
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '10px',
                  py: 1.1,
                  px: 1.5,
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  bgcolor: isSelected ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
                  border: isSelected ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid transparent',
                  boxShadow: isSelected ? '0 4px 16px rgba(99, 102, 241, 0.2)' : 'none',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(99, 102, 241, 0.16)',
                    '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.25)' },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 36,
                  color: isSelected ? BRAND.primaryLight : '#64748b',
                  transition: 'color 0.2s ease',
                  '& svg': {
                    filter: isSelected ? 'drop-shadow(0 0 8px rgba(129, 140, 248, 0.6))' : 'none'
                  }
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '0.875rem',
                    color: isSelected ? '#ffffff' : '#94a3b8',
                    letterSpacing: '0.01em',
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Footer Info Widget */}
      <Box sx={{ p: 2, m: 2, borderRadius: '12px', bgcolor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Activity size={14} color="#10b981" />
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#f8fafc' }}>
            Control Center Active
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.65rem', color: '#64748b' }}>
          Dispatch & Supply Chain Engine
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: BRAND.surface.bg }}>
      {/* App Bar (Mobile Only) */}
      <AppBar position="fixed" sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        display: { sm: 'none' },
        bgcolor: BRAND.surface.sidebar,
        color: '#ffffff',
        borderBottom: `1px solid ${BRAND.surface.border}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
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
            <Typography variant="h6" noWrap component="div" fontWeight={800} sx={{ fontSize: '1.05rem', color: '#fff' }}>
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