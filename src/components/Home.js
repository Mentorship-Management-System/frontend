import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
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
          <Box>
            <Heading className="Title" mt="20%" fontSize="5rem" w="38vw">
              MENTORSHIP MANAGEMENT SYSTEM
            </Heading>
            <Flex justify="space-between" mt="5%">
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
          </Box>
          <Image w="35vw" src={img} />
        </Box>
      </Box>
    </div>
  );
}
