import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Img, Input, Select, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../Mentor/Mentor.css'
import img from '../../media/student.png'

export default function AdminMenteePage({clickHandler}) {
    const [show, setShow] = useState(false);


  return (
    <div>
        <Box p='3%' ml='2%'>
            <Flex justify='space-between'>
                <Heading fontSize='1.5rem'>Mentee list</Heading>
                <Button className='btnfilter' onClick={() => {setShow(!show)}}>Filter</Button>
            </Flex>
            {show && <Box className='filterbox'>
                <Text mb='5%' fontSize='1.1rem'>By Programme</Text>
                <Stack>

                <Checkbox borderColor='gray' spacing={7} ml='4%'>B-Tech</Checkbox>
                <Checkbox borderColor='gray' spacing={7} ml='4%'>M-Tech</Checkbox>
                <Checkbox borderColor='gray' spacing={7} ml='4%'>MCA</Checkbox>
                </Stack>
                <Text m='4% auto' fontSize='1.1rem'>By Year</Text>
                <Select>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                </Select>
                <Button colorScheme='blue' mt='6%' ml='24%' size='sm' fontSize='.9rem' w='6vw'>Apply</Button>
            </Box>}
            <Flex flexWrap='wrap' >
                <Box className='menteebox' mr='10%'>
                    <Img src={img}/>
                    <Box mr='20%'>
                        <Text ><strong>Sanjay Das</strong></Text>
                        <Text ><strong>CSB20079</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox'>
                    <Img src={img}/>
                    <Box mr='20%'>
                        <Text ><strong>Reehan Sarmah</strong></Text>
                        <Text ><strong>CSB20083</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
                <Box className='menteebox'>
                    <Img src={img}/>
                    <Box mr='20%'>
                        <Text ><strong>Dheeraj Gogoi</strong></Text>
                        <Text ><strong>CSB20028</strong></Text>
                    </Box>
                    <Button onClick={clickHandler}>View</Button>
                </Box>
            </Flex>
        </Box>
    </div>
  )
}
