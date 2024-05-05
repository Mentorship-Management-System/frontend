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
import { IoMdClose } from "react-icons/io";

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
const dummyData = [
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sujay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sasfay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjsdfay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjfsday Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjfdfay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjaffy Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjafhfy Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjahadhfy Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjasdfy Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sgganjay Das", roll: "csb20079", programme: "B-tech" },
];

const Meetings = () => {
  const [showMentees, setShowMentees] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
  });
  const [meetings, setMeetings] = useState(MeetingsData);
  const [selectedNames, setSelectedNames] = useState([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [openmodal, setOpenModal] = useState(null);
  const toggleOpenModal = (e, meetingId) => {
    e.stopPropagation();
    console.log("gdgdfg");
    setOpenModal(meetingId === openmodal ? null : meetingId);
  };
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  const handleSetMeeting = () => {
    setShowModal(false);
  };
  const handleNameClick = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((selected) => selected !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleShowSeletedMentees = () => {
    setShowMentees(!showMentees);
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
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <Flex className={styles.header}>
              <h1>
                <strong>Set New Meeting</strong>
              </h1>
              <Center onClick={() => setShowModal(!showModal)}>
                <IoMdClose />
              </Center>
            </Flex>
            <div className={styles.modalBody}>
              <Stack spacing={4}>
                <div>
                  <label>Meeting Name</label>
                  <Input
                    type="text"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Meeting Time</label>
                  <Input
                    type="datetime-local"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                  />
                </div>
                <div>
                  <label>Meeting Description</label>
                  <Input
                    type="text"
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                  />
                </div>
              </Stack>
              {selectedNames.length !== 0 && (
                <Text mt={4}>
                  <strong>Selected Mentees:</strong>
                </Text>
              )}
              {selectedNames.map((mentee, index) => (
                <Text key={index}>{mentee}</Text>
              ))}
            </div>
            <Flex justify="flex-end" gap="10px" mt="3%">
              <Button
                colorScheme="blue"
                onClick={() => setShowMentees(!showMentees)}
              >
                Select mentees
              </Button>
              <Button colorScheme="blue" onClick={handleSetMeeting}>
                Set
              </Button>
            </Flex>
          </div>
        </div>
      )}
      {showMentees && (
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <h1 className={styles.header}>Select Mentees</h1>
            <Flex gap="10px" mb="2%">
              <Select
                placeholder="Select Year"
                onChange={(value) => handleFilterChange("year", value)}
                className={styles.selectBar}
                h="5vh"
                flexGrow="1"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Select programme"
                onChange={(value) => handleFilterChange("branch", value)}
                className={styles.selectBar}
                h="5vh"
                flexGrow="1"
              >
                <option value="cse">B-Tech</option>
                <option value="ece">M-Tech</option>
                <option value="mech">MCA</option>
                <option value="civil">BCA</option>
                {/* Add more options for other branches */}
              </Select>
            </Flex>
            <div className={styles.content}>
              {dummyData.map((item, index) => (
                <div
                  key={index}
                  className={styles.nameRow}
                  onClick={() => handleNameClick(item.name)}
                >
                  <input
                    type="checkbox"
                    checked={selectedNames.includes(item.name)}
                    readOnly
                  />
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.name1}>{item.roll}</span>
                  <span className={styles.name1}>{item.programme}</span>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <Button
                variant="outline"
                onClick={() => setShowMentees(!showMentees)}
              >
                close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Meetings;
