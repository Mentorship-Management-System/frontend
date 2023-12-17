import React, { useState } from 'react'
import { Box, Button, Center, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import MentorProfile from './Mentor/MentorProfile';
import MentorMentees from './Mentor/MentorMentees';
import MentorMeeting from './Mentor/MentorMeeting';

export default function MentorDashboard() {
  const [profile,setprofile] = useState(true);
  const [mentees,setmentee] = useState(false);
  const [meeting,setmeeting] = useState(false);

  const toggleprofile = () => {
      setprofile(true);
      setmeeting(false);
      setmentee(false);
  }
  const togglementee = () => {
      setprofile(false);
      setmeeting(false);
      setmentee(true);
  }
  const togglemeeting = () => {
      setprofile(false);
      setmeeting(true);
      setmentee(false);
   }
  return (
    <div>
        <Flex>
        <Box  position='fixed' h='100vh' w='12vw' color='white' m='0' pt='3%' zIndex='1'>
            <Heading textAlign='center' m='0' color='white' fontSize='1.5rem'>Mentor Dashboard</Heading>
            <VStack h='40vh' mt='50%' fontSize='1.2em' fontWeight='bold'>
                <Text onClick={toggleprofile} cursor="pointer" color='white'>Profile</Text>
                <Text onClick={togglementee} cursor="pointer" color='white'>Mentees</Text>
                <Text onClick={togglemeeting} cursor="pointer" color='white'>Meeting</Text>
                {/* <Text >Students</Text> */}
            </VStack>
            <Text color='white' mt='90%' fontSize='1.2em'  textAlign='center' fontWeight='bold'>Log Out</Text>
        </Box>
        <Box ml='12vw' w='88vw' h='100vh' backgroundColor='white'  overflowY='auto'>
            {profile && <MentorProfile />}
            {mentees && <MentorMentees />}
            {meeting && <MentorMeeting />}
        </Box>
        </Flex>
    </div>
  )
}
