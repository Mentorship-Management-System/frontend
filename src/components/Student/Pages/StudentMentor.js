import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { get_mentor } from "../../../api/mentorApi";

const StudentMentor = () => {
  //hooks
  const student = useSelector((state) => state.studentAuth.student);
  const Navigate = useNavigate();

  //state variables
  const [mentor, setMentor] = useState({});
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  //   const [uploaded, setUploaded] = useState(0);
  //   const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [disabled, setDisabled] = useState(true);
  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
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
  //useEffect functions
  useEffect(() => {
    get_mentor(student.token, student.user.mentor_id)
      .then((result) => {
        result = result.data;
        console.log(result);
        setMentor(result.mentor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   const handleResetPasswordClick = () => {
  //     setShowResetPassword(!showResetPassword);
  //   };

  //   const handleEdit = () => {
  //     setDisabled((prev) => !prev);
  //   };

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
                              : "https://picsum.photos/id/870/200/300?grayscale&blur=2"
                          }
                          alt=""
                        />
                      </div>
                    </label>
                  </div>

                  <div className={styles.profiletxt}>
                    <h1 className={styles.profilename}>
                      {mentor.honorifics} {mentor.fname} {mentor.lname}
                    </h1>
                    <h2 className={styles.profilesubtext}>
                      Personal details of the Mentee
                    </h2>
                  </div>
                </div>
                <div className={styles.buttonDiv}>
                  {!isMobile && (
                    <Button
                      _hover={{ backgroundColor: "#0d3ffc" }}
                      backgroundColor="#0d30ac"
                      color="white"
                      onClick={() => Navigate("/student/Message")}
                    >
                      Message
                    </Button>
                  )}
                  <Button
                    className={styles.profileBtns}
                    variant="outline"
                    onClick={() => {
                      Navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
              {isMobile && (
                <Flex justify="flex-end">
                  <Button
                    className={styles.profileBtns}
                    _hover={{ backgroundColor: "#0d3ffc" }}
                    backgroundColor="#0d30ac"
                    color="white"
                    onClick={() => Navigate("/student/Message")}
                  >
                    Message
                  </Button>
                </Flex>
              )}

              <div className={styles.details}>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Mentor ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={true}
                      value={mentor.mentor_id || ""}
                      onChange={(e) => console.log("Dont Touch")}
                    />
                  </div>
                </Flex>
                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Honorifics</div>
                  <div className={styles.input1}>
                    <input
                      value={mentor.honorifics || ""}
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
                      value={mentor.fname || ""}
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
                      value={mentor.lname || ""}
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
                      value={mentor.position || ""}
                      disabled={disabled}
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
                      value={mentor.email || ""}
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
                      value={mentor.gsuite_id || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("gsuite_id", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Contact Number</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={mentor.phone || ""}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Extension</div>
                  <div className={styles.input1}>
                    <input
                      value={mentor.extension || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("extension", e.target.value)
                      }
                    />
                  </div>
                </Flex>

                <Flex className={styles.doublecontent}>
                  <div className={styles.label1}>Gender</div>
                  <div className={styles.input1}>
                    <input
                      disabled={disabled}
                      value={mentor.gender || ""}
                      onChange={(e) =>
                        handleFieldChange("gender", e.target.value)
                      }
                    />
                  </div>
                </Flex>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default StudentMentor;
