import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Img, Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import './Mentor.css'
import img from '../../media/student.png'
import MentorMenteeDetails from './MentorMenteeDetails';
import MentorMenteePage from './MentorMenteePage';

export default function MentorMentees() {
    const [showDetails, setShowDetails] = useState(false);

    const clickHandler = () => {
        setShowDetails(!showDetails);
    }
  return (
    <div>
        <Box>
            {showDetails ? <MentorMenteeDetails clickHandler={clickHandler}/> : <MentorMenteePage clickHandler={clickHandler}/>}
        </Box>
    </div>
  )
}
