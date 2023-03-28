import React from 'react'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'

import { CharacterIcon } from './charactericon'
import CustomTheme from './customtheme'

import classes from './avataritem.module.css'

const AvatarItem = ({ 
    id = '', 
    name = '', 
    icon = 0, 
    selected = '', 
    onClick = undefined 
}) => {
    /*
    <Badge 
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                color="error" 
                variant="dot">
                    <Avatar sx={{bgcolor: '#00bd7e'}}>
                    {
                        icon === 0 &&
                        <CharacterIcon icon={icon} color="#fff" />
                    }
                    {
                        icon > 0 &&
                        <CharacterIcon icon={icon} />
                    }
                    </Avatar>
                </Badge>
    */
    return (
        <div className={classes.avatarItem} onClick={() => onClick(id)}>
            {
                selected &&
                <Avatar sx={{bgcolor: '#00bd7e'}}>
                {
                    icon === 0 &&
                    <CharacterIcon icon={icon} color="#fff" />
                }
                {
                    icon > 0 &&
                    <CharacterIcon icon={icon} />
                }
                </Avatar>
            }
            {
                !selected &&
                <CustomTheme>
                    <Avatar>
                        {
                            icon === 0 &&
                            <CharacterIcon icon={icon} color="#fff" />
                        }
                        {
                            icon > 0 &&
                            <CharacterIcon icon={icon} />
                        }
                    </Avatar>
                </CustomTheme>
            }
            <div className={classes.avatarItemText}>
                <span className={classes.avatarText}>{ name }</span>
            </div>
        </div>
    )
}

export default AvatarItem
