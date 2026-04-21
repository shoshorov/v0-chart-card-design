"use client"

import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    background: {
      default: "#09090b",
      paper: "#18181b",
    },
    text: {
      primary: "#fafafa",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "transparent",
        },
      },
    },
  },
})

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
