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
  VStack,
} from "@chakra-ui/react";
import styles from "../Css/Meetings.module.scss";
import { MdOutlineFileDownload } from "react-icons/md";
import Model from "./Model";
import SetMeetingModal from "./SetMeetingModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  create_meeting,
  delete_meeting,
  get_meetings_by_mentor_id,
} from "../../../api/meetingApi";
import { MdEdit, MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import { get_students_by_mentor_id } from "../../../api/studentApi";

const Meetings = () => {
  //hooks
  const Navigate = useNavigate();
  const mentor = useSelector((state) => state.mentorAuth.mentor);

  //state variables
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [meetings, setMeetings] = useState([]);
  const [openmodal, setOpenModal] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [popupId, setPopupId] = useState();
  const [students, setStudents] = useState();
  const [toEditMeeting, setToEditMeeting] = useState(null);
  //useEffect functions
  useEffect(() => {
    const fetchMeeting = () => {
      get_meetings_by_mentor_id(mentor.token, mentor.user.mentor_id)
        .then((result) => {
          result = result.data;
          console.log(result.meetings);
          setMeetings(result.meetings);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMeeting();
  }, []);

  useEffect(() => {
    get_students_by_mentor_id(mentor.token, mentor.user.mentor_id)
      .then((result) => {
        result = result.data;
        setStudents(result.students);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handelShowEditModal = () => {
    setShowEditPopup(!showEditPopup);
  };

  const filteredMeetings =
    filter === "all"
      ? meetings
      : meetings.filter((meeting) =>
          filter === "completed" ? meeting.approve : !meeting.approve
        );
  // console.log(openmodal);

  const handleDeleteMeeting = () => {
    console.log(popupId);
    delete_meeting(mentor.token, popupId)
      .then((result) => {
        result = result.data;
        console.log(result);
        setMeetings((prev) =>
          prev.filter((meeting) => meeting.meeting_id !== popupId)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowDeletePopup(!showDeletePopup);
      });
  };
  const handleDownloadMeetings = () => {
    console.log("Download students");
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Define custom headers
    const headers = [
      { key: "meeting_id", header: "Meeting ID" },
      { key: "title", header: "Meeting Title" },
      { key: "description", header: "Meeting Description" },
      { key: "date", header: "Date" },
      { key: "time", header: "Time" },
      { key: "students", header: "Students" },
    ];

    // Convert student data to a format with custom headers
    const dataWithHeaders = meetings
      .filter((data) => data.approve)
      .map((meeting) => {
        const newObj = {};
        let array = "";
        const meetingStudentIds = meeting.student_ids.split(",");
        array = students
          .filter((data) => meetingStudentIds.includes(data.student_id))
          .map(
            (item) => item.fname + " " + item.lname + `(${item.enrollment_no})`
          )
          .join(", ");
        // enrollment_no: item.enrollment_no,
        headers.forEach((header) => {
          if (header.key === "students") {
            newObj[header.header] = array;
          } else if (header.key === "date") {
            newObj[header.header] = meeting[header.key].split("T")[0];
          } else {
            newObj[header.header] = meeting[header.key];
          }
        });
        return newObj;
      });

    console.log(dataWithHeaders);

    // Add custom headers as the first row
    const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, {
      header: headers.map((h) => h.header),
    });

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Generate a binary string representation of the workbook
    const workbookBinary = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    // Convert the binary string to an ArrayBuffer
    const buffer = new ArrayBuffer(workbookBinary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < workbookBinary.length; i++) {
      view[i] = workbookBinary.charCodeAt(i) & 0xff;
    }

    // Create a Blob from the ArrayBuffer and create a URL for it
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element, set its href to the Blob URL, and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.xlsx";
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the temporary link element
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Box className={styles.pageContainer}>
      <Box className={styles.pageHeader}>
        <Heading>Meeting Management</Heading>
      </Box>
      {/* Add filter selector */}
      <Flex className={styles.buttons}>
        <Center cursor="pointer" className={styles.tooltip}>
          <MdOutlineFileDownload size={25} onClick={handleDownloadMeetings} />
          <span className={styles.tooltiptext}>Download</span>
        </Center>
        <Flex className={styles.subButton}>
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
        {filteredMeetings.length !== 0 ? (
          filteredMeetings.map((meeting) => (
            <Box
              key={meeting.meeting_id}
              className={`${styles.meetingItem} ${
                meeting.approve ? styles.completed : styles.pending
              }`}
            >
              <Box className={styles.details}>
                <Heading className={styles.meetingName}>
                  {meeting.title}
                </Heading>
                <Text className={styles.meetingTime}>
                  {meeting.date.split("T")[0]} |{" "}
                  {meeting && meeting.time && meeting.time.substring(0, 5)}
                </Text>
                <Text className={styles.meetingDescription}>
                  {meeting.description}
                </Text>
              </Box>
              <Flex className={styles.modalContainer}>
                <Heading color={meeting.approve ? "green" : "#ffc107"}>
                  {meeting.approve ? "Completed" : "Pending"}
                </Heading>
                <Flex justify="flex-end" align="center">
                  <Model
                    isOpenModal={meeting.meeting_id === openmodal}
                    toggleOpenModal={(e) =>
                      toggleOpenModal(e, meeting.meeting_id)
                    }
                    meeting={meeting}
                    meetings={meetings}
                    // setFilter={setFilter}
                    setMeetings={setMeetings}
                    mentor={mentor}
                    setOpenModal={setOpenModal}
                    openmodal={openmodal}
                  />
                  {!meeting.approve && (
                    <>
                      <Center
                        className={styles.editButton}
                        onClick={() => {
                          setShowEditPopup((prev) => !prev);
                          setPopupId(meeting.meeting_id);
                          setToEditMeeting(meeting);
                        }}
                      >
                        <MdEdit size={22} />
                      </Center>
                      <Center
                        className={styles.editButton}
                        onClick={() => {
                          setShowDeletePopup((prev) => !prev);
                          setPopupId(meeting.meeting_id);
                        }}
                      >
                        <MdDelete size={22} />
                      </Center>
                    </>
                  )}
                </Flex>
                {showDeletePopup && popupId === meeting.meeting_id && (
                  <Box className={styles.editPopup}>
                    <Text>Are you sure?</Text>
                    <Text>You can't undo this afterwards</Text>
                    <Flex justify="flex-end" align="center">
                      <Button
                        variant="outline"
                        onClick={() => setShowDeletePopup(false)}
                      >
                        No
                      </Button>
                      <Button
                        colorScheme="facebook"
                        onClick={handleDeleteMeeting}
                      >
                        Yes
                      </Button>
                    </Flex>
                  </Box>
                )}
              </Flex>
              {showEditPopup && popupId === meeting.meeting_id && (
                <SetMeetingModal
                  handelShowModal={handelShowEditModal}
                  handleSetMeeting={handleSetMeeting}
                  meetingDetails={meeting}
                  isChatMeeting={false}
                  centerModal={false}
                  meeting_id={popupId}
                  isEditMeeting={true}
                  setShowModal={setShowModal}
                  setMeetings={setMeetings}
                />
              )}
            </Box>
          ))
        ) : (
          <Text>No meeting available</Text>
        )}
      </Box>
      {/* Modal for setting new meeting */}
      {showModal && (
        <SetMeetingModal
          handelShowModal={handelShowModal}
          handleSetMeeting={handleSetMeeting}
          meetingDetails={null}
          isChatMeeting={false}
          centerModal={true}
        />
      )}
    </Box>
  );
};

export default Meetings;
