import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function StudentLogin() {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const rollnoHandler = (e) => {
    setRollno(e.target.value);
  };
  const programmeHandler = (e) => {
    setProgramme(e.target.value);
  };
  const departmentHandler = (e) => {
    setDepartment(e.target.value);
  };
  const semesterHandler = (e) => {
    setSemester(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const currentpasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
  };

  const SubmitSignInHandler = () => {};

  const SubmitSignUpHandler = () => {};

  return (
    <div>
      <Center h="100vh">
        {toggle && (
          <Box display="flex" w="60vw" h="60vh" border="2px solid gray">
            <VStack w="30vw" bgColor="white" color="black">
              <Heading mt="20%" fontSize="2rem">
                Login To Your Acount
              </Heading>
              <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={emailHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                mt="10%"
                borderColor="gray"
              />
              <Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={passwordHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                mt="2%"
                borderColor="gray"
              />
              <Button
                onClick={SubmitSignInHandler}
                borderRadius="20px"
                variant="outline"
                borderColor="gray"
                w="8vw"
                h="5vh"
                mt="6%"
              >
                Sign In
              </Button>
            </VStack>
            <VStack
              w="30vw"
              justify="center"
              bgGradient="linear(to-br, #ff9900, #FF7080)"
            >
              <Heading textAlign="center" fontSize="2rem" color="white">
                Haven't Registered Yet?
              </Heading>
              <Button
                onClick={toggleHandler}
                borderRadius="20px"
                w="8vw"
                h="5vh"
                mt="6%"
                _hover={{ backgroundColor: "black" }}
                bgColor="#254060"
                color="white"
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        )}
        {!toggle && (
          <Box display="flex" w="60vw" h="70vh" border="2px solid gray">
            <VStack
              w="35vw"
              justify="center"
              bgGradient="linear(to-br, #ff9900, #FF7080)"
            >
              <Heading textAlign="center" fontSize="2rem" color="white">
                Already Have An Account?
              </Heading>
              <Button
                onClick={toggleHandler}
                borderRadius="20px"
                w="8vw"
                h="5vh"
                mt="6%"
                _hover={{ backgroundColor: "black" }}
                bgColor="#154360"
                color="white"
              >
                Sign In
              </Button>
            </VStack>
            <VStack w="35vw" bgColor="white" color="black">
              <Heading mt="10%" fontSize="2rem">
                Register New Acount
              </Heading>
              <Input
                type="text"
                value={name}
                placeholder="Name"
                onChange={nameHandler}
                borderRadius="20px"
                mt="6%"
                pl="5%"
                w="22vw"
                h="5vh"
                borderColor="gray"
              />
              <HStack w="22vw" justify="space-between">
                <Input
                  borderColor="gray"
                  type="text"
                  value={rollno}
                  placeholder="Roll No"
                  onChange={rollnoHandler}
                  borderRadius="20px"
                  pl="5%"
                  w="10vw"
                  h="5vh"
                  mt="2%"
                />
                <Input
                  borderColor="gray"
                  type="text"
                  value={department}
                  placeholder="Department"
                  onChange={departmentHandler}
                  borderRadius="20px"
                  pl="5%"
                  w="10vw"
                  h="5vh"
                  mt="2%"
                />
              </HStack>
              <HStack w="22vw" justify="space-between">
                <Input
                  borderColor="gray"
                  type="text"
                  value={programme}
                  placeholder="Programme"
                  onChange={programmeHandler}
                  borderRadius="20px"
                  pl="5%"
                  w="10vw"
                  h="5vh"
                  mt="2%"
                />
                <Input
                  borderColor="gray"
                  type="text"
                  value={semester}
                  placeholder="Semester"
                  onChange={semesterHandler}
                  borderRadius="20px"
                  pl="5%"
                  w="10vw"
                  h="5vh"
                  mt="2%"
                />
              </HStack>
              <Input
                borderColor="gray"
                type="email"
                value={email}
                placeholder="Email"
                onChange={emailHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                mt="2%"
              />
              <Input
                borderColor="gray"
                type="password"
                value={password}
                placeholder="Password"
                onChange={passwordHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                mt="2%"
              />
              <Input
                borderColor="gray"
                type="password"
                value={currentpassword}
                placeholder="Current Password"
                onChange={currentpasswordHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                mt="2%"
              />
              <Button
                onClick={SubmitSignUpHandler}
                borderRadius="20px"
                w="8vw"
                h="5vh"
                mt="3%"
                variant="outline"
                borderColor="gray"
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        )}
      </Center>
    </div>
  );
}
