import React, { useState } from 'react'
import { Box, Button, Center, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import AdminProfile from './Admin/AdminProfile';
import AdminMentor from './Admin/AdminMentor';
import AdminMentee from './Admin/AdminMentee';



export default function StudentDashboard() {
    const [profile,setprofile] = useState(true);
    const [mentors,setmentors] = useState(false);
    const [mentees,setmentees] = useState(false);
    const [meeting,setsettings] = useState(false);

    const toggleprofile = () => {
        setprofile(true);
        setsettings(false);
        setmentors(false);
        setmentees(false);
    }
    const togglementors = () => {
        setprofile(false);
        setsettings(false);
        setmentors(true);
        setmentees(false);    }
    const togglementees = () => {
        setprofile(false);
        setsettings(false);
        setmentors(false);
        setmentees(true);    }
    const toggleSettings = () => {
        setprofile(false);
        setsettings(true);
        setmentors(false);
        setmentees(false);    }
  return (
    <div>
        <Flex>
        <Box  position='fixed' h='100vh' w='12vw' color='white' m='0' pt='3%' zIndex='1'>
            <Heading textAlign='center' m='0' color='white' fontSize='1.5em'>Admin Dashboard</Heading>
            <VStack h='40vh' mt='50%' fontSize='1.2em' fontWeight='bold'>
                <Text mt='1%' onClick={toggleprofile} cursor="pointer" color='white'>Profile</Text>
                <Text mt='1%' onClick={togglementors} cursor="pointer" color='white'>Mentors</Text>
                <Text mt='1%' onClick={togglementees} cursor="pointer" color='white'>Mentees</Text>
                <Text mt='1%' onClick={toggleSettings} cursor="pointer" color='white'>Settings</Text>
                {/* <Text >Students</Text> */}
            </VStack>
            <Text color='white' mt='90%' fontSize='1.2em'  textAlign='center' fontWeight='bold'>Log Out</Text>
        </Box>
        <Box ml='12vw' w='88vw' h='100vh' backgroundColor='white'  overflowY='auto'>
            {profile && <AdminProfile />}
            {mentors && <AdminMentor /> }
            {mentees && <AdminMentee />}
            {/* {mentor && < />} */}
        </Box>
        </Flex>
    </div>
  )
}