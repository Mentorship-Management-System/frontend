import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mentor_login } from "../../api/mentorApi";
import { mentorAuthActions } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.scss";
export default function MentorLogin() {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state variables
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const departmentHandler = (e) => {
    setDepartment(e.target.value);
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

  const SubmitSignInHandler = () => {
    const payload = {
      email,
      password,
    };
    console.log(payload);

    mentor_login(payload).then((result) => {
      result = result.data;
      console.log(result.mentor);
      dispatch(mentorAuthActions.login({ mentor: result.result }));
      navigate("/mentor/dashboard");
    });
  };

  const SubmitSignUpHandler = () => {};
  return (
    <div>
      <Center className={classes.root}>
        <div className={classes.overlay}></div>
        {toggle && (
          <Flex className={classes.container}>
            <VStack w="30vw" bgColor="white" color="black">
              <Heading mt="20%" fontSize="2rem">
                Login To Your Account
              </Heading>
              <Input
                mt="10%"
                borderColor="gray"
                type="email"
                value={email}
                placeholder="Email"
                onChange={emailHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
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
              <Button
                onClick={SubmitSignInHandler}
                borderRadius="20px"
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
              bgGradient="linear(to-br, #003285, #153F78)"
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
                bgColor="white"
                color="#254060"
              >
                Sign Up
              </Button>
            </VStack>
          </Flex>
        )}
        {!toggle && (
          <Flex className={classes.container}>
            <VStack
              w="30vw"
              justify="center"
              bgGradient="linear(to-br, #003285, #153F78)"
            >
              <Heading textAlign="center" color="white" fontSize="2rem">
                Already Have An Account?
              </Heading>
              <Button
                onClick={toggleHandler}
                borderRadius="20px"
                w="8vw"
                h="5vh"
                mt="6%"
                bgColor="white"
                color="#254060"
              >
                Sign In
              </Button>
            </VStack>
            <VStack w="30vw" bgColor="white" color="black">
              <Heading mt="10%" fontSize="2rem">
                Register New Acount
              </Heading>
              <Input
                mt="5%"
                type="text"
                value={name}
                placeholder="Name"
                onChange={nameHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                borderColor="gray"
                h="5vh"
              />
              <Input
                type="email"
                value={email}
                placeholder="Email"
                onChange={emailHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                borderColor="gray"
                h="5vh"
                mt="2%"
              />
              <Input
                type="text"
                value={department}
                placeholder="Department"
                onChange={departmentHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                h="5vh"
                borderColor="gray"
                mt="2%"
              />
              <Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={passwordHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                borderColor="gray"
                h="5vh"
                mt="2%"
              />
              <Input
                type="password"
                value={currentpassword}
                placeholder="Current Password"
                onChange={currentpasswordHandler}
                borderRadius="20px"
                pl="5%"
                w="22vw"
                borderColor="gray"
                h="5vh"
                mt="2%"
              />
              <Button
                onClick={SubmitSignUpHandler}
                borderRadius="20px"
                w="8vw"
                h="5vh"
                variant="outline"
                borderColor="gray"
                mt="3%"
              >
                Sign Up
              </Button>
            </VStack>
          </Flex>
        )}
      </Center>
    </div>
  );
}
