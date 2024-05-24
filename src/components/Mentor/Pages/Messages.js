// StudentCardList.js
import React, { useState } from "react";
import styles from "../Css/Messages.module.scss";
import { Box } from "@chakra-ui/react";
import SetMeetingModal from "./SetMeetingModal";

const students = [
  {
    name: "John Doe",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis quam ac felis tristique, non tempor nulla viverra. Proin euismod suscipit nulla, vel fringilla libero lacinia ut. Praesent ullamcorper malesuada turpis, eget pellentesque ex. Aliquam erat volutpat. Cras luctus magna nec turpis facilisis, eget fermentum est hendrerit. Suspendisse potenti. Aenean at diam magna. Curabitur consectetur malesuada justo, a vestibulum ligula. Proin elementum enim sit amet sapien tincidunt, vel vestibulum lorem tincidunt. Integer eget nunc tellus. Donec et aliquam ex, vitae tincidunt libero. Suspendisse scelerisque, dui et ullamcorper tristique, sapien turpis luctus eros, ut scelerisque neque metus vel nunc. Mauris ut erat libero. Nulla facilisi. Fusce malesuada, sapien at vestibulum pharetra, eros lorem vestibulum lorem, et pulvinar erat nunc in ex.",
  },
  {
    name: "Jane Smith",
    message: "Short message for testing purposes.",
  },
  {
    name: "Alice Johnson",
    message:
      "This is a longer message that will be cut off if it exceeds the limit of one hundred words. We want to ensure that only the first part of the message is shown on the card, and the rest is displayed when the user clicks on the view button. This is useful for keeping the card design clean and uncluttered while still allowing access to the full content when needed. Let's add more text to reach the limit. Here we go, adding some more words to make sure we hit the one hundred words mark. This should be enough now.",
  },
  {
    name: "Bob Brown",
    message:
      "Another student message to display in the card. This one is not too long, but it still needs to be shown properly.",
  },
  {
    name: "Carol White",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur convallis tincidunt est, a auctor neque congue vel. Sed nec ex et erat fringilla fermentum. Nulla facilisi. Cras eget libero ut justo tincidunt congue. Vivamus sollicitudin elit vel nunc cursus, vitae venenatis nulla blandit. Aliquam erat volutpat. Vestibulum ac sapien sit amet metus vehicula facilisis non id risus. Ut auctor, urna non cursus varius, lorem lectus faucibus felis, sit amet laoreet sapien quam non purus. In dapibus sem at tortor ullamcorper, sed elementum nunc consectetur. Suspendisse potenti. Sed interdum velit ac nisi egestas, a efficitur arcu hendrerit. Integer sagittis magna et nulla posuere venenatis. Sed euismod semper lacus, eu facilisis lorem ornare sit amet. Proin at justo et orci lacinia fermentum.",
  },
  {
    name: "David Black",
    message:
      "Short message again to ensure we have a mix of long and short messages in our test data.",
  },
  {
    name: "Eva Green",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempor, lorem ac dignissim sagittis, mi elit laoreet purus, vel viverra nisl lacus ut ex. Aliquam erat volutpat. Pellentesque at enim vitae ligula feugiat pellentesque. Maecenas a magna ut sapien bibendum venenatis non a sapien. Sed vehicula, metus a egestas convallis, justo erat vestibulum nisl, in mollis sapien leo ac nisi. Nam nec nulla et eros cursus vulputate ac nec arcu. Proin pharetra ex ut massa consectetur tempor. Nullam imperdiet pharetra lorem, eu consequat nunc. Vivamus bibendum, nisl ac tincidunt elementum, lacus velit accumsan erat, vel posuere sapien orci vel nisl. Pellentesque porttitor, leo id interdum hendrerit, sapien nulla hendrerit leo, ac tincidunt nisl lorem eget tortor. Duis dignissim, purus nec convallis dignissim, justo nunc congue risus, sit amet vehicula libero magna at lectus.",
  },
  {
    name: "Frank Blue",
    message:
      "This is another example of a longer message that will be truncated at one hundred words. The rest of the message will be visible once the user clicks on the view button. This is a useful feature to keep the initial card uncluttered while still providing access to the full content when necessary. We continue to add words to reach the hundred word limit. This should be just about enough to hit the mark, providing a good test case for our component.",
  },
  {
    name: "Grace Purple",
    message:
      "Another short message to ensure our component handles both long and short messages properly.",
  },
  {
    name: "Hank Red",
    message:
      "Here is a message that is exactly one hundred words long. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies, sit amet ullamcorper nunc dictum. Praesent ac nibh vestibulum, mollis sapien vel, luctus turpis. Integer tincidunt purus nec erat bibendum, in sollicitudin tortor placerat. Suspendisse interdum justo lectus, et sollicitudin ipsum imperdiet ut. Cras vitae auctor nisi. Praesent ac lacus ut augue ultricies venenatis. Sed quis ligula eget nisi hendrerit condimentum. Proin at ante at risus ullamcorper fermentum.",
  },
];

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleSetMeeting = () => {
    setShowModal(!showModal);
  };

  const handelShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Box p="3%" position="relative">
      <h1 className={styles.heading}>Message Information</h1>
      <div className={styles.cardList}>
        {students.map((student, index) => (
          <div key={index} className={styles.card}>
            <div>
              <h2 className={styles.name}>{student.name}</h2>
              <p className={styles.message}>
                {student.message.slice(0, 100)}
                {student.message.split(" ").length > 100 && (
                  <span onClick={() => handleViewMessage(student.message)}>
                    ...<span className={styles.viewMore}>View</span>
                  </span>
                )}
              </p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.button1}>Acknowledge</button>
              <button className={styles.button} onClick={handelShowModal}>
                Set Meeting
              </button>
            </div>
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
        <SetMeetingModal
          handelShowModal={handelShowModal}
          handleSetMeeting={handleSetMeeting}
        />
      )}
    </Box>
  );
};

export default Messages;
