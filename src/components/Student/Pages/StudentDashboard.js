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
import { get_meetings_by_student_id } from "../../../api/meetingApi";
import { get_sgpa } from "../../../api/studentApi";

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
  const student = useSelector((state) => state.studentAuth.student);
  const [sgpas, setSgpas] = useState([]);
  useEffect(() => {
    get_sgpa(student.token, student.user.enrollment_no)
      .then((result) => {
        result = result.data;
        console.log("sgpas", result.sgpas);
        setSgpas(result.sgpas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        categories: sgpas.map((obj) => obj.semester),
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "SGPA",
        // data: [8.1, 7.6, 8.4, 6.9, 7.8, 7.8, 8.6],
        data: sgpas.map((obj) => obj.sgpa),
      },
    ],
  };

  return (
    <Box w="100%" h="90%">
      <Heading fontSize={["1rem", "1.2rem", "1.2rem", "1.3rem"]}>
        SGPA Graph{" "}
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

  //state variables
  const [count, setCount] = useState(null);
  const [meetings, setMeetings] = useState([]);

  //useEffect functions
  useEffect(() => {
    get_count(student.token)
      .then((result) => {
        result = result.data;
        console.log(result.counts, "data");
        setCount(result.counts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    get_meetings_by_student_id(student.token, student.user.student_id)
      .then((result) => {
        result = result.data;
        setMeetings(result.meetings);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredMeetings = meetings
    .filter((met) => new Date(met.date) > new Date())
    .slice(0, 2);

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
            <Box flexGrow="1">
              {filteredMeetings.length === 0 ? (
                <Text>No upcomming meetings</Text>
              ) : (
                filteredMeetings.map((meeting) => (
                  <Box key={meeting.id} className={styles.meetingItem}>
                    <Text className={styles.meetingTitle}>{meeting.title}</Text>
                    <Text>
                      {meeting.date.split("T")[0]} - {meeting.time.slice(0, -3)}
                    </Text>
                    <p className={styles.meetingDescription}>
                      {meeting.description}
                    </p>
                  </Box>
                ))
              )}
            </Box>
            <Flex justify="center">
              <Button
                mt="4"
                colorScheme="blue"
                onClick={() => (window.location.href = "/mentor/Meetings")}
              >
                View All
              </Button>
            </Flex>
          </Box>
        </Center>
      </Flex>
    </div>
  );
};

export default Dashboard;
