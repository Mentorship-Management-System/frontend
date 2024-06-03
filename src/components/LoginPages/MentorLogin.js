import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mentor_login } from "../../api/mentorApi";
import { mentorAuthActions } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.scss";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function MentorLogin() {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state variables
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [phone, setPhone] = useState("");
  const [gsuite, setGsuite] = useState("");
  const [password, setPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const nameFHandler = (e) => {
    setFName(e.target.value);
  };
  const nameLHandler = (e) => {
    setLName(e.target.value);
  };

  const gsuiteHandler = (e) => {
    setGsuite(e.target.value);
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
            {!showForgot ? (
              <Flex className={classes.insideContainer}>
                <Heading>Mentor Login</Heading>
                <Box className={classes.inputContainer}>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={emailHandler}
                  />
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Password"
                      onChange={passwordHandler}
                    />
                    <InputRightElement h={"full"}>
                      <Center
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                      </Center>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Flex className={classes.buttonContainer}>
                  <Button onClick={SubmitSignInHandler} variant="outline">
                    Sign In
                  </Button>
                  <Text
                    style={{
                      textDecoration: "underline",
                      color: "#003285",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowForgot(true)}
                  >
                    forgot password?
                  </Text>
                </Flex>
              </Flex>
            ) : (
              <Flex className={classes.insideContainer}>
                <Center
                  className={classes.icon}
                  onClick={() => setShowForgot(false)}
                >
                  <RxCross2 />
                </Center>
                <Heading>Forgot Password</Heading>
                <Box className={classes.inputContainer}>
                  <Input
                    type="email"
                    value={email}
                    placeholder="Enter your Gsuite email id"
                    onChange={emailHandler}
                  />
                </Box>
                <Flex className={classes.buttonContainer}>
                  <Button onClick={SubmitSignInHandler} variant="outline">
                    Enter
                  </Button>
                </Flex>
              </Flex>
            )}

            <Flex
              className={classes.insideContainer}
              bgGradient="linear(to-br, #003285, #153F78)"
            >
              <Box className={classes.inputContainer}>
                <Heading>Haven't Registered Yet?</Heading>
                <Flex className={classes.signUpToggleContainer}>
                  <Button
                    onClick={toggleHandler}
                    bgColor="white"
                    color="#254060"
                  >
                    Sign Up
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        )}
        {!toggle && (
          <Flex className={classes.container}>
            <Flex
              className={classes.insideContainer}
              bgGradient="linear(to-br, #003285, #153F78)"
            >
              <Box className={classes.inputContainer}>
                <Heading>Already have an accoount?</Heading>
                <Flex className={classes.signUpToggleContainer}>
                  <Button
                    onClick={toggleHandler}
                    bgColor="white"
                    color="#254060"
                  >
                    Sign In
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Flex className={classes.insideContainer}>
              <Heading className={classes.registerHeader}>
                Mentor Registration Form
              </Heading>
              <Box className={classes.inputContainer}>
                <Flex gap={5}>
                  <Input
                    type="text"
                    value={fname}
                    placeholder="First Name"
                    onChange={nameFHandler}
                  />
                  <Input
                    type="text"
                    value={lname}
                    placeholder="Last Name"
                    onChange={nameLHandler}
                  />
                </Flex>

                <Input
                  type="email"
                  value={email}
                  placeholder="Enter personal email"
                  onChange={emailHandler}
                />
                <Input
                  type="email"
                  value={gsuite}
                  placeholder="Enter your Gsuite Id"
                  onChange={gsuiteHandler}
                />
                <Input
                  type="text"
                  value={phone}
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={passwordHandler}
                  />
                  <InputRightElement h={"full"}>
                    <Center
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </Center>
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Input
                    name="password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={password}
                    placeholder="Reenter Password"
                    onChange={currentpasswordHandler}
                  />
                  <InputRightElement h={"full"}>
                    <Center
                      onClick={() =>
                        setShowConfirmPassword((showPassword) => !showPassword)
                      }
                    >
                      {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </Center>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Flex className={classes.signUpToggleContainer}>
                <Button onClick={SubmitSignInHandler} variant="outline">
                  Sign Up
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Center>
    </div>
  );
}
