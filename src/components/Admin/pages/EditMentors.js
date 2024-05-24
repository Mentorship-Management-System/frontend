import styles from ".././Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { useNavigate } from "react-router-dom";
const dummyData = [
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
  { name: "Sanjay Das", roll: "csb20079", programme: "B-tech" },
];
const Settings = () => {
  const [showMentees, setShowMentees] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const Navigate = useNavigate();

  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };

  const handleResetPasswordClick = () => {
    setShowResetPassword(!showResetPassword);
  };

  const handleEdit = () => {
    setDisabled((prev) => !prev);
  };

  return (
    <div className={styles.cont}>
      <Box p="2% 4%">
        <div className={styles.Main}>
          <div className={styles.Header}>
            <div className={styles.box}>
              <div className={styles.banner}>
                <div className={styles.profile}>
                  <div>
                    <label htmlFor="image">
                      <div>
                        <IoCameraOutline
                          color="#4371cb"
                          className={styles.cameraIcon}
                        />
                        <img
                          style={{ cursor: "pointer" }}
                          className={styles.profileimage}
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : "https://picsum.photos/id/870/200/300?grayscale&blur=2"
                          }
                          alt=""
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      name=""
                      style={{ display: "none" }}
                      id="image"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <div className={styles.profiletxt}>
                    <h1 className={styles.profilename}>Jhon Doe</h1>
                    <h2 className={styles.profilesubtext}>
                      photo and personal details of the Mentor
                    </h2>
                  </div>
                </div>
                <Flex>
                  <Button
                    variant="outline"
                    onClick={() => setShowMentees(!showMentees)}
                  >
                    Mentee list
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      Navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </Flex>
              </div>

              <div className={styles.details}>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>User ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.username || ""}
                      onChange={(e) => console.log("Dont Touch")}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>First Name</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.username || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Last Name</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.name || ""}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Branch</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.branch || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Programme</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.programme || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Email</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.email || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Department</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.department || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Contact.No</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.contactNo || ""}
                      onChange={(e) =>
                        handleFieldChange("contactNo", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Gender</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.gender || ""}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>DOB</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.DOB || ""}
                      onChange={(e) => handleFieldChange("age", e.target.value)}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Age</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.age || ""}
                      onChange={(e) => handleFieldChange("age", e.target.value)}
                    />
                  </div>
                </Flex>
              </div>
              <div className={styles.referral}>
                <div className={styles.cnclbtn}>
                  <button onClick={handleEdit}>
                    {disabled ? "Edit" : "Cancel"}{" "}
                  </button>
                </div>
                <div className={styles.sbmtbtn}>
                  <button disabled={disabled} onClick={() => setClicked(true)}>
                    Save
                  </button>
                </div>
              </div>
              {showMentees && (
                <div className={styles.popupContainer}>
                  <div className={styles.popup}>
                    <h1 className={styles.header}>Mentee List</h1>
                    <div className={styles.content}>
                      {dummyData.map((item, index) => (
                        <div key={index} className={styles.nameRow}>
                          <span className={styles.name}>{item.name}</span>
                          <span className={styles.name}>{item.roll}</span>
                          <span className={styles.name}>{item.programme}</span>
                        </div>
                      ))}
                    </div>
                    <Flex justify="flex-end">
                      <Button onClick={() => setShowMentees(!showMentees)}>
                        Cancel
                      </Button>
                    </Flex>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Settings;