import React, { useEffect, useState } from "react";
import classes from "./Navbar.module.scss"; // Import CSS Modules
import { FaBars, FaUserCircle, FaSearch } from "react-icons/fa"; // Import icons from react-icons library
import { VStack, Text, Flex, Box, HStack, Center } from "@chakra-ui/react";
import { IoIosNotifications } from "react-icons/io";

const Navbar = () => {
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
      <Flex className={classes.rootHeader}>
        <div className={classes.greet}>
          <p className={classes.greeting}>{greeting}</p>

          <div className={classes.time}>
            <span>{formattedDate}</span>
            <span>{currentDate.toLocaleTimeString()}</span>
          </div>
        </div>
        <HStack className={classes.navbarRight}>
          <Flex className={classes.search}>
            <FaSearch className={classes.searchIcon} color="gray" />
            <input type="text" placeholder="Search..." />
          </Flex>
          <Center className={classes.notiIcon}>
            <IoIosNotifications color="#ffff" size={30} />
          </Center>
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
