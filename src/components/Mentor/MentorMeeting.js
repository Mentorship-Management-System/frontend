import { Box, Button, ButtonSpinner, Checkbox, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import './Mentor.css';
import { MdOutlineCheck } from "react-icons/md";


export default function MentorMeeting() {
    const [show, setShow] = useState(false);

    const showHandler = () => {
        setShow(!show);
    }

  return (
    <div>
      <Box p='3% 5%'>
        <Heading fontSize='1.5rem' mb='3%'>Schedule Meetings</Heading>
        <Box className="meetingBox">
            <Box>
                <label><strong>Meeting Title</strong></label><br></br>
                <Input placeholder="Title" m='1% auto' borderColor='gray'></Input>
            </Box>
            <Box>
                <label><strong>Meeting Description</strong></label><br></br>
                <Input placeholder="Title" m='1% auto' borderColor='gray'></Input>
            </Box>
            <Flex>
            <Box mr='14%'>
                <label><strong>Meeting Date</strong></label><br></br>
                <Input type="date" placeholder="Title" m='4% auto' borderColor='gray'></Input>
            </Box>
            <Box>
                <label><strong>Meeting Time</strong></label><br></br>
                <Input type="time" placeholder="Title" m='4% auto' borderColor='gray'></Input>
            </Box>
            </Flex>

            <Button mt='3%' variant='outline' colorScheme="blue" onClick={showHandler}>Select Mentees</Button><br></br>
            <Button mt='3%' variant='solid' colorScheme="blue">Setup Meeting</Button>

            {show && 
                <Box className="selectpopup">
                     <Stack>
                        <Checkbox colorScheme='none' borderColor='gray' spacing={10} >Sanjay Das, CSB20079, B-tech</Checkbox>
                        <Checkbox colorScheme='none' borderColor='gray' spacing={10} >Reehan Sarmah, CSB20083, B-tech</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Sanjoy Goswami, CSI22014, MCA</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Biraj Singh, CSI22022, MCA</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Dheeraj Gogoi, CSI22022, B-tech</Checkbox>
                        <Checkbox colorScheme='none'borderColor='gray' spacing={10} >Manash Goswami, CSM21033, M-tech</Checkbox>
                    </Stack>
                </Box>
            }
        </Box>
      </Box>
    </div>
  );
}
