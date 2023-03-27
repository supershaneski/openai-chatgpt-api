import React from 'react'
import PropTypes from 'prop-types'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import NoSsr from '@mui/base/NoSsr'

import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

import PersonIcon from '@mui/icons-material/Person'
import GroupIcon from '@mui/icons-material/Group'

import useAppStore from '../stores/appStore'

const buttonLightTheme = createTheme({
    palette: {
        primary: {
            main: '#00bd7e',
        },
        secondary: {
            main: '#fff',
        },
        tertiary: {
            main: '#fff'
        }
    }
})

const buttonDarkTheme = createTheme({
    palette: {
        primary: {
            main: '#00bd7e',
        },
        secondary: {
            main: '#555', //9
        },
        tertiary: {
            main: '#555'
        }
    }
})

export const ChatModes = {
    Group: 'group',
    Person: 'person',
}

export default function ToggleButton({ 
    mode = ChatModes.Person, 
    onChange = undefined,
}) {

    const isDarkMode = useAppStore((state) => state.darkMode)
    
    const defColor = isDarkMode ? '#fff' : '#333'

    return (
        <NoSsr>
            <ThemeProvider theme={isDarkMode ? buttonDarkTheme : buttonLightTheme}>
                <ButtonGroup variant="contained">
                    <Button onClick={() => onChange(ChatModes.Person)} 
                    color={mode === ChatModes.Person ? "primary" : "secondary"}>
                        <PersonIcon 
                        style={{color: mode === ChatModes.Person ? "#fff" : defColor}}
                        />
                    </Button>
                    <Button onClick={() => onChange(ChatModes.Group)} 
                    color={mode === ChatModes.Group ? "primary" : "secondary"}>
                        <GroupIcon
                        style={{color: mode === ChatModes.Group ? "#fff" : defColor}}
                        />
                    </Button>
                </ButtonGroup>
            </ThemeProvider>
        </NoSsr>
    )
}

ToggleButton.propTypes = {
    /**
     * Current mode
     */
    mode: PropTypes.oneOf(['group', 'person']),
    /**
     * Change event handler
     */
    onChange: PropTypes.func,
}