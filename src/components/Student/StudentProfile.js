import React from 'react'
import { Box, Button, Center, Flex, Image, Text} from '@chakra-ui/react'
import img1 from "../../media/student.png";

export default function StudentProfile() {
  return (
    <div>
        <Box p='3%'>
            <Center w='16vw' h='31vh' bgColor='black' borderRadius='50%' ml='3%'>
                <Image src={img1} w='15.5vw' h='30vh' borderRadius='50%'/>
            </Center>
            <Box mt='3%' ml='5%' color='black' fontSize='1.3em' fontWeight='medium' >
            <Flex  mt='1%'>
                <Text mr='2%'><strong>Name: </strong></Text>
                <Text>Sanjay Das</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text m='0' mr='2%'><strong>Roll No: </strong></Text>
                <Text m='0'>CSB20079</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  mr='2%'><strong>Gsuit Id: </strong></Text>
                <Text >CSB20079@tezu.ac.in</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text m='0' mr='2%'><strong>Department: </strong></Text>
                <Text m='0'>Computer Science and Engineering</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  mr='2%'><strong>Programme: </strong></Text>
                <Text >B-tech</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  m='0'  mr='2%'><strong>Semester: </strong></Text>
                <Text m='0'>7th Semester</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  mr='2%'><strong>Mentor: </strong></Text>
                <Text >Swarnajyoti Patra</Text>
            </Flex>
            </Box>
        </Box>
    </div>
  )
}
