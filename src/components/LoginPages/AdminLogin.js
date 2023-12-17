import { Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";


export default function AdminLogin() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };


  const SubmitSignInHandler = () => {};

  return (
    <div>
        <Center h="100vh">
        <Box display="flex" justifyContent='center' alignItems='center' w="50vw" h="60vh" >
          <VStack w='30vw' h='50vh' bgColor='white' color='black' borderRadius='10px'>
            <Heading mt='10%' fontSize='2rem'>Login To Your Account</Heading>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={emailHandler}
              borderRadius="20px"
              pl='5%'
              w='22vw'
              h='5vh'
              mt='10%' borderColor='gray'
            />
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={passwordHandler}
              borderRadius="20px"
              pl='5%'
              w='22vw'
              h='5vh'
              mt='2%' borderColor='gray'
            />
            <Button onClick={SubmitSignInHandler} 
              borderRadius="20px"
              w='8vw'
              h='5vh'
              mt='6%'>Sign In</Button>
          </VStack>
        </Box>
      </Center>
    </div>
  )
}
