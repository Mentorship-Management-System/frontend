// SetMeetingPage.jsx

import React, { useState } from "react";
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

const MeetingsData = [
  {
    id: 1,
    name: "Weekly Team Meeting",
    time: "2024-04-01T10:00",
    description: "Discuss project updates and plan for the week.",
    completed: false,
  },
  {
    id: 2,
    name: "Client Presentation",
    time: "2024-04-05T14:00",
    description: "Present new product features to the client.",
    completed: true,
  },
  {
    id: 3,
    name: "Design Review",
    time: "2024-04-08T11:00",
    description: "Review the latest design iterations.",
    completed: false,
  },
  {
    id: 4,
    name: "Marketing Strategy Meeting",
    time: "2024-04-12T09:30",
    description: "Discuss marketing strategies for the upcoming campaign.",
    completed: true,
  },
  {
    id: 5,
    name: "Product Development Meeting",
    time: "2024-04-16T13:00",
    description: "Brainstorm ideas for new product features.",
    completed: true,
  },
  {
    id: 6,
    name: "Quarterly Review",
    time: "2024-04-20T15:30",
    description: "Review company performance for the quarter.",
    completed: false,
  },
  {
    id: 7,
    name: "Team Building Activity",
    time: "2024-04-25T12:00",
    description: "Plan team-building activities for the month.",
    completed: false,
  },
  {
    id: 8,
    name: "Budget Planning Meeting",
    time: "2024-04-29T10:00",
    description: "Discuss budget allocations for various departments.",
    completed: true,
  },
  {
    id: 9,
    name: "Training Session",
    time: "2024-05-03T14:30",
    description: "Provide training on new software tools.",
    completed: true,
  },
  {
    id: 10,
    name: "Customer Feedback Session",
    time: "2024-05-07T11:00",
    description: "Gather feedback from customers on recent product updates.",
    completed: true,
  },
];

const StudentMeetings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [meetings, setMeetings] = useState(MeetingsData);

  // Function to handle setting a new meeting
  const handleSetMeeting = () => {
    // Add logic to set a new meeting
    setShowModal(false); // Close the modal after setting the meeting
  };
  const modelCloseHandler = () => {
    // Add logic to set a new meeting
    setShowModal1(false); // Close the modal after setting the meeting
  };

  const filteredMeetings =
    filter === "all"
      ? meetings
      : meetings.filter((meeting) =>
          filter === "completed" ? meeting.completed : !meeting.completed
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
            <option value="upcoming">Upcoming Meetings</option>
            <option value="completed">Completed Meetings</option>
          </Select>
        </Flex>
      </Flex>
      {/* Display meetings */}
      <Box className={styles.meetingsContainer}>
        {filteredMeetings.map((meeting) => (
          <>
            <Box
              key={meeting.id}
              className={`${styles.meetingItem} ${
                meeting.completed ? styles.completed : styles.pending
              }`}
            >
              <Box>
                <Heading className={styles.meetingName} fontSize="1.2rem">
                  {meeting.name}
                </Heading>
                <Text className={styles.meetingTime}>{meeting.time}</Text>
                <Text className={styles.meetingDescription}>
                  {meeting.description}
                </Text>
              </Box>
              <Flex direction="column" justify="space-between">
                <Heading
                  fontSize="1rem"
                  color={meeting.completed ? "green" : "#ffc107"}
                >
                  {meeting.completed ? "Completed" : "Pending"}
                </Heading>
                <Button onClick={() => setShowModal1(true)}>View</Button>
              </Flex>
            </Box>
            <Model
              showModal1={showModal1}
              meeting={meeting}
              modelCloseHandler={modelCloseHandler}
            />
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
