import { Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { admin_login } from "../../api/adminApi";
import { useDispatch } from "react-redux";
import { adminAuthActions } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.scss";

export default function AdminLogin() {
  //state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          pos="relative"
          zIndex="16"
          w="50vw"
          h="60vh"
        >
          <VStack
            w="32vw"
            h="50vh"
            bgColor="white"
            border="2px solid #003285"
            color="black"
          >
            <Heading mt="10%" fontSize="2rem" color="#003285">
              Login To Your Account
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
              w="8vw"
              h="5vh"
              mt="6%"
            >
              Sign In
            </Button>
          </VStack>
        </Box>
      </Center>
    </div>
  );
}
