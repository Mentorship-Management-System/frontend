import React, { memo, useMemo, useState } from "react";
import {
  Button,
  Box,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react";
const Model = ({ showModal1, meeting, modelCloseHandler }) => {
  return (
    <div>
      <Modal isOpen={showModal1} onClose={modelCloseHandler} size="lg">
        {/* <ModalOverlay /> */}

        <ModalContent>
          <ModalHeader>{meeting?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Text>
                <strong>Time:</strong> {meeting?.time}
              </Text>
              <Text>
                <strong>Description:</strong> {meeting?.description}
              </Text>
              <Text>
                <strong>Feedback:</strong>
              </Text>
              {meeting?.feedback && (
                <Box
                  backgroundColor="lightgray"
                  borderRadius="8px"
                  padding="1%"
                >
                  {meeting.feedback.map((feedbackItem, index) => (
                    <Box key={index}>
                      <Text fontWeight="bold">{feedbackItem.name}:</Text>{" "}
                      <Text>{feedbackItem.feedback}</Text>
                    </Box>
                  ))}
                </Box>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(Model);
