// SetMeetingPage.jsx

import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  create_meeting,
  get_meetings_by_mentor_id,
} from "../../../api/meetingApi";

const Meetings = () => {
  //hooks
  const Navigate = useNavigate();
  const mentor = useSelector((state) => state.mentorAuth.mentor);

  //state variables
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [meetings, setMeetings] = useState([]);
  const [openmodal, setOpenModal] = useState(null);

  //useEffect functions
  useEffect(() => {
    const fetchMeeting = () => {
      get_meetings_by_mentor_id(mentor.token, mentor.user.mentor_id)
        .then((result) => {
          result = result.data;
          console.log(result);
          setMeetings(result.meetings);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMeeting();
  }, []);

  const toggleOpenModal = (e, meetingId) => {
    e.stopPropagation();
    setOpenModal(meetingId === openmodal ? null : meetingId);
  };

  const handleSetMeeting = (new_meeting) => {
    console.log(new_meeting);
    create_meeting(mentor.token, new_meeting)
      .then((result) => {
        result = result.data;
        console.log(result);
        setMeetings(result.meetings);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  const handelShowModal = () => {
    setShowModal(!showModal);
  };

  const filteredMeetings =
    filter === "all"
      ? meetings
      : meetings.filter((meeting) =>
          filter === "completed" ? meeting.approve : !meeting.approve
        );
  // console.log(openmodal);

  const handleDownloadMeetings = () => {
    console.log("Download meetings");
  }

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.pageHeader}>
        <Heading>Meeting Management</Heading>
      </Box>
      {/* Add filter selector */}
      <Flex className={styles.buttons}>
        <Center cursor="pointer" m="auto 2%">
          <MdOutlineFileDownload size={25} onClick={handleDownloadMeetings} />
        </Center>
        <Flex gap="20px">
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Meetings</option>
            <option value="pending">Pending Meetings</option>
            <option value="completed">Completed Meetings</option>
          </Select>
          <Button colorScheme="blue" onClick={() => setShowModal(!showModal)}>
            Set Meeting
          </Button>
        </Flex>
      </Flex>
      {/* Display meetings */}
      <Box className={styles.meetingsContainer}>
        {filteredMeetings.map((meeting) => (
          <Box
            key={meeting.meeting_id}
            className={`${styles.meetingItem} ${
              meeting.approve ? styles.completed : styles.pending
            }`}
          >
            <Box className={styles.details}>
              <Heading className={styles.meetingName}>{meeting.title}</Heading>
              <Text className={styles.meetingTime}>{meeting.time}</Text>
              <Text className={styles.meetingDescription}>
                {meeting.description}
              </Text>
            </Box>
            <Flex className={styles.modalContainer}>
              <Heading color={meeting.approve ? "green" : "#ffc107"}>
                {meeting.approve ? "Completed" : "Pending"}
              </Heading>

              <Model
                isOpenModal={meeting.meeting_id === openmodal}
                toggleOpenModal={(e) => toggleOpenModal(e, meeting.meeting_id)}
                meeting={meeting}
                meetings={meetings}
                // setFilter={setFilter}
                setMeetings={setMeetings}
                mentor={mentor}
                setOpenModal={setOpenModal}
                openmodal={openmodal}
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
          isChatMeeting={false}
        />
      )}
    </Box>
  );
};

export default Meetings;
