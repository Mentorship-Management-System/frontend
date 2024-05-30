import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "../../Admin/pages/ResetPassword";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  //hooks
  const student = useSelector(state => state.studentAuth.student);
  const Navigate = useNavigate();

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
                    <h1 className={styles.profilename}>Profile</h1>
                    <h2 className={styles.profilesubtext}>
                      Update your photo and personal details
                    </h2>
                  </div>
                </div>
                <div className={styles.Reset}>
                  <button onClick={handleResetPasswordClick}>
                    RESET PASSWORD
                  </button>
                </div>
              </div>

              <div className={styles.details}>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={student.user.student_id || ""}
                      onChange={(e) => console.log("Dont Touch")}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>First Name</div>
                  <div className={styles.input1}>
                    <input
                      value={student.user.fname || ""}
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
                      disabled={disabled}
                      value={student.user.lname || ""}
                      onChange={(e) =>
                        handleFieldChange("lname", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Enrollment Number</div>
                  <div className={styles.input1}>
                    <input
                      value={student.user.enrollment_no || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("enrollment_no", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Personal Email</div>
                  <div className={styles.input1}>
                    <input
                      value={student.user.email || ""}
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
                      value={student.user.gsuite_id || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("gsuite_id", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Programme</div>
                  <div className={styles.input1}>
                    <input
                      value={student.user.programme || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("programme", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Contact Number</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={student.user.phone || ""}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Gender</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={student.user.gender || ""}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>CGPA</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={student.user.cgpa || ""}
                      onChange={(e) => handleFieldChange("cgpa", e.target.value)}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>DOB</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={student.user.dob || ""}
                      onChange={(e) => handleFieldChange("dob", e.target.value)}
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
      {showResetPassword && (
        <div className={styles.resetPass}>
          <ResetPassword onSubmit={handleResetPasswordClick} />
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
