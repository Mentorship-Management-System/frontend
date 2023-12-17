import React from 'react';
import img1 from "../../media/Untitled.png";
import { Box, Button, Center, Flex, Image, Text} from '@chakra-ui/react'


export default function StudentMentor() {
  return (
    <div>
        <Box p='3%'>
            <Center w='16vw' h='31vh' bgColor='black' borderRadius='50%' ml='3%'>
                <Image src={img1} w='15.5vw' h='30vh' borderRadius='50%'/>
            </Center>
            <Box mt='3%' ml='5%' color='black' fontSize='1.3em' fontWeight='medium' >
            <Flex  mt='1%'>
                <Text mr='2%'><strong>Name: </strong></Text>
                <Text>Swarnajyoti Patra</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text m='0' mr='2%'><strong>Title: </strong></Text>
                <Text m='0'>Assistant Professor</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  mr='2%'><strong>Email Id: </strong></Text>
                <Text >patra@tezu.ac.in</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text m='0' mr='2%'><strong>Department: </strong></Text>
                <Text m='0'>Computer Science and Engineering</Text>
            </Flex>
            <Flex  mt='1%'>
                <Text  mr='2%'><strong>Phone No: </strong></Text>
                <Text >8654825412</Text>
            </Flex>
            </Box>
            <Button ml="5%" mt='1.5%' w='7vw' h='4.5vh' borderRadius='5px' bg='teal' color='white' _hover={{backgroundColor: 'teal.500'}}>More Details</Button>

        </Box>
    </div>
  )
}
