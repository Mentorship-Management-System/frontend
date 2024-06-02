// SetMeetingPage.jsx

import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
import styles from "../../Mentor/Css/Meetings.module.scss";
import Model from "./Model";
import { useSelector } from "react-redux";
import { get_meetings_by_student_id } from "../../../api/meetingApi";


const StudentMeetings = () => {
  //hooks
  const student = useSelector(state => state.studentAuth.student);

  //state variables
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [meetings, setMeetings] = useState([]);

  // Function to handle setting a new meeting
  const handleSetMeeting = () => {
    // Add logic to set a new meeting
    setShowModal(false); // Close the modal after setting the meeting
  };
  const modelCloseHandler = () => {
    // Add logic to set a new meeting
    setShowModal1(false); // Close the modal after setting the meeting
  };
  const [openmodal, setOpenModal] = useState(null);
  const toggleOpenModal = (e, meetingId) => {
    e.stopPropagation();
    setOpenModal(meetingId === openmodal ? null : meetingId);
  };

  //useEffect functions
  useEffect(() => {
    get_meetings_by_student_id(student.token, student.user.student_id)
      .then(result => {
        result = result.data;
        console.log(result);
        setMeetings(result.meetings);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const filteredMeetings =
    filter === "all"
      ? meetings
      : meetings.filter((meeting) =>
          filter === "completed" ? meeting.approve : !meeting.completed
        );

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.pageHeader}>
        <Heading fontSize="1.4rem">Meeting Management</Heading>
      </Box>
      {/* Add filter selector */}
      <Flex className={styles.buttons}>
        <Flex gap="20px">
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Meetings</option>
            <option value="pending">Pending Meetings</option>
            <option value="completed">Completed Meetings</option>
          </Select>
        </Flex>
      </Flex>
      {/* Display meetings */}
      <Box className={styles.meetingsContainer}>
        {filteredMeetings.map((meeting) => (
          <>
            <Box
              key={meeting.meeting_id}
              className={`${styles.meetingItem} ${
                meeting.approve ? styles.completed : styles.pending
              }`}
            >
              <Box className={styles.details}>
                <Heading className={styles.meetingName} fontSize="1.2rem">
                  {meeting.title}
                </Heading>
                <Text className={styles.meetingTime}>{new Date(meeting.date).toISOString().slice(0, 16).replace('T', ', ')}</Text>
                <Text className={styles.meetingDescription}>
                  {meeting.description}
                </Text>
                {meeting && meeting.feedback && <Text mt="1">
                  <b>Your Feeback: </b><i>{meeting.feedback}</i>
                </Text>}
              </Box>
              <Flex className={styles.modalContainer}>
                <Heading
                  fontSize="1rem"
                  color={meeting.approve ? "green" : "#ffc107"}
                >
                  {meeting.approve ? "Completed" : "Pending"}
                </Heading>

                <Model
                  isOpenModal={meeting.meeting_id === openmodal}
                  toggleOpenModal={(e) => toggleOpenModal(e, meeting.meeting_id)}
                  meeting={meeting}
                  meetings={meetings}
                  setMeetings={setMeetings}
                  student={student}
                  setOpenModal={setOpenModal}
                  openmodal={openmodal}
                />
              </Flex>
            </Box>
          </>
        ))}
      </Box>
      {/* Modal for setting new meeting */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set New Meeting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Meeting Name</FormLabel>
                <Input
                  type="text"
                  value={meetingName}
                  onChange={(e) => setMeetingName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Meeting Time</FormLabel>
                <Input
                  type="datetime-local"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Meeting Description</FormLabel>
                <Input
                  type="text"
                  value={meetingDescription}
                  onChange={(e) => setMeetingDescription(e.target.value)}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSetMeeting}>
              Set
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StudentMeetings;
