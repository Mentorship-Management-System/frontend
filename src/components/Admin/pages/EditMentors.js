import styles from "../Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
// import ResetPassword from "./resetPassword";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { get_mentor, update_mentor } from "../../../api/mentorApi";
import { get_students_by_mentor_id } from "../../../api/studentApi";
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
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin);
  const params = useParams();

  //state variables
  const [showMentees, setShowMentees] = useState(false);
  const [students, setStudents] = useState([]);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  //useEffect functions
  useEffect(() => {
    const fetchMentor = () => {
      get_mentor(admin.token, params.id)
        .then((result) => {
          result = result.data;
          console.log(result);
          setEditedUserData(result.mentor);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMentor();
  }, []);

  useEffect(() => {
    const fetchStudents = () => {
      get_students_by_mentor_id(admin.token, params.id)
        .then((result) => {
          result = result.data;
          console.log(result);
          setStudents(result.students);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchStudents();
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
    console.log(updated_fields);

    update_mentor(admin.token, params.id, updated_fields)
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
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          }
                          alt=""
                        />
                      </div>
                    </label>
                  </div>

                  <div className={styles.profiletxt}>
                    <h1 className={styles.profilename}>
                      {editedUserData.honorifics +
                        " " +
                        editedUserData.fname +
                        " " +
                        editedUserData.lname}
                    </h1>
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
                  <div className={styles.label1}>Mentor ID</div>
                  <div className={styles.input1}>
                    <input
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
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
                      disabled={disabled}
                      value={editedUserData.lname || ""}
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
                      value={editedUserData.position || ""}
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
                  <div className={styles.label1}>Extension</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.extension || ""}
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
              </div>
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
              {showMentees && (
                <div className={styles.popupContainer}>
                  <div className={styles.popup}>
                    <h1 className={styles.header}>Mentee List</h1>
                    <div className={styles.content}>
                      {students && students.length > 0
                        ? students.map((item, index) => (
                            <div
                              key={index}
                              className={styles.nameRow}
                              onClick={() =>
                                Navigate(`/admin/Mentees/${item.enrollment_no}`)
                              }
                            >
                              <span>{item.student_id}</span>
                              <span className={styles.name}>
                                {item.fname} {item.lname}
                              </span>
                              <span>{item.enrollment_no}</span>
                            </div>
                          ))
                        : "No Mentees assigned"}
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
