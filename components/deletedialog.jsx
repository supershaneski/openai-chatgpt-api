import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'

import CustomTheme from './customtheme'

import classes from './deletedialog.module.css'

export const DeleteModes = {
    Character: 'character',
    Scene: 'scene'
}

export default function DeleteDialog({ 
    mode = DeleteModes.Character,
    onDelete = undefined, 
    onClose = undefined
}) {
    return (
        <div className={classes.container}>
            <div className={classes.dialog}>
                <div className={classes.contents}>
                    {
                        mode === DeleteModes.Character &&
                        <p className={classes.text}>
                            Are you sure you want to delete this conversation?
                        </p>
                    }
                    {
                        mode === DeleteModes.Scene &&
                        <p className={classes.text}>
                            This will delete all conversations in this scene.<br />
                            Are you sure?
                        </p>
                    }
                </div>
                <div className={classes.action}>
                    <CustomTheme>
                        <Button onClick={onDelete}>{mode === DeleteModes.Character ? 'Delete' : 'Delete All'}</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </CustomTheme>
                </div>
            </div>
        </div>
    )
}

DeleteDialog.propTypes = {
    /**
     * Delete mode
     */
    mode: PropTypes.oneOf(['character', 'scene']),
    /**
     * Delete event handler
     */
    onDelete: PropTypes.func,
    /**
     * Close event handler
     */
    onClose: PropTypes.func,
}