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
import ClearIcon from '@mui/icons-material/Clear';

import useAppStore from '../stores/appStore'
import useBookStore from '../stores/bookStore'
import { CharacterIcon, iconCount } from './charactericon';
import CustomTheme from './customtheme';

import classes from './characterdialog.module.css'

export const DialogModes = {
    Add: 'add',
    Save: 'save',
}

const iconList = Array(iconCount).fill(0)

export default function CharacterDialog({ 
    mode = DialogModes.Save,
    bookId = '', 
    chapterId = '',
    characterId = '',
    onConfirm = undefined,
    onDelete = undefined,
    onClose = undefined, 
}) {

    const isDarkMode = useAppStore((state) => state.darkMode)

    const getChapter = useBookStore((state) => state.getChapter)
    const getCharacter = useBookStore((state) => state.getCharacter)
    const getCharacters = useBookStore((state) => state.getCharacters)

    const editChapter = useBookStore((state) => state.editChapter)
    const editCharacter = useBookStore((state) => state.editCharacter)

    const addCharacter = useBookStore((state) => state.addCharacter)
    const deleteCharacter = useBookStore((state) => state.deleteCharacter)

    const [name, setName] = React.useState('')
    const [characterPrompt, setCharacterPrompt] = React.useState('')
    const [sceneName, setSceneName] = React.useState('')
    const [scenePrompt, setScenePrompt] = React.useState('')
    const [icon, setIcon] = React.useState(0)
    const [isDeleteFlag, setDeleteFlag] = React.useState(false)

    React.useEffect(() => {

        if(bookId && chapterId && characterId ) {

            const character = getCharacter(characterId)
            const chapter = getChapter(chapterId)
            
            setName(character.name)
            setCharacterPrompt(character.prompt)
            setIcon(character.icon)
            
            setSceneName(chapter.name)

            if(chapter.characters.length > 0) {
                const scene_item = chapter.characters.find((item) => item.cid === characterId)
                if(scene_item) {
                    const character_scene_prompt = scene_item.prompt
                    setScenePrompt(character_scene_prompt)
                }
            }

            const chars = getCharacters(bookId)
            setDeleteFlag(chars.length === 1 ? true : false)

        }

    }, [bookId, chapterId, characterId ])

    const handleSave = () => {

        if(name.trim().length === 0 || characterPrompt.trim().length === 0) {
            return
        }

        let character = getCharacter(characterId)
        let chapter = getChapter(chapterId)

        character.name = name
        character.icon = icon
        character.prompt = characterPrompt

        let scene_prompts = chapter.characters
        if(scene_prompts.length > 0) {
            scene_prompts = scene_prompts.filter((item) => item.cid !== characterId)
        }
        if(scenePrompt.length > 0) {
            scene_prompts.push({ cid: characterId, prompt: scenePrompt })
        }

        chapter.characters = scene_prompts

        editCharacter(characterId, character)
        editChapter(chapterId, chapter)

        onConfirm()

    }

    const handleAdd = () => {

        addCharacter(bookId, name, icon, characterPrompt)

        onConfirm()

    }

    const handleDelete = () => {

        deleteCharacter(characterId)

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
                        placeholder='Enter Character Name'
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
                        required
                        multiline
                        maxRows={6}
                        label='Prompt'
                        placeholder='Enter Character Prompt'
                        value={characterPrompt}
                        onChange={(e) => setCharacterPrompt(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={characterPrompt.length === 0}
                                    onClick={() => setCharacterPrompt('')}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </FormControl>
                </div>
                {
                    mode === DialogModes.Save &&
                    <div className={classes.item}>
                        <FormControl fullWidth>
                            <TextField
                            fullWidth
                            multiline
                            maxRows={6}
                            label={`Scene Prompt: ${sceneName}`}
                            placeholder="Enter Character Prompt for this Scene"
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
                }
                <div className={classes.action}>
                    <div className={classes.icon}>
                        <FormControl 
                        size="small"
                        >
                            <InputLabel id="icon-label">Icon</InputLabel>
                            <Select
                            labelId="icon-label"
                            label="Icon"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}
                            >
                                {
                                    iconList.map((_, index) => {
                                        return (
                                            <MenuItem key={index} value={index}>
                                                <CharacterIcon icon={index} color={isDarkMode ? '#fff' : '#333'} />
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.buttons}>
                        {
                            mode === DialogModes.Save &&
                            <Button color="error" disabled={isDeleteFlag} onClick={handleDelete} sx={{mr: 2}}>Delete</Button>
                        }
                        {
                            mode === DialogModes.Save &&
                            <Button disabled={name.length === 0 || characterPrompt.length === 0} onClick={handleSave}>Save</Button>
                        }
                        {
                            mode === DialogModes.Add &&
                            <Button disabled={name.length === 0 || characterPrompt.length === 0} onClick={handleAdd}>Add</Button>
                        }
                        <Button onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
        </CustomTheme>
    )
}

CharacterDialog.propTypes = {
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
     * CharacterId string
     */
    characterId: PropTypes.string,
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