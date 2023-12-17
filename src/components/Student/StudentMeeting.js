import { Box, Button, ButtonSpinner, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import "./StudentCourses.css";
import { TbClockHour3 } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6"

export default function StudentMeeting() {
    const [show, setShow] = useState(false);
    const [textarea, setTextarea] = useState();

    const submitHandler = () => {
        setShow(false);
    }
  return (
    <div>
      <Box p='3% 5%'>
      <Heading fontSize='1.5rem' mb='3%'>Upcomming Meetings</Heading>        <div>
          <Box className="meetingbox" position='relative'  mb='4%'>
            <Box position='absolute' left='92%' top='10%'><TbClockHour3 size={20} /></Box>
            <Flex mt='1%'>
                <Text mr='2%'><strong>TITLE: </strong></Text>
                <Text>Title of the Meeting</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>DESCRIPTION: </strong></Text>
                <Text >Discussion related to the project and other important things.(Don't be late)</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Date: </strong></Text>
                <Text >7th October, 2023.</Text>
            </Flex>
            <Flex mt='1%'>
                <Text mr='2%'><strong>Time: </strong></Text>
                <Text >After 2:30 P.M.</Text>
            </Flex>
            <Button onClick={() => {setShow(true)}} _hover={{backgroundColor: 'lightorange'}}>Add Comment</Button>

            {show && 
                <Box className="commentModel">
                    <h4>Write your comment</h4>
                    <textarea onChange={(e) => {setTextarea(e.target.value)}}></textarea>
                    <Button onClick={() => {setShow(false)}} className="btn1">Cancel</Button>
                    <Button onClick={submitHandler} className="btn2">Submit</Button>
                </Box>
            }
          </Box>
        </div>
        <Heading fontSize='1.5rem' mb='3%'>Completed Meetings</Heading>
        <div>
          <Box className="meetingbox" position='relative'>
            <Box position='absolute' left='92%' top='10%'><FaCircleCheck size={20} /></Box>
            <Flex mt='1%'>
                <Text mr='2%'><strong>TITLE: </strong></Text>
                <Text>Title of the Meeting</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>DESCRIPTION: </strong></Text>
                <Text >Discussion related to the project and other important things.(Don't be late)</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Date: </strong></Text>
                <Text >20th September, 2023.</Text>
            </Flex>
            <Flex mt='1%'>
                <Text   mr='2%'><strong>Time: </strong></Text>
                <Text >After 2:30 P.M.</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>COMMENT: </strong></Text>
                <Text >It was a successfull meeting. We discussed different espects of the project and how to execute it properly.</Text>
            </Flex>

          </Box>
          <Box className="meetingbox" position='relative' mt='4%'>
            <Box position='absolute' left='92%' top='10%'><FaCircleCheck size={20} /></Box>
            <Flex mt='1%'>
                <Text mr='2%'><strong>TITLE: </strong></Text>
                <Text>Title of the Meeting</Text>
            </Flex>
            <Flex mt='1%'>
                <Text mr='2%'><strong>DESCRIPTION: </strong></Text>
                <Text>Discussion related to the project and other important things.(Don't be late)</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Date: </strong></Text>
                <Text >20th September, 2023.</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>Time: </strong></Text>
                <Text >After 2:30 P.M.</Text>
            </Flex>
            <Flex mt='1%'>
                <Text  mr='2%'><strong>COMMENT: </strong></Text>
                <Text >It was a successfull meeting. We discussed different espects of the project and how to execute it properly.</Text>
            </Flex>

          </Box>
        </div>
      </Box>
    </div>
  );
}
