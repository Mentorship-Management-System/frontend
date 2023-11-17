import { Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";


export default function MentorLogin() {
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

  const SubmitSignInHandler = () => {};

  const SubmitSignUpHandler = () => {};
  return (
    <div>
        <Center h="100vh">
        {toggle && <Box display="flex" w="50vw" h="60vh">
          <VStack w='30vw' bgColor='white' color='black'>
            <Heading mt='20%' fontSize='2rem'>Login To Your Account</Heading>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={emailHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
            />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={passwordHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
              mt='2%'
            />
            <Button onClick={SubmitSignInHandler} 
              borderRadius="20px"
              w='8vw'
              h='4vh'
              mt='6%'>Sign In</Button>
          </VStack>
          <VStack justify='center' bgColor="#FF0080">
            <Heading textAlign='center'  fontSize='2rem'>Haven't Registered Yet?</Heading>
            <Button onClick={toggleHandler}
            borderRadius="20px"
            w='8vw'
            h='4vh'
            mt='6%'
            bgColor='#154360' color='white'>Sign Up</Button>
          </VStack>
        </Box>}
        {!toggle && <Box display="flex" w="55vw" h="65vh">
        <VStack justify='center' bgColor="#FF0080">
            <Heading textAlign='center'  fontSize='2rem'>Already Have An Account?</Heading>
            <Button onClick={toggleHandler}
            borderRadius="20px"
            w='8vw'
            h='4vh'
            mt='6%'
            bgColor='#154360' color='white'>Sign In</Button>
          </VStack>
          <VStack w='35vw' bgColor='white' color='black'>
            <Heading mt='10%' fontSize='2rem'>Register New Acount</Heading>
            <Input
              type="text"
              value={name}
              placeholder="Name"
              onChange={nameHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
            />
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={emailHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
              mt='2%'
            />
            <Input
              type="text"
              value={department}
              placeholder="Department"
              onChange={departmentHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
              mt='2%'
            />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={passwordHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
              mt='2%'
            />
            <Input
              type="password"
              value={currentpassword}
              placeholder="Current Password"
              onChange={currentpasswordHandler}
              borderRadius="20px"
              pl='5%'
              w='18vw'
              h='4vh'
              mt='2%'
            />
            <Button onClick={SubmitSignUpHandler} 
              borderRadius="20px"
              w='8vw'
              h='4vh'
              mt='6%'>Sign Up</Button>
          </VStack>
        </Box>}
      </Center>
    </div>
  )
}
