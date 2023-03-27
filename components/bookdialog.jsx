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
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear';

import useBookStore from '../stores/bookStore'
import CustomTheme from './customtheme';
import classes from './bookdialog.module.css'

const ADD_NEW_KEY = 'ADD_NEW_STORY'
const STORY_PLACEHOLDER = 'Enter Story Title'

export default function BookDialog({ 
    onConfirm = undefined,
    onClose = undefined, 
}) {

    const books = useBookStore((state) => state.books)
    const defBookId = useBookStore((state) => state.bookId)

    const getBook = useBookStore((state) => state.getBook)
    const editBook = useBookStore((state) => state.editBook)
    const addBook = useBookStore((state) => state.addBook)
    const deleteBook = useBookStore((state) => state.deleteBook)
    
    const [bookId, setBookId] = React.useState('')
    const [prevTitle, setPrevTitle] = React.useState(STORY_PLACEHOLDER)
    const [title, setTitle] = React.useState('')
    const [storyPrompt, setStoryPrompt] = React.useState('')
    const [isDeleteFlag, setDeleteFlag] = React.useState(false)
    const [isDeleteDef, setDeleteDef] = React.useState(false)

    React.useEffect(() => {
        
        setBookId(defBookId)

    }, [])

    React.useEffect(() => {

        setDeleteFlag(books.length === 1 ? true : false)

    }, [books])
    
    React.useEffect(() => {

        if(bookId) {

            if(bookId === ADD_NEW_KEY) {

                setPrevTitle(STORY_PLACEHOLDER)
                setTitle('Untitled Story')
                setStoryPrompt('')

            } else {

                const book = getBook(bookId)
                setPrevTitle(book.name)
                setTitle(book.name)
                setStoryPrompt(book.prompt)

            }

        }

    }, [bookId])

    const handleBook = () => {
        
        onConfirm(bookId)

    }

    const handleSelect = (e) => {

        setBookId(e.target.value)
        
    }

    const handleAdd = () => {
        
        const newId = addBook(title, storyPrompt)

        setTimeout(() => {
            setBookId(newId)
        }, 500)

    }

    const handleEdit = () => {
        
        const book = {
            id: bookId,
            name: title,
            prompt: storyPrompt,
        }

        editBook(bookId, book)

    }

    const handleDelete = () => {

        const notSelBookId = books.find((item) => item.id !== bookId).id
        
        deleteBook(bookId)

        setBookId(notSelBookId)

        if(defBookId === bookId) {
            setDeleteDef(true)
        }

    }

    const handleClose = () => {

        onClose(isDeleteDef ? bookId : defBookId)

    }

    const handleClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }

    return (
        <CustomTheme>
        <div className={classes.container} onClick={handleClose}>
            <div className={classes.dialog} onClick={handleClick}>
                <div className={classes.item}>
                    <FormControl 
                    fullWidth
                    >
                        <InputLabel id="icon-label">Story</InputLabel>
                        <Select
                        labelId="icon-label"
                        label="Story"
                        value={bookId}
                        onChange={handleSelect}
                        >
                            {
                                books.map((item) => {
                                    return (
                                        <MenuItem key={item.id} value={item.id}>{ item.name }</MenuItem>
                                    )
                                })
                            }
                            <Divider />
                            <MenuItem value={ADD_NEW_KEY}>Add New Story...</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.item}>
                    <FormControl fullWidth>
                        <TextField
                        fullWidth
                        required
                        label='Title'
                        placeholder={`${prevTitle}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={title.length === 0}
                                    onClick={() => setTitle('')}
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
                        maxRows={10}
                        label='Prompt'
                        placeholder='Enter Story Prompt'
                        value={storyPrompt}
                        onChange={(e) => setStoryPrompt(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={storyPrompt.length === 0}
                                    onClick={() => setStoryPrompt('')}
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
                    {
                        bookId === ADD_NEW_KEY &&
                        <div className={classes.edit}>
                            <Button
                            disabled={title.length === 0}
                            onClick={handleAdd}>Add Story</Button>
                        </div>
                    }
                    {
                        bookId !== ADD_NEW_KEY &&
                        <div className={classes.edit}>
                            <Button
                            disabled={title.length === 0}
                            onClick={handleEdit}>Edit Story</Button>
                        </div>
                    }
                    <div className={classes.buttons}>
                        {
                            bookId !== ADD_NEW_KEY &&
                            <Button
                            disabled={isDeleteFlag}
                            color="error"
                            sx={{mr: 2}}
                            onClick={handleDelete}
                            >Delete Story</Button>
                        }
                        <Button
                        disabled={title.length === 0 || bookId === ADD_NEW_KEY}
                        onClick={handleBook}>Select Story</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
        </CustomTheme>
    )
}

BookDialog.propTypes = {
    /**
     * Confirm event handler
     */
    onConfirm: PropTypes.func,
    /**
     * Close event handler
     */
    onClose: PropTypes.func
}