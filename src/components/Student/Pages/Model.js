import React, { memo, useState } from "react";
import styles from "../../Mentor/Css/Meetings.module.scss";

import { Button, Box, Text, Stack, Flex, Center, Spinner, useToast } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { update_feedback } from "../../../api/meetingApi";

const Model = ({ isOpenModal, toggleOpenModal, meeting, setOpenModal, openmodal, student, meetings, setMeetings }) => {
  const toast = useToast();

  //state variables
  const [feedback, setFeedback] = useState("");
  const [feedLoading, setFeedLoading] = useState(false);

  const submitHandler = () => {
    // toggleOpenModal();
    const payload = {
      feedback
    }

    let new_meeting = { ...meeting, feedback };
    let temp_meetings = meetings;
    const index = temp_meetings.findIndex(obj => obj.meeting_id === new_meeting.meeting_id);
    if (index !== -1) temp_meetings[index] = new_meeting;

    setFeedLoading(true);
    update_feedback(student.token, meeting.meeting_id, payload)
      .then(result => {
        if(result.data){
          result = result.data;
          console.log(result);
          setMeetings(temp_meetings)
          toast({
            title: 'Success',
            description: result.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } else {
          toast({
            title: result.response.statusText,
            description: result.response.data.error,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setOpenModal(meeting.meeting_id === openmodal ? null : meeting.meeting_id);
        setFeedLoading(false);
      })
  };
  return (
    <Flex justify="flex-end">
      <Button
        onClick={toggleOpenModal}
        h={["8vw", "8vw", "3vw", "2.7vw"]}
        fontSize={[".9rem", ".9rem", "1rem", "1rem"]}
      >
        View
      </Button>
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
                  <strong>Date & Time:</strong> {meeting?.date}
                </Text>
                <Text>
                  <strong>Title:</strong> {meeting?.title}
                </Text>
                <Text>
                  <strong>Description:</strong> {meeting?.description}
                </Text>
                <Text>
                  <strong>Your Feedback:</strong>
                </Text>
                <textarea
                value={meeting.feedback ? meeting.feedback : feedback}
                onChange={e => setFeedback(e.target.value)}
                disabled={meeting.feedback ? true : false}
                ></textarea>
              </Stack>
            </div>
            {(meeting.feedback === null || meeting.feedback === "" || meeting.feedback === undefined) && <Flex justify="flex-end" gap="10px" mt="3%">
              <Button colorScheme="blue" onClick={submitHandler}>
                {feedLoading ? <Spinner /> : "Submit Feedback"}
              </Button>
            </Flex>}
          </div>
        </div>
      )}
    </Flex>
  );
};

export default memo(Model);
