import { IoMdClose } from "react-icons/io";
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
export default function SetMeetingModal({ handelShowModal, handleSetMeeting }) {
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [showMentees, setShowMentees] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [selectedNames, setSelectedNames] = useState([]);
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleNameClick = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((selected) => selected !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  return (
    <Box>
      <div className={styles.modal}>
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
}
