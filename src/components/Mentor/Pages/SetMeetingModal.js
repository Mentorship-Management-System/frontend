import { IoMdClose } from "react-icons/io";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { get_students_by_mentor_id } from "../../../api/studentApi";
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
export default function SetMeetingModal({
  handelShowModal,
  handleSetMeeting,
  isChatMeeting,
  meetingDetails,
  centerModal,
}) {
  //hooks
  const Navigate = useNavigate();
  const mentor = useSelector((state) => state.mentorAuth.mentor);

  //state variables
  const [students, setStudents] = useState([]);
  const [meetingName, setMeetingName] = useState(
    meetingDetails && meetingDetails.title
  );
  const [meetingTime, setMeetingTime] = useState(
    meetingDetails &&
      meetingDetails.date.split("T")[0] + "T" + meetingDetails.time
  );
  const [meetingDescription, setMeetingDescription] = useState(
    meetingDetails && meetingDetails.description
  );
  const [showMentees, setShowMentees] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSelectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (!isSelectAll) {
      // students
      //   .filter(
      //     (data) =>
      //       !selectedStudents.includes(
      //         data.honorifics + " " + data.fname + " " + data.lname
      //       )
      //   )
      //   .map((mentor) =>
      //     selectedStudents.push(
      //       mentor.honorifics + " " + mentor.fname + " " + mentor.lname
      //     )
      //   );
      setSelectedStudents(students);
      setSelectAll(true);
    } else {
      setSelectedStudents([]);
      setSelectAll(false);
    }
  };

  console.log(selectedStudents);

  //useEffect functions
  useEffect(() => {
    get_students_by_mentor_id(mentor.token, mentor.user.mentor_id)
      .then((result) => {
        result = result.data;
        console.log(result);
        setStudents(result.students);
        if (meetingDetails) {
          const array = meetingDetails.student_ids.split(",");
          setSelectedStudents(
            result.students.filter((selected) =>
              array.includes(selected.student_id)
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleNameClick = (student) => {
    // console.log(selectedStudents.includes(student))
    if (selectedStudents.includes(student)) {
      setSelectedStudents(
        selectedStudents.filter(
          (selected) => selected.student_id !== student.student_id
        )
      );
    } else {
      console.log(student);
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const setMeeting = () => {
    if (isChatMeeting) {
      console.log("Setting meeting for chat");
    } else {
      console.log("Setting normal meeting");
      const date_time = meetingTime.split("T");
      let new_meeting = {
        title: meetingName,
        description: meetingDescription,
        date: date_time[0],
        time: date_time[1],
        mentor_id: mentor.user.mentor_id,
        student_ids: selectedStudents.map(({ student_id }) => student_id),
      };
      handleSetMeeting(new_meeting);
    }
  };

  return (
    <div className={centerModal && styles.overlay}>
      <div
        className={
          centerModal ? styles.modal : `${styles.modal} ${styles.modal1}`
        }
      >
        <div className={styles.modalContent}>
          <Flex className={styles.header}>
            <h1>
              <strong>Set New Meeting</strong>
            </h1>
            <Center onClick={handelShowModal}>
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
            {selectedStudents.length !== 0 && (
              <Text mt={4}>
                <strong>Selected Mentees:</strong>
              </Text>
            )}
            {selectedStudents.map((mentee, index) => (
              <Text key={index}>
                {mentee.fname} {mentee.lname}
              </Text>
            ))}
          </div>
          <Flex justify="flex-end" gap="10px" mt="3%">
            {!isChatMeeting && (
              <Button
                colorScheme="blue"
                onClick={() => setShowMentees(!showMentees)}
              >
                Select mentees
              </Button>
            )}
            <Button colorScheme="blue" onClick={setMeeting}>
              Set
            </Button>
          </Flex>
        </div>
      </div>
      {!isChatMeeting && showMentees && (
        <div
          className={styles.popupContainer}
          onClick={() => setShowMentees(false)}
        >
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
              <div className={styles.nameRow} onClick={handleSelectAll}>
                <input type="checkbox" checked={isSelectAll} readOnly />
                <span className={styles.name}>Select All</span>
              </div>
              {students?.map((item, index) => (
                <div
                  key={index}
                  className={styles.nameRow}
                  onClick={() => handleNameClick(item)}
                >
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(item)}
                    readOnly
                  />
                  <span className={styles.name}>
                    {item.fname} {item.lname}
                  </span>
                  <span className={styles.name1}>{item.enrollment_no}</span>
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
    </div>
  );
}
