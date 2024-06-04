import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import img from "../media/img1-removebg-preview.png";
import { NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box className="HeaderBox">
          <VStack className="HeaderInBox">
            <Heading className="Title">MENTORSHIP MANAGEMENT SYSTEM</Heading>
            <Flex mt="5%">
              <Center>
                <NavLink to="/student-login">
                  <button className="homeButton">Student login</button>
                </NavLink>
              </Center>
              <Center>
                <NavLink to="/mentor-login">
                  <button className="homeButton">Mentor login</button>
                </NavLink>
              </Center>
              <Center>
                <NavLink to="/admin-login">
                  <button className="homeButton">Admin login</button>
                </NavLink>
              </Center>
            </Flex>
          </VStack>
          <Image className="homeImage" src={img} />
        </Box>
      </Box>
    </div>
  );
}
