import styles from ".././Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { get_student } from "../../../api/studentApi";
import { useSelector } from "react-redux";

const Settings = () => {
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector(state => state.adminAuth.admin.user);
  const token = useSelector(state => state.adminAuth.admin.token);
  const params = useParams();

  //state variables
  const [student, setStudent] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };

  // useEffect functions
  useEffect(() => {
    const fetchStudent = () => {
      get_student(token, params.id)
        .then(result => {
          result = result.data;
          console.log(result);
          setStudent(result.student)
          setEditedUserData(result.student)
        })
        .catch(error => {
          console.log(error);
        })
    }
    fetchStudent();
  }, [])

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
                    <h1 className={styles.profilename}>{editedUserData.fname} {editedUserData.lname}</h1>
                    <h2 className={styles.profilesubtext}>
                      Personal details of the Mentee
                    </h2>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    Navigate(-1);
                  }}
                >
                  Back
                </Button>
              </div>

              <div className={styles.details}>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.student_id || ""}
                      onChange={(e) => console.log("Dont Touch")}
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
                      value={editedUserData.lname || ""}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Enrollment Number</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.enrollment_no || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("username", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Personal Email</div>
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
                  <div className={styles.label1}>G-Suite ID</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.gsuite_id || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
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
                        handleFieldChange("email", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Contact Number</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={editedUserData.phone || ""}
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
                      value={editedUserData.dob || ""}
                      onChange={(e) => handleFieldChange("age", e.target.value)}
                    />
                  </div>
                </Flex>
                
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Mentor</div>
                  <div className={styles.input1}>
                    <input
                      disabled={true}
                      value={editedUserData.mentor && editedUserData.mentor.name || ""}
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
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
