// SetMeetingPage.jsx

import React, { useState } from "react";
import {
  Button,
  Box,
  Heading,
  Select,
  Input,
  Text,
  Stack,
  Flex,
  Center,
} from "@chakra-ui/react";
import styles from "../Css/Meetings.module.scss";
import { MdOutlineFileDownload } from "react-icons/md";
import Model from "./Model";
import SetMeetingModal from "./SetMeetingModal";

const MeetingsData = [
  {
    id: 1,
    name: "Weekly Team Meeting",
    time: "2024-04-01T10:00",
    description: "Discuss project updates and plan for the week.",
    completed: true,
    feedback: [
      { name: "Bob Johnson", feedback: "Good discussion!" },
      { name: "Emily Brown", feedback: "Needs more iterations" },
    ],
  },
  {
    id: 2,
    name: "Client Presentation",
    time: "2024-04-05T14:00",
    description: "Present new product features to the client.",
    completed: true,
    feedback: [
      {
        name: "Bob Johnson",
        feedback: "Good conversation and discussed many things!",
      },
      { name: "Emily Brown", feedback: "Needs more iterations" },
    ],
  },
  {
    id: 3,
    name: "Design Review",
    time: "2024-04-08T11:00",
    description: "Review the latest design iterations.",
    completed: false,
    feedback: [
      {
        name: "Bob Johnson",
        feedback: "",
      },
      { name: "Emily Brown", feedback: "" },
    ],
  },
  {
    id: 4,
    name: "Marketing Strategy Meeting",
    time: "2024-04-12T09:30",
    description: "Discuss marketing strategies for the upcoming campaign.",
    completed: false,
    feedback: [
      {
        name: "Bob Johnson",
        feedback: "",
      },
      { name: "Emily Brown", feedback: "" },
    ],
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

const Meetings = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [meetings, setMeetings] = useState(MeetingsData);
  const [openmodal, setOpenModal] = useState(null);

  const toggleOpenModal = (e, meetingId) => {
    e.stopPropagation();
    console.log("gdgdfg");
    setOpenModal(meetingId === openmodal ? null : meetingId);
  };

  const handleSetMeeting = () => {
    setShowModal(false);
  };

  const handelShowModal = () => {
    setShowModal(!showModal);
  };

  const filteredMeetings =
    filter === "all"
      ? meetings
      : meetings.filter((meeting) =>
          filter === "completed" ? meeting.completed : !meeting.completed
        );
  console.log(openmodal);

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.pageHeader}>
        <Heading as="h1" fontSize="1.4rem">
          Meeting Management
        </Heading>
      </Box>
      {/* Add filter selector */}
      <Flex className={styles.buttons}>
        <Center cursor="pointer" m="auto 2%">
          <MdOutlineFileDownload size={25} />
        </Center>
        <Flex gap="20px">
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Meetings</option>
            <option value="upcoming">Upcoming Meetings</option>
            <option value="completed">Completed Meetings</option>
          </Select>
          <Button
            colorScheme="blue"
            onClick={() => setShowModal(!showModal)}
            w="10vw"
          >
            Set Meeting
          </Button>
        </Flex>
      </Flex>
      {/* Display meetings */}
      <Box className={styles.meetingsContainer}>
        {filteredMeetings.map((meeting) => (
          <Box
            key={meeting.id}
            className={`${styles.meetingItem} ${
              meeting.completed ? styles.completed : styles.pending
            }`}
          >
            <Box className={styles.details}>
              <Heading className={styles.meetingName} fontSize="1.2rem">
                {meeting.name}
              </Heading>
              <Text className={styles.meetingTime}>{meeting.time}</Text>
              <Text className={styles.meetingDescription}>
                {meeting.description}
              </Text>
            </Box>
            <Flex className={styles.modalContainer}>
              <Heading
                fontSize="1rem"
                color={meeting.completed ? "green" : "#ffc107"}
              >
                {meeting.completed ? "Completed" : "Pending"}
              </Heading>

              <Model
                isOpenModal={meeting.id === openmodal}
                toggleOpenModal={(e) => toggleOpenModal(e, meeting.id)}
                meeting={meeting}
              />
            </Flex>
          </Box>
        ))}
      </Box>
      {/* Modal for setting new meeting */}
      {showModal && (
        <SetMeetingModal
          handelShowModal={handelShowModal}
          handleSetMeeting={handleSetMeeting}
        />
      )}
    </Box>
  );
};

export default Meetings;
