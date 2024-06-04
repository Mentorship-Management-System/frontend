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
import { admin_login } from "../../api/adminApi";
import { useDispatch } from "react-redux";
import { adminAuthActions } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.scss";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function AdminLogin() {
  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const [showForgot, setShowForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const SubmitSignInHandler = () => {
    const payload = {
      email: email,
      password: password,
    };
    console.log(payload);
    admin_login(payload)
      .then((result) => {
        result = result.data;
        console.log(result);
        dispatch(adminAuthActions.login({ admin: result.result }));
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Center className={classes.root}>
        <div className={classes.overlay}></div>

        <Flex className={classes.container}>
          {!showForgot ? (
            <Flex className={classes.insideContainer}>
              <Heading className={classes.heading}>Admin Login Form</Heading>
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
              <Heading className={classes.heading}>Forgot Password</Heading>
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
        </Flex>
      </Center>
    </div>
  );
}
