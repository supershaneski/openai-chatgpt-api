'use client'

import React from 'react'
import { createPortal } from 'react-dom'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'

import StoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import SendIcon from '@mui/icons-material/Send'

import RefreshIcon from '@mui/icons-material/Refresh'
import PersonIcon from '@mui/icons-material/Person'
import ToggleButton, { ChatModes } from '../components/togglebutton'

import ContentItem from '../components/contentitem'

import classes from './sandbox.module.css'

import BookDialog from '../components/bookdialog'
import SceneDialog, { DialogModes as SceneDialogModes } from '../components/scenedialog'
import CharacterDialog, { DialogModes as CharacterDialogModes } from '../components/characterdialog'
import UserDialog from '../components/userdialog'
import DeleteDialog, { DeleteModes } from '../components/deletedialog'

import AvatarItem from '../components/avataritem'
import LoadingText from '../components/loadingtext'

import CustomTheme from '../components/customtheme'

import { getDataId } from '../lib/utils'

import useAppStore from '../stores/appStore'
import useDataStore from '../stores/dataStore'
import useBookStore from '../stores/bookStore'

const sendRequest = async (payload) => {

    let response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    if(response.ok) {

        return await response.json()

    } else {
        
        const errorBody = await response.json()
        const errorMessage = errorBody.error
        const status = response.status

        throw Error(`status code: ${status} Error: ${errorMessage}`)

    }

}

export default function SandBox() {

    const inputRef = React.useRef()
    const messageRef = React.useRef()
    const timerRef = React.useRef()

    const setDarkMode = useAppStore((state) => state.setDarkMode)
    const chatMode = useAppStore((state) => state.chatMode)
    const setChatMode = useAppStore((state) => state.setChatMode)

    const getData = useDataStore((state) => state.getDataBySceneId)
    const updateData = useDataStore((state) => state.updateDataBySceneId)
    const deleteData = useDataStore((state) => state.deleteDataById)
    const addData = useDataStore((state) => state.addData)

    const bookId = useBookStore((state) => state.bookId)
    const chapterId = useBookStore((state) => state.chapterId)
    const characterId = useBookStore((state) => state.characterId)
    
    const getBook = useBookStore((state) => state.getBook)
    const getChapter = useBookStore((state) => state.getChapter)
    const getChapters = useBookStore((state) => state.getChapters)
    const getCharacter = useBookStore((state) => state.getCharacter)
    const getCharacters = useBookStore((state) => state.getCharacters)
    const getUser = useBookStore((state) => state.getUserByBookId)

    const addScene = useBookStore((state) => state.addChapter)
    const addCharacter = useBookStore((state) => state.addCharacter)

    const selectBook = useBookStore((state) => state.selectBook)
    const selectChapter = useBookStore((state) => state.selectChapter)
    const selectCharacter = useBookStore((state) => state.selectCharacter)

    const [bookName, setBookName] = React.useState('')
    const [chapterName, setChapterName] = React.useState('')
    const [chapterDescription, setChapterDescription] = React.useState('')

    const [chapterItems, setChapterItems] = React.useState([])
    const [characterItems, setCharacterItems] = React.useState([])

    const [dataMessages, setDataMessages] = React.useState([])
    const [sendFlag, setSendFlag] = React.useState(false)

    const [openBookDialog, setBookDialog] = React.useState(false)
    const [openSceneDialog, setSceneDialog] = React.useState(false)
    const [openUserDialog, setUserDialog] = React.useState(false)
    const [openCharacterDialog, setCharacterDialog] = React.useState(false)
    const [openDeleteDialog, setDeleteDialog] = React.useState(false)
    const [deleteMode, setDeleteMode] = React.useState(DeleteModes.Character)

    //const [chatMode, setChatMode] = React.useState(ChatModes.Person)
    const [sceneMode, setSceneMode] = React.useState(SceneDialogModes.Save)
    const [characterMode, setCharacterMode] = React.useState(CharacterDialogModes.Save)

    const [isMounted, setMounted] = React.useState(false)

    const [inputText, setInputText] = React.useState('')

    const [anchorEl, setAnchorEl] = React.useState(null)
    
    const openMenu = Boolean(anchorEl)

    React.useEffect(() => {

        setMounted(true)

        return () => {
            setMounted(false)
        }

    }, [])

    React.useEffect(() => {

        const handleModeChange = (e) => {
            
            setDarkMode(e.matches)
        }

        if(isMounted) {

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleModeChange)
    
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

            setDarkMode(isDarkMode)
            
        }
    
        return () => {

            try {
                window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleModeChange)
            } catch(err) {
                //
            }
            
        }
    
    }, [isMounted])
    
    React.useEffect(() => {

        refreshApp()

    }, [bookId])

    const refreshApp = React.useCallback(() => {

        console.log("[refresh app]")

        const book = getBook(bookId)
        const chapter = getChapter(chapterId)

        setBookName(book.name)
        setChapterName(chapter.name)
        setChapterDescription(chapter.prompt)

        setChapterItems(getChapters(bookId))

        setCharacterItems(getCharacters(bookId))

        const raw_data = getData(chapterId)
        const prev_data = raw_data.map((item) => item.data)
        setDataMessages(prev_data)

    }, [bookId, chapterId])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        submitPrompt(0)
    }

    const submitPrompt = (mode = 0) => {

        const chapter = getChapter(chapterId)
        const character = getCharacter(characterId)
        const user = getUser(bookId)
        const book = getBook(bookId)

        let system_content = character.prompt
        if(book.prompt) system_content += '\nBackstory:\n' + book.prompt
        if(chapter.prompt) system_content += '\nScene:\n' + chapter.prompt
        if(chapter.characters.length > 0 && chapter.characters.some((item) => item.cid === characterId)) {
            const chapter_character_prompt = chapter.characters.find((item) => item.cid === characterId).prompt
            system_content += '\n' + chapter_character_prompt
        }
        const chapter_user_prompt = chapter.user
        if(user.prompt) {
            system_content += '\nAs the user, I have the following attributes:\n' + user.prompt
            if(chapter_user_prompt) system_content += '\n' + chapter_user_prompt
        } else {
            system_content += '\nAs the user, I have the following attributes:\n' + chapter_user_prompt
        }

        let system_prompt = { role: 'system', content: system_content }
        
        const previous_prompts = dataMessages.filter((item) => {
            if(item.type === 'user') {
                if(item.character === characterId) {
                    return true
                }
            } else {
                if(item.id === characterId) {
                    return true
                }
            }
            return false
        }).map((item) => {
            if(item.type === 'user') {
                return {
                    role: 'user',
                    content: item.content
                }
            } else {
                return {
                    role: 'assistant',
                    content: item.content
                }
            }
        })

        let user_prompt = { role: 'user', content: inputText }

        setInputText('')
        inputRef.current.blur()

        const post_id = getDataId()

        const user_data_message = { pid: post_id, type: 'user', content: inputText, character: characterId, }
        setDataMessages((prev) => {
            let items = prev.slice(0)
            items.push(user_data_message)
            return items
        })
        addData({ id: post_id, sid: chapterId, data: user_data_message })

        scrollToTop()

        setSendFlag(true)

        sendRequest({ 
            system: system_prompt, 
            prompt: user_prompt, 
            previous: previous_prompts, 
        }).then((resp) => {

            const new_post_id = getDataId()
            const new_system_data = { pid: new_post_id, type: 'assistant', content: resp.reply.content, icon: character.icon, id: characterId, name: character.name}

            setDataMessages((prev) => {
                let items = prev.slice(0)
                //items.push({ type: 'assistant', content: resp.reply.content, icon: character.icon, id: characterId, name: character.name})
                items.push(new_system_data)
                return items
            })
            addData({ id: new_post_id, sid: chapterId, data: new_system_data })

            setSendFlag(false)

            scrollToTop()
            
        }).catch((error) => {

            console.log(error)

            const new_post_id = getDataId()
            const new_system_error_data = { pid: new_post_id, type: 'assistant', content: error, icon: character.icon, id: characterId, name: character.name}

            setDataMessages((prev) => {
                let items = prev.slice(0)
                //items.push({ type: 'assistant', content: error, icon: character.icon, id: characterId, name: character.name})
                items.push(new_system_error_data)
                return items
            })
            addData({ id: new_post_id, sid: chapterId, data: new_system_error_data })

            setSendFlag(false)

            scrollToTop()

        })
        
    }

    const scrollToTop = () => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }, 100)
    }

    const handleScenarioClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelectChapter = (id) => (e) => {

        const chapter = getChapter(id)

        const name = chapter.name
        const description = chapter.prompt

        selectChapter(id)

        setChapterName(name)
        setChapterDescription(description)

        setAnchorEl(null)

        const raw_data = getData(id)
        const prev_data = raw_data.map((item) => item.data)
        setDataMessages(prev_data)

    }

    const handleSelectCharacter = (id) => {
        
        selectCharacter(id)

    }

    const handleOpenSettings = () => {
        setBookDialog(true)
    }

    const handleCloseBookDialog = (book_id) => {

        if(bookId !== book_id) {

            const book = getBook(book_id)

            selectBook(book_id)
            //setDataMessages([])
            setBookName(book.name)

        }

        setBookDialog(false)

    }

    const handleConfirmBook = (book_id) => {
        
        const book = getBook(book_id)

        selectBook(book_id)

        setDataMessages([])
        setBookName(book.name)

        setBookDialog(false)

    }

    const handleConfirmUserDialog = () => {
        setUserDialog(false)
    }

    const handleCloseUserDialog = () => {
        setUserDialog(false)
    }

    const handleOpenUserDialog = () => {
        setUserDialog(true)
    }
    
    const handleAddNewScene = () => {

        const newId = addScene(bookId, 'New Scene', '')

        setTimeout(() => {

            setChapterItems(getChapters(bookId))

            selectChapter(newId)
            const chapter = getChapter(newId)

            setChapterName(chapter.name)
            setChapterDescription(chapter.prompt)

            setDataMessages([])

        }, 500)
    }

    const handleOpenSceneDialog = () => {
        setSceneMode(SceneDialogModes.Save)
        setSceneDialog(true)
    }

    const handleCloseSceneDialog = () => {
        setSceneDialog(false)
    }

    const handleConfirmSceneDialog = () => {

        const chapter = getChapter(chapterId)

        setChapterName(chapter.name)
        setChapterDescription(chapter.prompt)

        setSceneDialog(false)
    }

    const handleDeleteSceneDialog = () => {

        const chaps = getChapters(bookId)

        setChapterItems(chaps)

        selectChapter(chaps[0].id)

        setChapterName(chaps[0].name)
        setChapterDescription(chaps[0].prompt)

        setSceneDialog(false)

        const raw_data = getData(chaps[0].id)
        const prev_data = raw_data.map((item) => item.data)
        setDataMessages(prev_data)

    }
    
    const handleAddNewCharacter = () => {
        
        const newId = addCharacter(bookId, 'New Character', 1, 'You will act as a helpful assistant.')

        setTimeout(() => {

            setCharacterItems(getCharacters(bookId))

            selectCharacter(newId)

        }, 500)

    }

    const handleOpenCharacterDialog = () => {
        setCharacterMode(CharacterDialogModes.Save)
        setCharacterDialog(true)
    }

    const handleCloseCharacterDialog = () => {
        setCharacterDialog(false)
    }

    const handleConfirmCharacterDialog = () => {
        
        const characters = getCharacters(bookId)
        setCharacterItems(characters)
        
        setCharacterDialog(false)
    }

    const handleDeleteCharacterDialog = () => {

        const characters = getCharacters(bookId)
        
        setCharacterItems(characters)

        selectCharacter(characters[0].id)
        
        setCharacterDialog(false)

    }

    const handleKeyDown = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault()
            e.stopPropagation()

            submitPrompt()

        }
    }

    const SelectedChapter = React.useCallback(() => {
        return chapterDescription.length > 0 ? <span className={classes.text}><strong>{ chapterName }</strong> - { chapterDescription }</span> : <span className={classes.text}><strong>{ chapterName }</strong></span>
    }, [chapterName, chapterDescription])

    const handleDeleteMessage = (pid) => {
        
        deleteData(pid)
        setDataMessages((prev) => {
            let items = prev.slice(0).filter((item) => item.pid !== pid)
            return items
        })

    }
    
    const deleteMessages = () => {

        setDeleteMode(chatMode === ChatModes.Person ? DeleteModes.Character : DeleteModes.Scene)
        setDeleteDialog(true)

        /*let data = dataMessages.slice(0)

        if(chatMode === ChatModes.Person) {

            data = data.filter((item) => {
                if(item.type === 'assistant') {
                    return item.id !== characterId
                } else {
                    return item.character !== characterId
                }
            })

            let saved_data = []

            if(data.length > 0) {
                saved_data = data.map((item) => {
                    return {
                        id: item.pid,
                        sid: chapterId,
                        data: item,
                    }
                })
            }

            updateData(chapterId, saved_data)
            setDataMessages(data)

        } else {

            updateData(chapterId, [])
            setDataMessages([])

        }*/

    }

    const handleChangeMode = (mode) => {
        setChatMode(mode)
        scrollToTop()
    }

    const handleDeleteDialog = () => {
        
        let data = dataMessages.slice(0)

        if(chatMode === ChatModes.Person && deleteMode === DeleteModes.Character) {

            data = data.filter((item) => {
                if(item.type === 'assistant') {
                    return item.id !== characterId
                } else {
                    return item.character !== characterId
                }
            })

            let saved_data = []

            if(data.length > 0) {
                saved_data = data.map((item) => {
                    return {
                        id: item.pid,
                        sid: chapterId,
                        data: item,
                    }
                })
            }

            updateData(chapterId, saved_data)
            setDataMessages(data)

        } else {

            updateData(chapterId, [])
            setDataMessages([])

        }

        setDeleteDialog(false)

    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog(false)
    }

    const getDeleteFlagEnabled = dataMessages.filter((item) => {
            if(chatMode === ChatModes.Person) {
                if(item.type === 'assistant') {
                    return item.id === characterId
                } else {
                    return item.character === characterId
                }
            } else {
                return true
            }
        }).length > 0

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.toolbar}>
                    <div className={classes.toolTitle}>
                        <div className={classes.toolIcon}>
                            <StoriesIcon style={{fontSize: '1rem', color: '#fff' }} />
                        </div>
                        <h1 className={classes.title}>Story - { bookName }</h1>
                    </div>
                    <CustomTheme>
                        <IconButton onClick={handleOpenSettings}>
                            <SettingsIcon style={{color: '#fff'}} />
                        </IconButton>
                    </CustomTheme>
                </div>
                <div className={classes.scenario}>
                    <div onClick={handleScenarioClick} className={classes.scenarioTitle}>
                        <SelectedChapter />
                    </div>
                    <div className={classes.scenarioControl}>
                        <CustomTheme>
                            <IconButton onClick={handleOpenSceneDialog}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleAddNewScene}>
                                <AddIcon />
                            </IconButton>
                        </CustomTheme>
                    </div>
                    <CustomTheme>
                        <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        >
                            {
                                chapterItems.length > 0 &&
                                chapterItems.map((item) => {
                                    const text = item.prompt.length > 0 ? ` - ${item.prompt}` : ''
                                    return (
                                        <MenuItem 
                                        key={item.id} 
                                        onClick={handleSelectChapter(item.id)}
                                        selected={item.id === chapterId}
                                        >
                                            <Typography noWrap><strong>{item.name}</strong>{ text }</Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </CustomTheme>
                </div>
                <div className={classes.systems}>
                    <div className={classes.systemItems}>
                        <div className={classes.avatars}>
                        {
                            characterItems.length > 0 &&
                            characterItems.map((item) => {
                                return (
                                    <AvatarItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    icon={item.icon}
                                    selected={item.id === characterId}
                                    onClick={handleSelectCharacter}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className={classes.systemControl}>
                        <CustomTheme>
                            <IconButton onClick={handleOpenCharacterDialog}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleAddNewCharacter}>
                                <AddIcon />
                            </IconButton>
                        </CustomTheme>
                    </div>
                </div>
            </div>
            <div className={classes.main}>
                <div ref={messageRef} className={classes.mainMessages}>
                {
                    dataMessages.filter((item) => {
                        if(chatMode === ChatModes.Person) {
                            if(item.type === 'assistant') {
                                return item.id === characterId
                            } else {
                                return item.character === characterId
                            }
                        } else {
                            return true
                        }
                    }).length > 0 &&
                    dataMessages.filter((item) => {
                        if(chatMode === ChatModes.Person) {
                            if(item.type === 'assistant') {
                                return item.id === characterId
                            } else {
                                return item.character === characterId
                            }
                        } else {
                            return true
                        }
                    }).map((item, index) => {
                        return (
                            <div key={index} className={classes.messageItem}>
                                <ContentItem 
                                icon={item?.icon || 0} 
                                role={item.type} 
                                content={item.content} 
                                name={item?.name}
                                onDelete={() => handleDeleteMessage(item.pid)}
                                />
                            </div>
                        )
                    })
                }
                {
                    sendFlag &&
                    <LoadingText />
                }
                </div>
                <div className={classes.mainTop}>
                    <ToggleButton mode={chatMode} onChange={handleChangeMode} />
                </div>
            </div>
            <div className={classes.input}>
                <div className={classes.mainBottom}>
                    <CustomTheme>
                        <Tooltip title="Delete Messages">
                        <Fab 
                        color="tertiary" 
                        disabled={!getDeleteFlagEnabled}
                        onClick={deleteMessages}
                        sx={{opacity: .8}}
                        >
                            <RefreshIcon />
                        </Fab>
                        </Tooltip>
                    </CustomTheme>
                </div>
                <div className={classes.inputDiv}>
                    <CustomTheme>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField 
                            fullWidth
                            multiline
                            maxRows={6}
                            inputRef={inputRef}
                            value={inputText}
                            placeholder='Write message...'
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setInputText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleOpenUserDialog}>
                                            <PersonIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <>
                                        <IconButton
                                        disabled={inputText.length === 0}
                                        onClick={() => setInputText('')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                        <IconButton
                                        disabled={inputText.length === 0}
                                        onClick={handleSubmit}
                                        >
                                            <SendIcon />
                                        </IconButton>
                                        </>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </Box>
                    </CustomTheme>
                </div>
            </div>
            {
                openDeleteDialog && createPortal(
                    <DeleteDialog 
                    mode={deleteMode}
                    onClose={handleCloseDeleteDialog} 
                    onDelete={handleDeleteDialog} 
                    />,
                    document.body,
                )
            }
            {
                openBookDialog && createPortal(
                    <BookDialog onClose={handleCloseBookDialog} onConfirm={handleConfirmBook} />,
                    document.body,
                )
            }
            {
                openSceneDialog && createPortal(
                    <SceneDialog 
                    mode={sceneMode}
                    bookId={bookId}
                    chapterId={chapterId}
                    onClose={handleCloseSceneDialog} 
                    onConfirm={handleConfirmSceneDialog}
                    onDelete={handleDeleteSceneDialog}
                    />,
                    document.body,
                )
            }
            {
                openCharacterDialog && createPortal(
                    <CharacterDialog 
                    mode={characterMode}
                    bookId={bookId}
                    chapterId={chapterId}
                    characterId={characterId}
                    onClose={handleCloseCharacterDialog} 
                    onConfirm={handleConfirmCharacterDialog}
                    onDelete={handleDeleteCharacterDialog}
                    />,
                    document.body,
                )
            }
            {
                openUserDialog && createPortal(
                    <UserDialog 
                    bookId={bookId}
                    chapterId={chapterId}
                    onClose={handleCloseUserDialog} 
                    onConfirm={handleConfirmUserDialog} />,
                    document.body,
                )
            }
        </div>
    )
}