import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Img, Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../Mentor/Mentor.css'
import img from '../../media/professor.png'

export default function AdminMentorPage({clickHandler}) {
    const [show, setShow] = useState(false);


  return (
    <div>
        <Box p='3%' ml='2%'>
            <Flex justify='space-between'>
                <Heading fontSize='1.5rem'>Mentors list</Heading>
                <Button className='btnfilter' onClick={() => {setShow(!show)}}>Filter</Button>
            </Flex>
            {show && <Box className='filterbox'>
                <Text mb='5%' fontSize='1.1rem'>By Title</Text>
                <Stack>

                <Checkbox borderColor='gray' spacing={7} ml='4%'>Professor</Checkbox>
                <Checkbox borderColor='gray' spacing={7} ml='4%'>Assistant Professor</Checkbox>
                </Stack>
                <Text m='4% auto' fontSize='1.1rem'>By Name</Text>
                <Input variant='outline' borderColor='gray'></Input>
                <Button colorScheme='blue' mt='10%' size='sm' fontSize='.9rem' w='6vw'>Apply</Button>
            </Box>}
            <Flex flexWrap='wrap' >
                <Box className='menteebox' mr='10%'>
                    <Img src={img}/>
                    <Box mr='12%'>
                        <Text ><strong>Dr. Bhogeswar Bora</strong></Text>
                        <Text ><strong>Professor</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox'>
                    <Img src={img}/>
                    <Box mr='12%'>
                        <Text ><strong>Dr. Utpal Sarmah</strong></Text>
                        <Text ><strong>Professor</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox'>
                    <Img src={img}/>
                    <Box mr='12%'>
                        <Text ><strong>Jyotismita Saikia</strong></Text>
                        <Text ><strong>Assistant Professor</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
            </Flex>
        </Box>
    </div>
  )
}
