// DashboardComponent.js
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import styles from "../../Admin/Css/Dashboard.module.scss"; // Import CSS Modules for styling
import cartoon1 from "../../../media/graduated.png";
import cartoon2 from "../../../media/teacher.png";
import cartoon3 from "../../../media/project.png";
import cartoon4 from "../../../media/research.png";
import {
  Center,
  Flex,
  HStack,
  Heading,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { get_count } from "../../../api/adminApi";

const meetings = [
  {
    id: 1,
    title: "Weekly Team Meeting",
    date: "2024-04-01",
    time: "10:00 AM",
    description: "Discuss project updates and plan for the week.",
  },
  {
    id: 2,
    title: "Client Presentation",
    date: "2024-04-05",
    time: "2:00 PM",
    description: "Present new product features to the client.",
  },
  // Add more dummy meeting data as needed
];
const data = [
  { title: "Mentees", count: 40, icon: cartoon1 },
  { title: "Mentors", count: "40+", icon: cartoon2 },
];

const TeachersMeetingsChart = () => {
  const teachersMeetingsData = {
    options: {
      chart: {
        type: "line",
        height: "90%",
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "1st Sem",
          "2st Sem",
          "3st Sem",
          "4st Sem",
          "5st Sem",
          "6st Sem",
          "7st Sem",
        ],
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "CGPA",
        data: [8.1, 7.5, 7.7, 7.5, 7.6, 7.8, 8],
      },
      {
        name: "SGPA",
        data: [8.1, 7.6, 8.4, 6.9, 7.8, 7.8, 8.6],
      },
    ],
  };

  return (
    <Box w="100%" h="90%">
      <Heading fontSize={["1rem", "1.2rem", "1.2rem", "1.3rem"]}>
        CGPA/SGPA Graph{" "}
      </Heading>
      <Chart
        options={teachersMeetingsData.options}
        series={teachersMeetingsData.series}
        type="line"
        height={teachersMeetingsData.options.chart.width}
        width={teachersMeetingsData.options.chart.width}
      />
    </Box>
  );
};

const Dashboard = () => {
  //hooks
  const student = useSelector((state) => state.studentAuth.student);
  console.log(student);

  //state variables
  const [count, setCount] = useState(null);

  //useEffect functions
  useEffect(() => {
    get_count(student.token)
      .then(result => {
        result = result.data;
        console.log(result);
        setCount(result.counts);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className={styles.dashboardContainer}>
      <h1>
        Welcome {student.user.fname} {student.user.lname}
      </h1>
      <div className={styles.flexContainer}>
        <HStack className={styles.dashboardCard}>
          <div className={styles.flexContent}>
            <p>Mentees</p>
            <h3>{count && count.studentCount}</h3>
          </div>
          <Center className={styles.imageContainer}>
            <img src={cartoon1} alt={"Mentees"} />
          </Center>
        </HStack>
        <HStack className={styles.dashboardCard}>
          <div className={styles.flexContent}>
            <p>Mentors</p>
            <h3>{count && count.mentorCount}</h3>
          </div>
          <Center className={styles.imageContainer}>
            <img src={cartoon2} alt={"Mentors"} />
          </Center>
        </HStack>
      </div>
      <Flex className={styles.charts}>
        <Center className={styles.chart}>
          <TeachersMeetingsChart className={styles.chartItem} />
        </Center>
        <Center className={styles.chart1}>
          <Box className={styles.timelineContainer}>
            <Heading
              as="h2"
              size="md"
              mb="4"
              className={styles.timelineHeading}
            >
              Upcoming Meetings
            </Heading>
            <Box flexGrow="3">
              {meetings.map((meeting) => (
                <Box key={meeting.id} className={styles.meetingItem}>
                  <Text className={styles.meetingTitle}>{meeting.title}</Text>
                  <Text>
                    {meeting.date} - {meeting.time}
                  </Text>
                  <p className={styles.meetingDescription}>
                    {meeting.description}
                  </p>
                  {/* Add more meeting details as needed */}
                </Box>
              ))}
            </Box>
            <Button
              mt="4"
              colorScheme="blue"
              onClick={() => (window.location.href = "/mentor/Meetings")}
            >
              View All
            </Button>
          </Box>
        </Center>
      </Flex>
    </div>
  );
};

export default Dashboard;
