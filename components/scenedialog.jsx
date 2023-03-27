import React from 'react'
import PropTypes from 'prop-types'

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

import ClearIcon from '@mui/icons-material/Clear';

import useBookStore from '../stores/bookStore'
import CustomTheme from './customtheme';

import classes from './scenedialog.module.css'

export const DialogModes = {
    Add: 'add',
    Save: 'save',
}

export default function SceneDialog({ 
    mode = DialogModes.Save,
    bookId = '', 
    chapterId = '',
    onConfirm = undefined,
    onClose = undefined, 
    onDelete = undefined,
}) {

    //const getUser = useBookStore((state) => state.getUserByBookId)
    const getChapter = useBookStore((state) => state.getChapter)
    const getChapters = useBookStore((state) => state.getChapters)
    //const getCharacter = useBookStore((state) => state.getCharacter)

    //const editUser = useBookStore((state) => state.editUser)
    const editChapter = useBookStore((state) => state.editChapter)
    //const editCharacter = useBookStore((state) => state.editCharacter)

    //const addCharacter = useBookStore((state) => state.addCharacter)
    const addChapter = useBookStore((state) => state.addChapter)

    const deleteChapter = useBookStore((state) => state.deleteChapter)

    const [name, setName] = React.useState('')
    const [scenePrompt, setScenePrompt] = React.useState('')
    const [isDeleteFlag, setDeleteFlag] = React.useState(false)
    
    React.useEffect(() => {

        if(chapterId ) {

            const chapter = getChapter(chapterId)
            
            setName(chapter.name)
            setScenePrompt(chapter.prompt)

            const chaps = getChapters(bookId)
            setDeleteFlag(chaps.length === 1 ? true : false)

        }

    }, [ chapterId ])

    const handleSave = () => {

        let chapter = getChapter(chapterId)

        chapter.name = name
        chapter.prompt = scenePrompt
        
        editChapter(chapterId, chapter)

        onConfirm()

    }

    const handleAdd = () => {

        addChapter(bookId, name, scenePrompt)

        onConfirm()

    }

    const handleDelete = () => {

        deleteChapter(chapterId)
        
        onDelete()

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
                        placeholder='Enter Scene Name'
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
                        placeholder='Enter Scene Prompt'
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
                    <div className={classes.buttons}>
                        {
                            mode === DialogModes.Save &&
                            <Button color="error" sx={{mr: 2}} disabled={isDeleteFlag} onClick={handleDelete}>Delete</Button>
                        }
                        {
                            mode === DialogModes.Save &&
                            <Button disabled={name.length === 0} onClick={handleSave}>Save</Button>
                        }
                        {
                            mode === DialogModes.Add &&
                            <Button disabled={name.length === 0} onClick={handleAdd}>Add</Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
        </CustomTheme>
    )
}

SceneDialog.propTypes = {
    /**
     * Mode of operation
     */
    mode: PropTypes.oneOf(['add', 'save']),
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
    onClose: PropTypes.func,
    /**
     * Delete event handler
     */
    onDelete: PropTypes.func,
}