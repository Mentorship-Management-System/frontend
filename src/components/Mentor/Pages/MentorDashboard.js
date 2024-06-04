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
import { get_students_count_by_year } from "../../../api/studentApi";

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
  const mentor = useSelector(state => state.mentorAuth.mentor);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    get_students_count_by_year(mentor.token, mentor.user.mentor_id)
      .then(result => {
        result = result.data;
        console.log(result);
        setStats(result.count);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  const teachersMeetingsData = {
    options: {
      chart: {
        type: "line",
        width: "100%",
        height: "90%",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: stats.map((obj) => obj.enrollment_year),
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Year wise assigned mentees count ",
        data: stats.map((obj) => obj.student_count),
      },
    ],
  };

  return (
    <Box w="100%" h="100%">
      <Heading fontSize={["1rem", "1.2rem", "1.2rem", "1.3rem"]}>
        Year wise students count assigned
      </Heading>
      <Chart
        options={teachersMeetingsData.options}
        series={teachersMeetingsData.series}
        type="line"
        height={teachersMeetingsData.options.chart.height}
        width={teachersMeetingsData.options.chart.width}
      />
    </Box>
  );
};

const Dashboard = () => {
  //hooks
  const mentor = useSelector((state) => state.mentorAuth.mentor);
  console.log(mentor);

  //state variables
  const [counts, setCounts] = useState({});
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    get_count(mentor.token)
      .then((result) => {
        result = result.data;
        console.log(result);
        setCounts(result.counts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    get_meetings_by_student_id(mentor.token, mentor.user.mentor_id)
      .then((result) => {
        result = result.data;
        console.log(result.meetings, "meeting data");
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
        Welcome {mentor.user.fname} {mentor.user.lname}
      </h1>
      <div className={styles.flexContainer}>
        <HStack className={styles.dashboardCard}>
          <div className={styles.flexContent}>
            <p>Mentees</p>
            <h3>{counts.studentCount}</h3>
          </div>
          <Center className={styles.imageContainer}>
            <img src={cartoon1} alt={"Mentees"} />
          </Center>
        </HStack>

        <HStack className={styles.dashboardCard}>
          <div className={styles.flexContent}>
            <p>Mentors</p>
            <h3>{counts.mentorCount}</h3>
          </div>
          <Center className={styles.imageContainer}>
            <img src={cartoon2} alt={"Mentors"} />
          </Center>
        </HStack>
      </div>
      <Flex className={styles.charts}>
        <Box className={styles.chart}>
          <TeachersMeetingsChart className={styles.chartItem} />
        </Box>
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
              {filteredMeetings.length === 0 ? (
                <Text>No upcomming meetings available</Text>
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
                    {/* Add more meeting details as needed */}
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
