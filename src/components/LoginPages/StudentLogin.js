import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { student_login } from "../../api/studentApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentAuthActions } from "../../redux/store";
import classes from "./login.module.scss";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { forgot_pass } from "../../api/adminApi";

export default function StudentLogin() {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  //state variables
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [programme, setProgramme] = useState("");
  const [semester, setSemester] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentpassword, setCurrentPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);

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

  const SubmitSignInHandler = () => {
    const payload = {
      tezu_email: email,
      password,
    };
    setLoading(true);
    student_login(payload)
      .then((result) => {
        if(result.data){
          result = result.data;
          console.log(result);
          toast({
            title: 'Success',
            description: "Logged in successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          dispatch(studentAuthActions.login({ student: result.result }));
          navigate("/student/dashboard");
        } else {
          console.log(result.response);
          toast({
            title: result.response.statusText,
            description: result.response.data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleForgotPass = () => {
    if(email !== ""){
      setForgotLoading(true);
      forgot_pass({email})
        .then(result => {
          result = result.data;
          console.log(result);
          if (result) {
            toast({
              title: 'Success',
              description: result.message,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
        })
        .catch(error => {
          console.log(error);
          toast({
            title: 'Failed',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
        .finally(() => {
          setShowForgot(false);
          setEmail("");
          setForgotLoading(false);
        })
    }
  }

  return (
    <div>
      <Center className={classes.root}>
        <div className={classes.overlay}></div>
        {toggle && (
          <Flex className={classes.container}>
            {!showForgot ? (
              <Flex className={classes.insideContainer}>
                <Heading className={classes.heading}>Student Login</Heading>
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
                  {/* <Input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={passwordHandler}
                  /> */}
                </Box>
                <Flex className={classes.buttonContainer}>
                  <Button onClick={SubmitSignInHandler} variant="outline">
                    {loading ? <Spinner /> : "Sign In"}
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
                  <Button onClick={handleForgotPass} variant="outline">
                    {forgotLoading ? <Spinner /> : "Enter"}
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        )}
      </Center>
    </div>
  );
}
