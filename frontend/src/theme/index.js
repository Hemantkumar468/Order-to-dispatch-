import { createTheme, alpha } from '@mui/material/styles';
import { BRAND } from './brand';

const theme = createTheme({
  palette: {
    mode: 'dark',
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
    fontFamily: '"Inter", "Outfit", system-ui, -apple-system, sans-serif',
    h1: { fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.025em', color: BRAND.text.primary },
    h2: { fontSize: '1.875rem', fontWeight: 800, letterSpacing: '-0.025em', color: BRAND.text.primary },
    h3: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: BRAND.text.primary },
    h4: { fontSize: '1.25rem', fontWeight: 700, color: BRAND.text.primary },
    h5: { fontSize: '1.125rem', fontWeight: 600, color: BRAND.text.primary },
    h6: { fontSize: '1rem', fontWeight: 600, color: BRAND.text.primary },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.02em' },
    body1: { lineHeight: 1.6, color: '#e2e8f0' },
    body2: { lineHeight: 1.5, color: '#cbd5e1' },
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
          scrollbarColor: '#334155 #0b0f19',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#0b0f19',
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#334155',
            border: '2px solid #0b0f19',
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
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 6px 24px rgba(99, 102, 241, 0.55)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: BRAND.surface.border,
          color: BRAND.text.primary,
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          '&:hover': {
            borderColor: BRAND.primaryLight,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: BRAND.surface.card,
          boxShadow: '0 4px 24px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)',
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
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.35)',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 16,
          backgroundColor: BRAND.surface.card,
          fontSize: '0.8125rem',
          color: BRAND.text.primary,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: BRAND.surface.header,
            borderBottom: `1px solid ${BRAND.surface.border}`,
            color: '#94a3b8',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            display: 'flex',
            alignItems: 'center',
            color: '#e2e8f0',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: BRAND.surface.card,
            transition: 'background-color 0.15s ease',
            '&:nth-of-type(even)': {
              backgroundColor: 'rgba(255, 255, 255, 0.015)',
            },
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${BRAND.surface.border}`,
            backgroundColor: BRAND.surface.header,
            color: '#94a3b8',
          },
          '& .MuiTablePagination-root': {
            color: '#94a3b8',
          },
          '& .MuiTablePagination-selectIcon': {
            color: '#94a3b8',
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
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            color: '#f8fafc',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
              transition: 'border-color 0.2s ease',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: BRAND.primary,
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#64748b',
            opacity: 1,
          },
        },
      },
    },
  },
});

export default theme;
