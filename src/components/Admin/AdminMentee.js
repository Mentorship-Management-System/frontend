import { Box, } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../Mentor/Mentor.css'
import AdminMenteeDetails from './AdminMenteeDetails';
import AdminMenteePage from './AdminMenteePage';

export default function AdminMentee() {
    const [showDetails, setShowDetails] = useState(false);

    const clickHandler = () => {
        setShowDetails(!showDetails);
    }
  return (
    <div>
        <Box>
            {showDetails ? <AdminMenteeDetails clickHandler={clickHandler}/> : <AdminMenteePage clickHandler={clickHandler}/>}
        </Box>
    </div>
  )
}
