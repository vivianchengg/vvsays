import { ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: { default: '#DAD5D1' },
          text: { primary: '#2F2E2D' },
          primary: { main: '#2F2E2D' },
        }
      : {
          background: { default: '#121212' },
          text: { primary: '#f5f5f5' },
          primary: { main: '#ff90cf' },
        }),
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});