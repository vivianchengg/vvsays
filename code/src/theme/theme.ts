import { ThemeOptions } from '@mui/material';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: { default: '#FCF8ED' },
          text: { primary: '#2F2E2D' },
          primary: { main: '#2F2E2D' },
        }
      : {
        background: { default: '#FCF8ED' },
        text: { primary: '#2F2E2D' },
        primary: { main: '#2F2E2D' },
        }),
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
  },
});