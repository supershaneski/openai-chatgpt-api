import React from 'react'

import SvgIcon from '@mui/material/SvgIcon';

import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';

import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SickIcon from '@mui/icons-material/Sick';

import PrecisionIcon from '@mui/icons-material/PrecisionManufacturing';
import CastleIcon from '@mui/icons-material/Castle';
import FortIcon from '@mui/icons-material/Fort';
import PetsIcon from '@mui/icons-material/Pets';
import ComputerIcon from '@mui/icons-material/Computer';
import AndroidIcon from '@mui/icons-material/Android';
import AssignmentIcon from '@mui/icons-material/Assignment';

import CustomTheme from './customtheme';

const OpenAiIcon = (props) => {
    return (
        <SvgIcon {...props} viewBox="140 140 520 520">
          <path fill={props.color || '#fff'} d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z" />
        </SvgIcon>
    )
}

export const iconCount = 20

export const CharacterIcon = ({ 
    icon = 0, 
    color = '#fff'
}) => {
    
    switch(icon) {
        case 1:
            return <CustomTheme><FaceIcon style={{ color }} /></CustomTheme>
        case 2:
            return <CustomTheme><Face2Icon style={{ color }} /></CustomTheme>
        case 3:
            return <CustomTheme><Face3Icon style={{ color }} /></CustomTheme>
        case 4:
            return <CustomTheme><Face4Icon style={{ color }} /></CustomTheme>
        case 5:
            return <CustomTheme><Face5Icon style={{ color }} /></CustomTheme>
        case 6:
            return <CustomTheme><Face6Icon style={{ color }} /></CustomTheme>
        case 7:
            return <CustomTheme><MoodIcon style={{ color }} /></CustomTheme>
        case 8:
            return <CustomTheme><MoodBadIcon style={{ color }} /></CustomTheme>
        case 9:
            return <CustomTheme><SentimentSatisfiedAltIcon style={{ color }} /></CustomTheme>
        case 10:
            return <CustomTheme><SentimentNeutralIcon style={{ color }} /></CustomTheme>
        case 11:
            return <CustomTheme><SentimentVeryDissatisfiedIcon style={{ color }} /></CustomTheme>
        case 12:
            return <CustomTheme><SickIcon style={{ color }} /></CustomTheme>

        case 13:
            return <CustomTheme><PrecisionIcon style={{ color }} /></CustomTheme>
        case 14:
            return <CustomTheme><CastleIcon style={{ color }} /></CustomTheme>
        case 15:
            return <CustomTheme><FortIcon style={{ color }} /></CustomTheme>
        case 16:
            return <CustomTheme><PetsIcon style={{ color }} /></CustomTheme>
        case 17:
            return <CustomTheme><ComputerIcon style={{ color }} /></CustomTheme>
        case 18:
            return <CustomTheme><AndroidIcon style={{ color }} /></CustomTheme>
        case 19:
            return <CustomTheme><AssignmentIcon style={{ color }} /></CustomTheme>
        
        default:
            return <OpenAiIcon color={color} />
    }

}