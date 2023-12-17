import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../Mentor/Mentor.css'
import AdminMentorDetails from './AdminMentorDetails';
import AdminMentorPage from './AdminMentorPage';

export default function AdminMentor() {
    const [showDetails, setShowDetails] = useState(false);

    const clickHandler = () => {
        setShowDetails(!showDetails);
    }
  return (
    <div>
        <Box>
            {showDetails ? <AdminMentorDetails clickHandler={clickHandler}/> : <AdminMentorPage clickHandler={clickHandler}/>}
        </Box>
    </div>
  )
}
