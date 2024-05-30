import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.scss"; // Import CSS Modules
import { FaBars, FaUserCircle, FaSearch } from "react-icons/fa"; // Import icons from react-icons library
import {
  VStack,
  Text,
  Flex,
  Box,
  HStack,
  Center,
  Heading,
} from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";
import { HiBars3BottomLeft } from "react-icons/hi2";

const Navbar = ({ toggleDrawer }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      updateGreeting();
    }, 1000); // Update the date and greeting every second (1000ms)

    // Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(interval);
  });

  useEffect(() => {
    updateGreeting();
  }); // Run the initial updateGreeting when the component mounts

  const updateGreeting = () => {
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning!");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  };

  // Function to format the date in the desired format
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate.replace(/-/g, " "); // Remove all dashes from the formatted date
  };

  const formattedDate = formatDate(currentDate);
  return (
    <>
      <Flex style={{ backgroundColor: "white", alignItems: "center" }}>
        <Center onClick={toggleDrawer} className={classes.barIcon}>
          <HiBars3BottomLeft className={classes.icon} />
        </Center>
        <Flex className={classes.rootHeader}>
          <Heading className={classes.header}>
            Mentorship Management System
          </Heading>
          <div className={classes.greet}>
            <p className={classes.greeting}>{greeting}</p>

            <div className={classes.time}>
              <span>{formattedDate}</span>
              <span>{currentDate.toLocaleTimeString()}</span>
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
