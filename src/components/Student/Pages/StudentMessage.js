// StudentCardList.js
import React, { useEffect, useState } from "react";
import styles from "../Css/StudentMessage.module.scss";

import { Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  get_chat_for_student,
  send_chat_by_student,
} from "../../../api/chatApi";

const StudentMessage = () => {
  //hooks
  const student = useSelector((state) => state.studentAuth.student);
  const Navigate = useNavigate();
  const toast = useToast();

  //state variables
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  //useEffect functions
  useEffect(() => {
    get_chat_for_student(student.token, student.user.student_id)
      .then((result) => {
        result = result.data;
        console.log(result);
        setChats(result.chats);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleSend = () => {
    const payload = {
      sent_from: student.user.student_id,
      sent_to: student.user.mentor_id,
      message: message,
      date: new Date().toISOString(),
      time: new Date().toISOString(),
    };
    setLoading(true);
    send_chat_by_student(student.token, payload)
      .then((result) => {
        if(result.data){
          result = result.data;
          console.log(result);
          toast({
            title: 'Success',
            description: result.message || "Message sent successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setChats(result.chats);
        } else {
          console.log(result.response);
          toast({
            title: result.response.statusText,
            description: result.response.data.error || "Error sending message.",
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
        setShowModal(false);
        setMessage("");
      });
  };

  return (
    <Box p="3%" position="relative">
      <h1 className={styles.heading}>Messages</h1>
      <Flex className={styles.buttons}>
        <Button
          backgroundColor="#0d30ac"
          color="white"
          _hover={{ backgroundColor: "#0d31cc" }}
          className={styles.button}
          onClick={() => setShowModal(true)}
        >
          Type Message
        </Button>
        <Button className={styles.button1} onClick={() => Navigate(-1)}>
          Back
        </Button>
      </Flex>
      <div className={styles.cardList}>
        {chats.map((chat, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.message}>
              {chat.message.slice(0, 50)}
              {chat.message.split(" ").length > 50 && (
                <span onClick={() => handleViewMessage(chat.message)}>
                  ...<span className={styles.viewMore}>(View)</span>
                </span>
              )}
            </p>
            {chat.meeting_id === null && chat.reply_by_mentor === null && (
              <Box>
                <Text>
                  <b>Status:</b> <i>Message delivered.</i>
                </Text>
              </Box>
            )}
            {chat.meeting_id && (
              <Box>
                <Text>
                  <b>Status:</b>{" "}
                  <i>
                    Meeting Scheduled with Mentor. Check your upcoming meetings.
                  </i>
                </Text>
              </Box>
            )}
            {chat.meeting_id === null && chat.reply_by_mentor && (
              <Box mt="2">
                <Text>
                  <b>Reply by mentor:</b> <i>{chat.reply_by_mentor}</i>
                </Text>
              </Box>
            )}
          </div>
        ))}
        {selectedMessage && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <span className={styles.close} onClick={handleClosePopup}>
                &times;
              </span>
              <p>{selectedMessage}</p>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Type your message</h2>
            <textarea
              className={styles.textarea}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Flex justify="space-between">
              <Button
                variant="solid"
                backgroundColor="#0d30ac"
                color="white"
                onClick={handleSend}
              >
                {loading ? <Spinner /> : "Send"}
              </Button>
              <Button
                variant="outline"
                borderColor="navy"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Flex>
          </div>
        </div>
      )}
    </Box>
  );
};

export default StudentMessage;
