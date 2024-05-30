// DashboardComponent.js
import Chart from "react-apexcharts";
import React from "react";
import styles from "../Css/Dashboard.module.scss"; // Import CSS Modules for styling
import cartoon1 from "../../../media/graduated.png";
import cartoon2 from "../../../media/teacher.png";
import cartoon3 from "../../../media/project.png";
import cartoon4 from "../../../media/research.png";
import { Box, Center, Flex, HStack, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const data = [
  { title: "Students", count: 580, icon: cartoon1 },
  { title: "Teachers", count: "40+", icon: cartoon2 },
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
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "Teachers Meetings",
        data: [1, 6, 5, 7, 4, 6, 4],
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
        options={teachersMeetingsData.options}
        series={teachersMeetingsData.series}
        type="line"
        height={teachersMeetingsData.options.chart.height}
        width={teachersMeetingsData.options.chart.width}
      />
    </Box>
  );
};

const BoysGirlsCountChart = () => {
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
        categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0d30ac", "#26B7ED"],
    },
    series: [
      {
        name: "Boys",
        data: [150, 200, 180, 220, 250, 200],
      },
      {
        name: "Girls",
        data: [120, 180, 150, 200, 230, 210],
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
  const admin = useSelector((state) => state.adminAuth.admin.user);
  console.log(admin);

  return (
    <div className={styles.dashboardContainer}>
      <h1>
        Welcome {admin.fname} {admin.lname}
      </h1>
      <div className={styles.flexContainer}>
        {data.map((item, index) => (
          <HStack className={styles.dashboardCard} key={index}>
            <div className={styles.flexContent}>
              <p>{item.title}</p>
              <h3>{item.count}</h3>
            </div>
            <Center className={styles.imageContainer}>
              <img src={item.icon} alt={item.title} />
            </Center>
          </HStack>
        ))}
      </div>
      <Flex className={styles.charts}>
        <Box className={styles.chart}>
          <TeachersMeetingsChart className={styles.chartItem} />
        </Box>
        <Box className={styles.chart}>
          <BoysGirlsCountChart className={styles.chartItem} />
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
