import React, { memo } from "react";
import styles from "../Css/Meetings.module.scss";

import { Button, Box, Text, Stack, Flex, Center } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

const Model = ({ isOpenModal, toggleOpenModal, meeting }) => {
  const approveHandler = () => {
    toggleOpenModal();
  };
  return (
    <div>
      <Button onClick={toggleOpenModal}>View</Button>
      {isOpenModal && (
        <div className={`${styles.modal} ${styles.modal1}`}>
          <div className={styles.modalContent}>
            <Flex className={styles.header}>
              <h1>
                <strong>Meeting Details</strong>
              </h1>
              <Center onClick={toggleOpenModal}>
                <IoMdClose />
              </Center>
            </Flex>
            <div className={styles.modalBody}>
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
                    // backgroundColor="lightgray"
                    // borderRadius="8px"
                    padding="1%"
                  >
                    {meeting.feedback.map((feedbackItem, index) => (
                      <Box key={index}>
                        <Text fontWeight="bold">{feedbackItem.name}:</Text>{" "}
                        <Text>
                          {feedbackItem.feedback && feedbackItem.feedback}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )}
              </Stack>
            </div>
            <Flex justify="flex-end" gap="10px" mt="3%">
              <Button colorScheme="blue" onClick={approveHandler}>
                Approve Meeting
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Model);
