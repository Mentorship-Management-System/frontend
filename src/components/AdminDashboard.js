import { Box, Button, Center, Flex, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import img from "../media/professor.png";

export default function AdminDashboard() {
  return (
    <div>
        <Flex>
        <Box h="100vh" w='12vw' color='white' m='0' pt='3%'>
            <Heading textAlign='center' m='0'>Admin Dashboard</Heading>
            <VStack h='40vh' mt='50%' fontSize='1.2em' fontWeight='bold' lineHeight="10px">
                <Text>Profile</Text>
                <Text >Mentors</Text>
                <Text >Students</Text>
            </VStack>
            <Text mt='90%' fontSize='1.2em'  textAlign='center' fontWeight='bold'>Log Out</Text>
        </Box>
        <Box w='88vw' backgroundColor='white' pl='5%'>
            <Center w='31vw' h='62vh' bgColor='black' borderRadius='50%'>
                <Image src={img} w='30vw' h='60vh' borderRadius='50%'/>
            </Center>
            <VStack mt='4%' color='black' w='30vw' fontSize='1.5em' fontWeight='bold'>
                <Text m='0'>Sanjay Das</Text>
                <Text m='0'>sdas@tezu.ernet.in</Text>
                <Text m='0'>Technical Officer</Text>
            </VStack>
            <Button ml="14%" mt='3%' w='6vw' h='4vh' borderRadius='5px' bg='teal' color='white' border="none">Edit Details</Button>
        </Box>
        </Flex>
    </div>
  )
}
