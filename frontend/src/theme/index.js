import { createTheme, alpha } from '@mui/material/styles';
import { BRAND } from './brand';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: BRAND.primary,
      light: BRAND.primaryLight,
      dark: BRAND.primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: BRAND.secondary,
      light: BRAND.secondaryLight,
      dark: BRAND.secondaryDark,
      contrastText: '#ffffff',
    },
    success: {
      main: BRAND.success,
      light: BRAND.successLight,
      dark: BRAND.successDark,
      contrastText: '#ffffff',
    },
    warning: {
      main: BRAND.warning,
      light: BRAND.warningLight,
      dark: BRAND.warningDark,
      contrastText: '#ffffff',
    },
    error: {
      main: BRAND.error,
      light: BRAND.errorLight,
      dark: BRAND.errorDark,
      contrastText: '#ffffff',
    },
    info: {
      main: BRAND.info,
      light: BRAND.infoLight,
      dark: BRAND.infoDark,
      contrastText: '#ffffff',
    },
    background: {
      default: BRAND.surface.bg,
      paper: BRAND.surface.card,
    },
    text: {
      primary: BRAND.text.primary,
      secondary: BRAND.text.secondary,
    },
    divider: BRAND.surface.border,
  },
  typography: {
    fontFamily: "'Inter', 'Outfit', system-ui, -apple-system, sans-serif",
    h1: { fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.025em', color: BRAND.text.primary },
    h2: { fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: BRAND.text.primary },
    h3: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: BRAND.text.primary },
    h4: { fontSize: '1.25rem', fontWeight: 700, color: BRAND.text.primary },
    h5: { fontSize: '1.125rem', fontWeight: 600, color: BRAND.text.primary },
    h6: { fontSize: '1rem', fontWeight: 600, color: BRAND.text.primary },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.02em' },
    body1: { lineHeight: 1.6, color: '#334155' },
    body2: { lineHeight: 1.5, color: '#475569' },
    caption: { color: BRAND.text.muted },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BRAND.surface.bg,
          color: BRAND.text.primary,
          scrollbarColor: '#cbd5e1 #f1f5f9',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#f1f5f9',
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#cbd5e1',
            border: '2px solid #f1f5f9',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          fontWeight: 700,
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: BRAND.primaryGradient,
          boxShadow: BRAND.primaryGlow,
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: BRAND.surface.border,
          color: BRAND.text.primary,
          backgroundColor: '#ffffff',
          '&:hover': {
            borderColor: BRAND.primary,
            backgroundColor: 'rgba(79, 70, 229, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: BRAND.surface.card,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${BRAND.surface.border}`,
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: BRAND.surface.card,
          borderRadius: 16,
          border: `1px solid ${BRAND.surface.border}`,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: `1px solid ${BRAND.surface.border}`,
          borderRadius: 16,
          backgroundColor: BRAND.surface.card,
          fontSize: '0.8125rem',
          color: BRAND.text.primary,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',
            borderBottom: `1px solid ${BRAND.surface.border}`,
            color: '#475569',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            color: '#1e293b',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: '#ffffff',
            transition: 'background-color 0.15s ease',
            '&:nth-of-type(even)': {
              backgroundColor: '#f8fafc',
            },
            '&:hover': {
              backgroundColor: 'rgba(79, 70, 229, 0.05)',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${BRAND.surface.border}`,
            backgroundColor: '#f8fafc',
            color: '#475569',
          },
          '& .MuiTablePagination-root': {
            color: '#475569',
          },
          '& .MuiTablePagination-selectIcon': {
            color: '#475569',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: BRAND.surface.card,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.7rem',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#ffffff',
            color: BRAND.text.primary,
            '& fieldset': {
              borderColor: BRAND.surface.border,
              transition: 'border-color 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: BRAND.surface.borderHover,
            },
            '&.Mui-focused fieldset': {
              borderColor: BRAND.primary,
              boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.15)',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#94a3b8',
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
