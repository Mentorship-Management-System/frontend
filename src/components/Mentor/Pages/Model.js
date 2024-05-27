import React, { memo } from "react";
import styles from "../Css/Meetings.module.scss";

import { Button, Box, Text, Stack, Flex, Center } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { approve_meeting } from "../../../api/meetingApi";

const Model = ({ isOpenModal, toggleOpenModal, meeting, meetings, setOpenModal, openmodal, setMeetings, mentor, toggleModal }) => {
  const approveHandler = () => {
    console.log(meeting);
    
    let new_meeting = { ...meeting, approve: 1 };
    let temp_meetings = meetings;
    const index = temp_meetings.findIndex(obj => obj.meeting_id === new_meeting.meeting_id);
    if (index !== -1) temp_meetings[index] = new_meeting;
    
    approve_meeting(mentor.token, mentor.mentor_id, meeting.meeting_id)
      .then(result => {
        result = result.data;
        console.log(result);
        setMeetings(temp_meetings)
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setOpenModal(meeting.meeting_id === openmodal ? null : meeting.meeting_id);
      })
  };
  return (
    <div>
      <Button onClick={toggleOpenModal}>View</Button>
      {isOpenModal && (
        <div className={`${styles.modal} ${styles.modal1}`}>
          <div className={styles.modalContent}>
            <Flex className={styles.header}>
              <h1>
                <strong>Meeting Details</strong>
              </h1>
              <Center onClick={toggleOpenModal}>
                <IoMdClose />
              </Center>
            </Flex>
            <div className={styles.modalBody}>
              <Stack spacing={4}>
                <Text>
                  <strong>Time:</strong> {meeting?.time}
                </Text>
                <Text>
                  <strong>Description:</strong> {meeting?.description}
                </Text>
                <Text>
                  <strong>Feedback:</strong> <i>{meeting?.feedback ? meeting?.feedback : "No feedback from the student(s) yet."}</i>
                </Text>
                {/* <Box>
                  <Text>{meeting?.feedback ? meeting?.feedback : "No feedback from the student(s) yet."}</Text>
                </Box> */}
              </Stack>
            </div>
            <Flex justify="flex-end" gap="10px" mt="3%">
              <Button colorScheme="blue" onClick={approveHandler} display={meeting.approve ? "none" : "inline-block"}>
                Approve Meeting
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Model);
