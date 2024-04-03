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
  Textarea,
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
                <strong>Send Minutes:</strong>
              </Text>
              <Textarea />
              <Button>Send </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default memo(Model);
