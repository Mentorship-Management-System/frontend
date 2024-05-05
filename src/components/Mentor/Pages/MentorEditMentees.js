import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

const ProgressChart = () => {
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
        categories: [
          "1st Sem",
          "2st Sem",
          "3st Sem",
          "4st Sem",
          "5st Sem",
          "6st Sem",
          "7st Sem",
        ],
      },
      colors: ["#26B7ED"],
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        name: "CGPA",
        data: [8.1, 7.5, 7.7, 7.5, 7.6, 7.8, 8],
      },
      {
        name: "SGPA",
        data: [8.1, 7.6, 8.4, 6.9, 7.8, 7.8, 8.6],
      },
    ],
  };

  return (
    <div>
      <Heading fontSize="1.3rem">CGPA/SGPA Graph </Heading>
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
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  //   const [uploaded, setUploaded] = useState(0);
  //   const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const Navigate = useNavigate();
  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };

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
                    <h1 className={styles.profilename}>Mike Daniel</h1>
                    <h2 className={styles.profilesubtext}>
                      Photo and personal details of the Mentee
                    </h2>
                  </div>
                </div>
                <div className={styles.buttonDiv}>
                  <Button
                    _hover={{ backgroundColor: "#0d3ffc" }}
                    backgroundColor="#0d30ac"
                    color="white"
                  >
                    Message
                  </Button>
                  <Button
                    // _hover={{ backgroundColor: "#0d3ffc" }}
                    border="1px solid #0d30ac"
                    color="#0d30ac"
                    onClick={() => setShowGraph(!showGraph)}
                  >
                    View Progress
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      Navigate(-1);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>

              {showGraph ? (
                <ProgressChart className={styles.chartItem} />
              ) : (
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
                    <div className={styles.label1}>Role</div>
                    <div className={styles.input1}>
                      <input
                        value={editedUserData.role || ""}
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
                        onChange={(e) =>
                          handleFieldChange("age", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                  <Flex className={styles.doublecontent}>
                    <div className={styles.label1}>Age</div>
                    <div className={styles.input1}>
                      <input
                        disabled={disabled}
                        value={editedUserData.age || ""}
                        onChange={(e) =>
                          handleFieldChange("age", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
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
