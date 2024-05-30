// StudentCardList.js
import React, { useState } from "react";
import styles from "../Css/StudentMessage.module.scss";

import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const students = [
  {
    status: "Acknowledged",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis quam ac felis tristique, non tempor nulla viverra. Proin euismod suscipit nulla, vel fringilla libero lacinia ut. Praesent ullamcorper malesuada turpis, eget pellentesque ex. Aliquam erat volutpat. Cras luctus magna nec turpis facilisis, eget fermentum est hendrerit. Suspendisse potenti. Aenean at diam magna. Curabitur consectetur malesuada justo, a vestibulum ligula. Proin elementum enim sit amet sapien tincidunt, vel vestibulum lorem tincidunt. Integer eget nunc tellus. Donec et aliquam ex, vitae tincidunt libero. Suspendisse scelerisque, dui et ullamcorper tristique, sapien turpis luctus eros, ut scelerisque neque metus vel nunc. Mauris ut erat libero. Nulla facilisi. Fusce malesuada, sapien at vestibulum pharetra, eros lorem vestibulum lorem, et pulvinar erat nunc in ex.",
  },
  {
    status: "meeting scheduled",
    message: "Short message for testing purposes.",
  },
  {
    status: "meeting scheduled",
    message:
      "This is a longer message that will be cut off if it exceeds the limit of one hundred words. We want to ensure that only the first part of the message is shown on the card, and the rest is displayed when the user clicks on the view button. This is useful for keeping the card design clean and uncluttered while still allowing access to the full content when needed. Let's add more text to reach the limit. Here we go, adding some more words to make sure we hit the one hundred words mark. This should be enough now.",
  },
];

const StudentMessage = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleSend = () => {
    console.log("Message:", message);
    setShowModal(false);
    setMessage("");
  };

  return (
    <Box p="3%" position="relative">
      <h1 className={styles.heading}>Message Information</h1>
      <Flex className={styles.buttons}>
        <Button className={styles.button} onClick={() => setShowModal(true)}>
          Type Message
        </Button>
        <Button className={styles.button1} onClick={() => Navigate(-1)}>
          Back
        </Button>
      </Flex>
      <div className={styles.cardList}>
        {students.map((student, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.message}>
              {student.message.slice(0, 100)}
              {student.message.split(" ").length > 100 && (
                <span onClick={() => handleViewMessage(student.message)}>
                  ...<span className={styles.viewMore}>View</span>
                </span>
              )}
            </p>
            <h2 className={styles.name}>
              <span>Status:</span> {student.status}
            </h2>
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
              <button className={styles.button} onClick={handleSend}>
                Send
              </button>
              <button
                className={`${styles.button} ${styles.closeButton}`}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </Flex>
          </div>
        </div>
      )}
    </Box>
  );
};

export default StudentMessage;
