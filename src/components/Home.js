import React from 'react'
import {Box, Button, Center, Heading, Image, Text} from "@chakra-ui/react";
import img from "../media/img1-removebg-preview.png";
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        <Box h="12vh" display="flex" justifyContent="space-around">
            <Center><NavLink  style={{ textDecoration: 'none', color: "white", fontWeight: 'bold' }} to="/studentlogin">Student Panel</NavLink></Center >
            <Center ><NavLink to="/mentorlogin" style={{ textDecoration: 'none', color: "white",fontWeight: 'bold' }}>Mentor Panel</NavLink></Center >
            <Center ><NavLink to="/adminlogin" style={{ textDecoration: 'none', color: "white",fontWeight: 'bold' }}>Admin Panel</NavLink></Center >
        </Box>
        <Box mt="4%">
            <Box display="flex" justifyContent="space-around">
                <Heading mt="7%" fontSize="4.5rem" w="30vw">MENTORSHIP MANAGEMENT SYSTEM</Heading>
                <Image w="35vw" src={img}/>
            </Box>
        </Box>
    </div>
  )
}
