import React, { useState } from 'react'
import { Box, Button, Center, Flex, Image, Input, Text} from '@chakra-ui/react'
import img1 from "../../media/professor.png";

export default function AdminMentorDetails({clickHandler}) {
    const [show, setShow] = useState(false);

    const editHandler = () => {
        setShow(false);
    }
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
                <Text>Bhogeswar Bora</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Title: </strong></Text>
                <Text >Professor</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Gsuit Id: </strong></Text>
                <Text >Bbora@tezu.ac.in</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Department: </strong></Text>
                <Text >Computer Science and Engineering</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Contact No: </strong></Text>
                <Text >8638483556</Text>
            </Flex>
            </Box>
            <Button ml="5%" mt='2%' w='10vw' h='4.5vh' borderRadius='5px' variant='outline' colorScheme='blue' onClick={() => {setShow(!show)}}>Edit Details</Button>

            {show && <Box className='popupedit'>
                <Box>
                    <label><strong>Name</strong></label><br></br>
                    <Input placeholder="Name" value='' m='1% auto' borderColor='gray'></Input>
                </Box>
                <Box>
                    <label><strong>Title</strong></label><br></br>
                    <Input placeholder="Title" value='' m='1% auto' borderColor='gray'></Input>
                </Box>
                    <Box >
                        <label><strong>Email Id</strong></label><br></br>
                        <Input type='email' placeholder="Email Id" value='' m='1% auto' borderColor='gray'></Input>
                    </Box>

                <Button mt='3%' mr='4%' variant='outline' colorScheme="blue" onClick={() => {setShow(false)}}>Cancel</Button>
                <Button mt='3%' variant='solid' colorScheme="blue" onClick={editHandler}>Save</Button>
            </Box>}
        </Box>
    </div>
  )
}
