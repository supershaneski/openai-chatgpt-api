import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import NoSsr from '@mui/base/NoSsr'

import useAppStore from '../stores/appStore'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    }
})

export default function CustomTheme({ children }) {

    const isDarkTheme = useAppStore((state) => state.darkMode)
    
    return (
        <NoSsr>
            <ThemeProvider 
            theme={isDarkTheme ? darkTheme : lightTheme}
            >
                { children }
            </ThemeProvider>
        </NoSsr>
    )
}