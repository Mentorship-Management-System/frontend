import React from 'react'
import { Box, Button, Center, Flex, Image, Text} from '@chakra-ui/react'
import img1 from "../../media/student.png";

export default function MentorMenteeDetails({clickHandler}) {
  return (
    <div>
        <Box p='3%'>
            <Button w='6vw' colorScheme='blue' onClick={clickHandler}>Back</Button>
            <Center w='16vw' h='31vh' bgColor='black' borderRadius='50%' ml='3%' mt='1%'>
                <Image src={img1} w='15.5vw' h='30vh' borderRadius='50%'/>
            </Center>
            <Box mt='2%' ml='5%' color='black' fontSize='1.3em' fontWeight='medium' >
            <Flex mt='1%'>
                <Text mr='2%'><strong>Name: </strong></Text>
                <Text>Sanjay Das</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Roll No: </strong></Text>
                <Text >CSB20079</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Gsuit Id: </strong></Text>
                <Text >CSB20079@tezu.ac.in</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Department: </strong></Text>
                <Text >Computer Science and Engineering</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Programme: </strong></Text>
                <Text >B-tech</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Semester: </strong></Text>
                <Text >7th Semester</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Contact No: </strong></Text>
                <Text >8638756556</Text>
            </Flex>
            </Box>
            <Button ml="5%" mt='2%' w='10vw' h='4.5vh' borderRadius='5px' variant='outline' colorScheme='blue'>Show Grade Card</Button>

        </Box>
    </div>
  )
}
