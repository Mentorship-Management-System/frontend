import React, { useEffect, useState, useRef } from "react";
import styles from "../Css/Messages.module.scss";
import { Box, Button, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import SetMeetingModal from "./SetMeetingModal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ack_reply_chat,
  get_chat_for_mentor,
  set_meeting_message,
} from "../../../api/chatApi";

const Messages = () => {
  // Hooks
  const navigate = useNavigate();
  const mentor = useSelector((state) => state.mentorAuth.mentor);
  const toast = useToast();

  // State variables
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const cardHeightRefs = useRef([]); // Array of refs for card heights
  const [meetingChat, setMeetingChat] = useState(null);

  const [replyLoading, setReplyLoading] = useState(false);
  const [replyMeetLoading, setReplyMeetLoading] = useState(false);

  // useEffect functions
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await get_chat_for_mentor(
          mentor.token,
          mentor.user.mentor_id
        );
        setMessages(result.data.chats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleSetMeeting = () => {
    setShowModal(!showModal);
  };

  const handleShowModal = (message) => {
    setShowModal(!showModal);
    setMeetingChat(message);
  };

  const handleReply = (index) => {
    setShowReply((prev) => (prev === index ? null : index));
    setReply("");
  };

  const handleSendReply = (chat) => {
    if (reply && reply !== null && reply !== undefined) {
      const payload = {
        reply,
      };

      let temp_chats = messages;
      const index = temp_chats.findIndex((obj) => obj.chat_id === chat.chat_id);
      if (index !== -1) {
        temp_chats[index].acknowledged = 1;
        temp_chats[index].reply_by_mentor = reply;
      }

      setReplyLoading(true);
      ack_reply_chat(mentor.token, payload, chat.chat_id)
        .then((result) => {
          if(result.data){
            result = result.data;
            console.log(result);
            toast({
              title: 'Success',
              description: result.message || "Reply sent successfully.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            setMessages(temp_chats);
          } else {
            console.log(result.response);
            toast({
              title: result.response.statusText,
              description: result.response.data.error || "Error sending reply.",
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
          handleReply();
          setReplyLoading(false);
        })
    } else {
      alert("Your reply message cannot be empty.");
    }
  };

  const handleSetChatMeeting = (payload) => {
    console.log(payload);
    console.log(meetingChat);

    setReplyMeetLoading(true);
    set_meeting_message(mentor.token, payload, meetingChat.chat_id)
      .then((result) => {
        if(result.data){
          result = result.data;
          // alert(result.message);
          // console.log(result.meeting);
          console.log(result);
          toast({
            title: 'Success',
            description: result.message || "Meeting scheduled successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          const index = messages.findIndex(
            (message) => message.chat_id === meetingChat.chat_id
          );
          // console.log(index);
          let temp_chats = messages;
          temp_chats[index] = {
            ...meetingChat,
            acknowledged: 1,
            meeting_id: result.meetings.find(
              (meeting) => meeting.chat_id === meetingChat.chat_id
            ).meeting_id,
          };
          setMessages(temp_chats);
        } else {
          console.log(result.response);
          toast({
            title: result.response.statusText,
            description: result.response.data.error || "Error scheduling meeting.",
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
        setShowModal(false);
        setMeetingChat(null);
        setReplyMeetLoading(false);
      })
  };

  // Calculate initial card heights (optional for improved performance)
  useEffect(() => {
    if (cardHeightRefs.current.length > 0) {
      cardHeightRefs.current.forEach((ref) => {
        if (ref) {
          ref.current.style.height = ref.current.offsetHeight + "px";
        }
      });
    }
  }, [messages]); // Update heights on message changes

  return (
    <Box p="3%" position="relative">
      <h1 className={styles.heading}>Message Information</h1>
      <div className={styles.cardList}>
        {messages?.map((message, index) => (
          <div
            key={index}
            className={styles.card}
            ref={cardHeightRefs.current[index]}
          >
            <div>
              <h2 className={styles.name}>
                {message.student.fname} {message.student.lname}
              </h2>
              <Text mt="-3" mb="3" fontSize="small">
                {message.student.enrollment_no} |{" "}
                {new Date(message.date)
                  .toISOString()
                  .replace("T", " ")
                  .slice(0, 16)}
              </Text>
              <p className={styles.message}>
                <i>
                  {message.message.slice(0, 100)}
                  {message.message.split(" ").length > 100 && (
                    <span onClick={() => handleViewMessage(message.message)}>
                      ...
                      <span className={styles.viewMore}>View</span>
                    </span>
                  )}
                </i>
              </p>
              {message.acknowledged ? (
                <p className={styles.message}>
                  {message.meeting_id === null ? (
                    <span>
                      <b>You replied -</b> <i>{message.reply_by_mentor}</i>
                    </span>
                  ) : (
                    <span>
                      <i>
                        Meeting set with{" "}
                        <b>
                          {message.student.fname} {message.student.lname} (
                          {message.student.enrollment_no})
                        </b>
                      </i>
                    </span>
                  )}
                </p>
              ) : (
                ""
              )}
            </div>
            {!message.acknowledged && (
              <div className={styles.buttons}>
                <button
                  className={styles.button1}
                  onClick={() => handleReply(index)}
                >
                  {showReply === index ? "Cancel" : "Reply"}
                </button>
                {showReply === index && (
                  <button
                    className={styles.button}
                    onClick={() => handleSendReply(message)}
                  >
                    {replyLoading ? <Spinner /> : "Send"}
                  </button>
                )}
                {showReply !== index && (
                  <button
                    className={styles.button}
                    onClick={() => handleShowModal(message)}
                  >
                    Set Meeting
                  </button>
                )}
              </div>
            )}
            {!message.acknowledged && showReply === index && (
              <Box mt="5">
                <Input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </Box>
            )}
          </div>
        ))}
      </div>
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
      {showModal && (
        <SetMeetingModal
          handelShowModal={handleShowModal}
          handleSetMeeting={handleSetMeeting}
          isChatMeeting={true}
          centerModal={true}
          meetingChat={meetingChat}
          handleSetChatMeeting={handleSetChatMeeting}
          replyMeetLoading={replyMeetLoading}
        />
      )}
    </Box>
  );
};

export default Messages;
