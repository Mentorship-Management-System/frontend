import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

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

  const handleSemesterChange = (event) => {
    setSelectedSemester(parseInt(event.target.value));
  };

  const renderForm = () => {
    if (selectedSemester === null) return null;
    const formElements = [];
    for (let i = 1; i <= selectedSemester; i++) {
      formElements.push(
        <div key={i} className={styles.semesterInputs}>
          <label>Semester {i}</label>
          <div className={styles.inputGroup}>
            <input
              type="number"
              placeholder="SGPA"
              step="0.01"
              min="0"
              max="10"
            />
            <input
              type="number"
              placeholder="CGPA"
              step="0.01"
              min="0"
              max="10"
            />
          </div>
        </div>
      );
    }
    return (
      <form>
        {formElements}
        <div className={styles.formButtons}>
          <button type="button" onClick={togglePopup}>
            Close
          </button>
          <button type="submit">Set</button>
        </div>
      </form>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                {!isMobile && (
                  <div className={styles.Reset}>
                    <Button
                      className={styles.profileBtns}
                      // _hover={{ backgroundColor: "#0d3ffc" }}
                      border="1px solid #0d30ac"
                      color="#0d30ac"
                      onClick={togglePopup}
                    >
                      Add CGPA/SGPA
                    </Button>
                    <button
                      onClick={handleResetPasswordClick}
                      className={styles.profileBtns}
                    >
                      Reset Password
                    </button>
                  </div>
                )}
              </div>
              {isMobile && (
                <Flex justify="flex-end">
                  <Button
                    className={styles.profileBtns}
                    // _hover={{ backgroundColor: "#0d3ffc" }}
                    border="1px solid #0d30ac"
                    color="#0d30ac"
                    onClick={togglePopup}
                  >
                    Add CGPA/SGPA
                  </Button>
                  <Button
                    color="white"
                    backgroundColor="#0d30ac"
                    onClick={handleResetPasswordClick}
                    className={styles.profileBtns}
                  >
                    Reset Password
                  </Button>
                </Flex>
              )}
              {isPopupOpen && (
                <div className={styles.popupOverlay}>
                  <div className={styles.popupContent}>
                    <>
                      <label>Select Semester</label>
                      <select onChange={handleSemesterChange}>
                        <option value="">--Select--</option>
                        {Array.from({ length: 12 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      {selectedSemester !== null && renderForm()}
                    </>
                  </div>
                </div>
              )}

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
