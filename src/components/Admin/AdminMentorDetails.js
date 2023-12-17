import React, { useState } from 'react'
import { Box, Button, Center, Checkbox, Flex, Heading, Image, Img, Input, Stack, Text} from '@chakra-ui/react'
import img1 from "../../media/professor.png";
import img from '../../media/student.png';
import '../Mentor/Mentor.css'

export default function AdminMentorDetails({clickHandler}) {
    const [show, setShow] = useState(false);
    const [showAddmentee, setShowAddmentee] = useState(false);

    const editHandler = () => {
        setShow(false);
    }
  return (
    <div>
        <Flex p='3%' position='relative'>
            <Box w='50vw'>
                <Button w='6vw' colorScheme='blue' onClick={clickHandler}>Back</Button>
                <Center w='16vw' h='31vh' bgColor='black' borderRadius='50%' ml='3%' mt='3%'>
                    <Image src={img1} w='15.5vw' h='30vh' borderRadius='50%'/>
                </Center>
                <Box mt='2%' ml='5%' color='black' fontSize='1.3em' fontWeight='medium' >
                <Flex mt='3%'>
                    <Text mr='2%'><strong>Name: </strong></Text>
                    <Text>Bhogeswar Bora</Text>
                </Flex>
                <Flex mt='2%'>
                    <Text  mr='2%'><strong>Title: </strong></Text>
                    <Text >Professor</Text>
                </Flex>
                <Flex mt='2%'>
                    <Text  mr='2%'><strong>Gsuit Id: </strong></Text>
                    <Text >Bbora@tezu.ac.in</Text>
                </Flex>
                <Flex mt='2%'>
                    <Text  mr='2%'><strong>Department: </strong></Text>
                    <Text >Computer Science and Engineering</Text>
                </Flex>
                <Flex mt='2%'>
                    <Text  mr='2%'><strong>Contact No: </strong></Text>
                    <Text >8638483556</Text>
                </Flex>
                </Box>
                <Button ml="5%" mt='4%' w='10vw' h='4.5vh' borderRadius='5px' variant='outline' colorScheme='blue' onClick={() => {setShow(!show)}}>Edit Details</Button>
                <Button ml="5%" mt='4%' w='10vw' h='4.5vh' borderRadius='5px' variant='solid' colorScheme='blue' onClick={() => {setShowAddmentee(!showAddmentee)}}>Add Mentee</Button>

            </Box>
            <Box>
            <Flex direction='column'>
                <Heading fontSize='1.5rem' mb='4%'>Mentees Under Professor</Heading>
                <Box className='menteebox' mr='10%' justifyContent='space-between'>
                        <Img src={img}/>
                        <Box mr='20%'>
                            <Text ><strong>Sanjay Das</strong></Text>
                            <Text ><strong>CSB20079</strong></Text>
                        </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox' justifyContent='space-between'>
                    <Img src={img}/>
                    <Box mr='20%'>
                        <Text ><strong>Reehan Sarmah</strong></Text>
                        <Text ><strong>CSB20083</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox' justifyContent='space-between'>
                    <Img src={img}/>
                    <Box mr='20%'>
                        <Text ><strong>Dheeraj Gogoi</strong></Text>
                        <Text ><strong>CSB20028</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
            </Flex>
            </Box>

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
            {showAddmentee && 
                <Box className="selectpopup" right='35%'>
                     <Stack>
                        <Checkbox colorScheme='none' borderColor='gray' spacing={10} >Sanjay Das, CSB20079, B-tech</Checkbox>
                        <Checkbox colorScheme='none' borderColor='gray' spacing={10} >Reehan Sarmah, CSB20083, B-tech</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Sanjoy Goswami, CSI22014, MCA</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Biraj Singh, CSI22022, MCA</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Dheeraj Gogoi, CSI22022, B-tech</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Manash Goswami, CSM21033, M-tech</Checkbox>
                    </Stack>
                    <Button colorScheme='blue' size='sm' position='relative' top='27%' left='80%'>Confirm</Button>
                </Box>
            }
        </Flex>
    </div>
  )
}
