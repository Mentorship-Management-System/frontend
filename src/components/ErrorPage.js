import React from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const ErrorPage = () => {
  return (
    <Center h="100vh" textAlign="center">
      <Box>
        <Heading fontSize="6rem">404</Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color="gray.500" mb={6}>
          The page you're looking for does not seem to exist
        </Text>
        <VStack spacing={4}>
          <Button
            backgroundColor="navy"
            _hover={{ backgroundColor: "#03ac" }}
            color="white"
            variant="solid"
            as={Link}
            to="/"
          >
            Go to Home
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ErrorPage;
