import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { get_sgpa, get_student } from "../../../api/studentApi";

const ProgressChart = () => {
  const mentor = useSelector((state) => state.mentorAuth.mentor);
  const params = useParams();
  const [sgpas, setSgpas] = useState([]);

  useEffect(() => {
    get_sgpa(mentor.token, params.id)
      .then((result) => {
        result = result.data;
        console.log("sgpas", result.sgpas);
        setSgpas(result.sgpas);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const teachersMeetingsData = {
    options: {
      chart: {
        type: "line",
        height: 350,
        width: "100%",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: sgpas.map((obj) => obj.semester),
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "SGPA",
        data: sgpas.map((obj) => obj.sgpa),
      },
    ],
  };

  return (
    <div>
      <Heading fontSize="1.3rem">SGPA Graph </Heading>
      <Chart
        options={teachersMeetingsData.options}
        series={teachersMeetingsData.series}
        type="line"
        height={450}
        width={teachersMeetingsData.options.width}
      />
    </div>
  );
};
const Settings = () => {
  //hooks
  const Navigate = useNavigate();
  const mentor = useSelector((state) => state.mentorAuth.mentor);
  const params = useParams();

  //state variables
  const [student, setStudent] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  //   const [uploaded, setUploaded] = useState(0);
  //   const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

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

  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };

  // useEffect functions
  useEffect(() => {
    const fetchStudent = () => {
      get_student(mentor.token, params.id)
        .then((result) => {
          result = result.data;
          console.log(result);
          setStudent(result.student);
          setEditedUserData(result.student);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchStudent();
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
                              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          }
                          alt=""
                        />
                      </div>
                    </label>
                  </div>

                  <div className={styles.profiletxt}>
                    <h1 className={styles.profilename}>
                      {editedUserData.fname + " " + editedUserData.lname}
                    </h1>
                    <h2 className={styles.profilesubtext}>
                      Personal details of the Mentee
                    </h2>
                  </div>
                </div>
                <div className={styles.buttonDiv}>
                  {!isMobile && (
                    <Flex>
                      {/* <Button
                        _hover={{ backgroundColor: "#03ac" }}
                        backgroundColor="#03ac"
                        color="white"
                        onClick={() => setShowTranscript(!showTranscript)}
                      >
                        View Transcript
                      </Button> */}
                      <Button
                        // _hover={{ backgroundColor: "#0d3ffc" }}
                        border="1px solid #03ac"
                        color="#03ac"
                        onClick={() => setShowGraph(!showGraph)}
                      >
                        View Progress
                      </Button>
                    </Flex>
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
                    // _hover={{ backgroundColor: "#0d3ffc" }}
                    border="1px solid #0d30ac"
                    color="#0d30ac"
                    onClick={() => setShowGraph(!showGraph)}
                  >
                    View Progress
                  </Button>
                </Flex>
              )}

              {showGraph ? (
                <ProgressChart className={styles.chartItem} />
              ) : (
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
                        value={editedUserData.lname || ""}
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
                        value={editedUserData.enrollment_no || ""}
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
                          handleFieldChange("gsuite_id", e.target.value)
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
                    <div className={styles.label1}>CGPA</div>
                    <div className={styles.input1}>
                      <input
                        disabled={disabled}
                        value={editedUserData.cgpa || ""}
                        onChange={(e) =>
                          handleFieldChange("cgpa", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                  <Flex className={styles.doublecontent}>
                    <div className={styles.label1}>DOB</div>
                    <div className={styles.input1}>
                      <input
                        disabled={disabled}
                        value={editedUserData.dob && editedUserData.dob.split("T")[0] || ""}
                        onChange={(e) =>
                          handleFieldChange("dob", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                </div>
              )}
            </div>
            {/* {showTranscript && <></>} */}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Settings;
