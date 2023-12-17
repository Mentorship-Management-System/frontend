import React, { useState } from 'react'
import { Box, Button, Center, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import StudentProfile from './Student/StudentProfile';
import StudentCourses from './Student/StudentCourses';
import StudentMeeting from './Student/StudentMeeting';
import StudentMentor from './Student/StudentMentor';


export default function StudentDashboard() {
    const [profile,setprofile] = useState(true);
    const [mentor,setmentor] = useState(false);
    const [courses,setcourses] = useState(false);
    const [meeting,setmeeting] = useState(false);

    const toggleprofile = () => {
        setprofile(true);
        setmeeting(false);
        setmentor(false);
        setcourses(false);
    }
    const togglementor = () => {
        setprofile(false);
        setmeeting(false);
        setmentor(true);
        setcourses(false);    }
    const togglecourses = () => {
        setprofile(false);
        setmeeting(false);
        setmentor(false);
        setcourses(true);    }
    const togglemeeting = () => {
        setprofile(false);
        setmeeting(true);
        setmentor(false);
        setcourses(false);    }
  return (
    <div>
        <Flex>
        <Box  position='fixed' h='100vh' w='12vw' color='white' m='0' pt='3%' zIndex='1'>
            <Heading textAlign='center' m='0' color='white' fontSize='1.5rem'>Student Dashboard</Heading>
            <VStack h='40vh' mt='50%' fontSize='1.2em' fontWeight='bold'>
                <Text mt='1%' onClick={toggleprofile} cursor="pointer" color='white'>Profile</Text>
                <Text mt='1%' onClick={togglementor} cursor="pointer" color='white'>Mentor</Text>
                <Text mt='1%' onClick={togglecourses} cursor="pointer" color='white'>Courses</Text>
                <Text mt='1%' onClick={togglemeeting} cursor="pointer" color='white'>Meeting</Text>
                {/* <Text >Students</Text> */}
            </VStack>
            <Text color='white' mt='90%' fontSize='1.2em'  textAlign='center' fontWeight='bold'>Log Out</Text>
        </Box>
        <Box ml='12vw' w='88vw' h='100vh' backgroundColor='white'  overflowY='auto'>
            {profile && <StudentProfile />}
            {courses && <StudentCourses /> }
            {meeting && <StudentMeeting />}
            {mentor && <StudentMentor />}
        </Box>
        </Flex>
    </div>
  )
}
