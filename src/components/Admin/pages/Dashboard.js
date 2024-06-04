// DashboardComponent.js
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import styles from "../Css/Dashboard.module.scss"; // Import CSS Modules for styling
import cartoon1 from "../../../media/graduated.png";
import cartoon2 from "../../../media/teacher.png";
import cartoon3 from "../../../media/project.png";
import cartoon4 from "../../../media/research.png";
import { Box, Center, Flex, HStack, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { get_count } from "../../../api/adminApi";
import { all_count_by_year, year_gender_count } from "../../../api/studentApi";
import { all_month_wise_meeting } from "../../../api/meetingApi";

const months = ["Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const YearWiseStudentCount = () => {
  const admin = useSelector(state => state.adminAuth.admin);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    all_month_wise_meeting(admin.token)
      .then(result => {
        result = result.data;
        let formated = Array.from({ length: 12 }, (_, index) => {
          const month = index + 1;
          const monthData = (result.data).find(item => item.month === month);
          return {
            month,
            meeting_count: monthData ? monthData.meeting_count : 0
          };
        })
        setStats(formated)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const yearWiseStudentData = {
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
        categories: stats.map((obj) => months[obj.month]),
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Mentor Mentee Meetings",
        data: stats.map((obj) => obj.meeting_count),
      },
    ],
  };

  return (
    <Box w="100%" h="100%">
      {" "}
      <Heading fontSize={["1rem", "1.2rem", "1.2rem", "1.3rem"]}>
        Mentor Mentee Meetings
      </Heading>
      <Chart
        options={yearWiseStudentData.options}
        series={yearWiseStudentData.series}
        type="line"
        height={yearWiseStudentData.options.chart.height}
        width={yearWiseStudentData.options.chart.width}
      />
    </Box>
  );
};

const BoysGirlsCountChart = () => {
  const admin = useSelector(state => state.adminAuth.admin);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    year_gender_count(admin.token)
      .then(result => {
        result = result.data;
        console.log(result);
        setStats(result.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const boysGirlsCountData = {
    options: {
      chart: {
        type: "bar",
        height: "90%",
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          borderRadius: 5,
          borderRadiusApplication: "end",
          // borderRadiusWhenStacked: 'last',
        },
      },
      xaxis: {
        categories: stats.map((obj) => obj.enrollment_year),
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0d30ac", "#26B7ED"],
    },
    series: [
      {
        name: "Boys",
        data: stats.map((obj) => obj.male_count),
      },
      {
        name: "Girls",
        data: stats.map((obj) => obj.female_count),
      },
    ],
  };
  return (
    <Box w="100%" h="100%">
      {" "}
      <Heading fontSize={["1rem", "1.2rem", "1.2rem", "1.3rem"]}>
        Mentees
      </Heading>
      <Chart
        options={boysGirlsCountData.options}
        series={boysGirlsCountData.series}
        type="bar"
        height={boysGirlsCountData.options.chart.height}
        width={boysGirlsCountData.options.chart.width}
      />
    </Box>
  );
};

const Dashboard = () => {
  //hooks
  const admin = useSelector((state) => state.adminAuth.admin);
  console.log(admin);

  //state variables
  const [counts, setCounts] = useState({});

  useEffect(() => {
    get_count(admin.token)
      .then(result => {
        result = result.data;
        console.log(result);
        setCounts(result.counts)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className={styles.dashboardContainer}>
      <h1>
        Welcome {admin.user.fname} {admin.user.lname}
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
          <YearWiseStudentCount className={styles.chartItem} />
        </Box>
        <Box className={styles.chart}>
          <BoysGirlsCountChart className={styles.chartItem} />
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
