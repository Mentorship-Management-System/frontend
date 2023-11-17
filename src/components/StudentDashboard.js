import React, { useState } from 'react'
import { Box, Button, Center, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import img1 from "../media/student.png";


export default function StudentDashboard() {
    const [toggle,setToggle] = useState(true);

    const toggleHandler = () => {
        setToggle(!toggle);
    }
  return (
    <div>
        <Flex>
        <Box h="100vh" w='12vw' color='white' m='0' pt='3%'>
            <Heading textAlign='center' m='0'>Admin Dashboard</Heading>
            <VStack h='40vh' mt='50%' fontSize='1.2em' fontWeight='bold' lineHeight="10px">
                <Text onClick={toggleHandler} cursor="pointer">Profile</Text>
                <Text onClick={toggleHandler} cursor="pointer">Courses</Text>
                {/* <Text >Students</Text> */}
            </VStack>
            <Text mt='90%' fontSize='1.2em'  textAlign='center' fontWeight='bold'>Log Out</Text>
        </Box>

        {toggle && <Box w='88vw' backgroundColor='white' pl='5%'>
            <Center w='31vw' h='62vh' bgColor='black' borderRadius='50%'>
                <Image src={img1} w='30vw' h='60vh' borderRadius='50%'/>
            </Center>
            <VStack mt='4%' color='black' w='30vw' fontSize='1.5em' fontWeight='bold'>
                <Text m='0'>Sanjay Das</Text>
                <Text m='0'>csb20079@tezu.ernet.in</Text>
                <Text m='0'>CSB20079</Text>
                <Text m='0'>7th Semester</Text>
            </VStack>
            <Button ml="14%" mt='2%' w='6vw' h='4vh' borderRadius='5px' bg='teal' color='white' border="none">Edit Details</Button>
        </Box>}
        {!toggle &&
            <Box w='88vw' backgroundColor='white' pl='5%'>
                <VStack color="black">
                    <HStack justify="space-between">
                        <Box w="30vw" >
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                        <Box w="30vw">
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                    </HStack>
                    <HStack justify="space-between">
                        <Box w="30vw" >
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                        <Box w="30vw">
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                    </HStack>
                    <HStack justify="space-between" bgColor='whi'>
                        <Box w="30vw" >
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                        <Box w="30vw">
                            <Text m='0'>Course Name</Text>
                            <Text m='0'>Course Code</Text>
                            <Text m='0'>Course Description</Text>
                            <Button w='4vw' h='3vh' borderRadius='5px' bg='teal' color='white' border="none">Details</Button>
                        </Box>
                    </HStack>
                </VStack>
            </Box>
        }
        </Flex>
    </div>
  )
}
