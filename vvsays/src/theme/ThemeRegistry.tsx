'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo, useEffect, useState, createContext } from 'react';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

export const ThemeModeContext = createContext({
  toggleColorMode: () => {},
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDark ? 'dark' : 'light');
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}