"use client"

import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#018940",
    },
    background: {
      default: "#F2F2F2",
      paper: "#ffffff",
    },
    text: {
      primary: "#111111",
      secondary: "#6b7280",
    },
    divider: "#D6D6D6",
  },
  typography: {
    fontFamily: "inherit",
    fontSize: 12,
  },
})

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
