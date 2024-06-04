import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "../../Admin/pages/ResetPassword";
import { useSelector } from "react-redux";
import { get_mentor, update_mentor } from "../../../api/mentorApi";

const MentorProfile = () => {
  //hooks
  const mentor = useSelector((state) => state.mentorAuth.mentor);
  console.log(mentor.user);

  //state variables
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    get_mentor(mentor.token, mentor.user.mentor_id)
      .then((result) => {
        result = result.data;
        console.log(result);
        setEditedUserData(result.mentor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleSaveEdit = () => {
    let updated_fields = editedUserData;
    delete updated_fields.type;
    console.log(updated_fields);

    update_mentor(mentor.token, mentor.user.mentor_id, updated_fields)
      .then((result) => {
        result = result.data;
        console.log(result);
        setEditedUserData(result.mentor);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        handleEdit();
      });
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
                        <img
                          style={{ cursor: "pointer" }}
                          className={styles.profileimage}
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          }
                          alt=""
                        />
                      </div>
                    </label>
                  </div>

                  <div className={styles.profiletxt}>
                    <h1 className={styles.profilename}>Profile</h1>
                    <h2 className={styles.profilesubtext}>
                      Update photo and personal details
                    </h2>
                  </div>
                </div>
                <div className={styles.Reset}>
                  <button onClick={handleResetPasswordClick}>
                    Reset Password
                  </button>
                </div>
              </div>

              <div className={styles.details}>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>User ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.mentor_id || ""}
                      onChange={(e) => console.log("Dont Touch")}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Honorifics</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.honorifics || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("honorifics", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>First Name</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.fname || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("fname", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Last Name</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.lname || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("lname", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Position</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.position || ""}
                      onChange={(e) =>
                        handleFieldChange("position", e.target.value)
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
                  <div className={styles.label1}>Phone Number</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.phone || ""}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Gender</div>
                  <div className={styles.input1}>
                    <select
                      value={editedUserData.gender || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Extension Number</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.extension || ""}
                      onChange={(e) =>
                        handleFieldChange("extension", e.target.value)
                      }
                    />
                  </div>
                </Flex>
              </div>
              <Flex className={styles.switch}>
                <Text>Available Status</Text>
                <Switch
                  isChecked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  color="navy"
                />
              </Flex>
              <div className={styles.referral}>
                <div className={styles.cnclbtn}>
                  <button onClick={handleEdit}>
                    {disabled ? "Edit" : "Cancel"}{" "}
                  </button>
                </div>
                <div className={styles.sbmtbtn}>
                  <button disabled={disabled} onClick={() => handleSaveEdit()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {showResetPassword && (
        <div className={styles.resetPass}>
          <ResetPassword
            onSubmit={handleResetPasswordClick}
            isStudent={false}
            isMentor={true}
            isAdmin={false}
            user={mentor}
          />
        </div>
      )}
    </div>
  );
};

export default MentorProfile;
