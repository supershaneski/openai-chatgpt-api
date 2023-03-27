import React from 'react'
import PropTypes from 'prop-types'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';

import useBookStore from '../stores/bookStore'
import CustomTheme from './customtheme';

import classes from './userdialog.module.css'

export default function UserDialog({ 
    bookId = '', 
    chapterId = '',
    onConfirm = undefined,
    onClose = undefined, 
}) {

    const getUser = useBookStore((state) => state.getUserByBookId)
    const getChapter = useBookStore((state) => state.getChapter)

    const editUser = useBookStore((state) => state.editUser)
    const editChapter = useBookStore((state) => state.editChapter)

    const [name, setName] = React.useState('')
    const [userPrompt, setUserPrompt] = React.useState('')
    const [sceneName, setSceneName] = React.useState('')
    const [scenePrompt, setScenePrompt] = React.useState('')
    const [icon, setIcon] = React.useState(0)

    React.useEffect(() => {

        if(bookId && chapterId) {

            const user = getUser(bookId)
            const chapter = getChapter(chapterId)
            
            setName(user.name)
            setUserPrompt(user.prompt)

            setSceneName(chapter.name)
            setScenePrompt(chapter.user)

        }

    }, [bookId, chapterId])

    const handleSave = () => {

        let user = getUser(bookId)
        let chapter = getChapter(chapterId)

        user.name = name
        user.prompt = userPrompt
        chapter.user = scenePrompt

        editUser(bookId, user)
        editChapter(chapterId, chapter)

        onConfirm()

    }

    const handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <CustomTheme>
        <div className={classes.container} onClick={onClose}>
            <div className={classes.dialog} onClick={handleClick}>
                <div className={classes.item}>
                    <FormControl fullWidth>
                        <TextField
                        fullWidth
                        required
                        label='Name'
                        placeholder='Enter User Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={name.length === 0}
                                    onClick={() => setName('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </FormControl>
                </div>
                <div className={classes.item}>
                    <FormControl fullWidth>
                        <TextField
                        fullWidth
                        multiline
                        maxRows={6}
                        label='Prompt'
                        placeholder='Enter User Prompt'
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={userPrompt.length === 0}
                                    onClick={() => setUserPrompt('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </FormControl>
                </div>
                <div className={classes.item}>
                    <FormControl fullWidth>
                        <TextField
                        fullWidth
                        multiline
                        maxRows={6}
                        label={`Scene Prompt: ${sceneName}`}
                        placeholder="Enter User Prompt for this Scene"
                        value={scenePrompt}
                        onChange={(e) => setScenePrompt(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={scenePrompt.length === 0}
                                    onClick={() => setScenePrompt('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </FormControl>
                </div>
                <div className={classes.action}>
                    <div className={classes.icon}>
                        <FormControl 
                        size="small"
                        >
                            <InputLabel id="icon-label">Icon</InputLabel>
                            <Select
                            disabled={true}
                            labelId="icon-label"
                            label="Icon"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            >
                                <MenuItem value={0}>
                                    <PersonIcon />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.buttons}>
                        <Button
                        disabled={name.length === 0}
                        onClick={handleSave}
                        >Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
        </CustomTheme>
    )
}

UserDialog.propTypes = {
    /**
     * BookId string
     */
    bookId: PropTypes.string,
    /**
     * ChapterId string
     */
    chapterId: PropTypes.string,
    /**
     * Confirm event handler
     */
    onConfirm: PropTypes.func,
    /**
     * Close event handler
     */
    onClose: PropTypes.func
}