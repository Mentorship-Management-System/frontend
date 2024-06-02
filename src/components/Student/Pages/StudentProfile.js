import styles from "../../Admin/Css/Settings.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "../../Admin/pages/ResetPassword";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_sgpa, save_sgpa, updated_student } from "../../../api/studentApi";
import { studentAuthActions } from "../../../redux/store";

const StudentProfile = () => {
  //hooks
  const student = useSelector((state) => state.studentAuth.student);
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(1);

  useEffect(() => {
    setEditedUserData(student.user);
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setSelectedSemester(1);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };

  const handleResetPasswordClick = () => {
    console.log("modal");
    setShowResetPassword(!showResetPassword);
  };

  const handleEdit = () => {
    setDisabled((prev) => !prev);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(parseInt(event.target.value));
  };

  const RenderForm = () => {
    // hooks
    const student = useSelector((state) => state.studentAuth.student);
    const formRef = useRef(null);

    // state variables
    const [sgpas, setSgpas] = useState([]);
    const [sgpaData, setSgpaData] = useState({});
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [initialSgpaData, setInitialSgpaData] = useState({});

    // useEffect to fetch SGPA data
    useEffect(() => {
      get_sgpa(student.token, student.user.enrollment_no)
        .then((result) => {
          result = result.data;
          console.log(result);
          setSgpas(result.sgpas);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    // useEffect to update sgpaData when sgpas change
    useEffect(() => {
      const sgpaObject = {};
      sgpas &&
        sgpas.forEach((sgpa) => {
          sgpaObject[`semester_${sgpa.semester}`] = sgpa.sgpa;
        });
      console.log(sgpaObject);
      setSgpaData(sgpaObject);
      setInitialSgpaData(sgpaObject);
    }, [sgpas]);

    // useEffect to track form changes
    useEffect(() => {
      // Convert object to string and compare with initial state
      const initialDataString = JSON.stringify(sgpaData);
      const currentDataString = JSON.stringify(initialSgpaData);
      setIsFormChanged(initialDataString !== currentDataString);
    }, [sgpaData, initialSgpaData]);

    // handleChange function to update sgpaData
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSgpaData({
        ...sgpaData,
        [name]: value,
      });
    };

    // Form submission handler
    const semesterSumbitHandler = (e) => {
      e.preventDefault();
      console.log("form handler");
      const formData = new FormData(formRef.current);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = Number(value);
      });

      const payload = Object.keys(data).map((key) => {
        const semester = key.split("_")[1];
        return {
          enrollment_no: student.user.enrollment_no,
          semester: parseInt(semester, 10),
          sgpa: data[key],
        };
      });

      console.log(payload);
      save_sgpa(student.token, payload)
        .then((result) => {
          result = result.data;
          console.log(result);
          togglePopup();
          setSgpas(payload);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Generate form elements
    const formElements = [];
    for (let i = 1; i <= selectedSemester; i++) {
      formElements.push(
        <div key={i} className={styles.semesterInputs}>
          <label>Semester {i}</label>
          <Flex>
            <input
              required
              type="number"
              placeholder="SGPA"
              step="0.01"
              min="0"
              max="10"
              name={`semester_${i}`}
              value={sgpaData[`semester_${i}`] || ""}
              onChange={handleChange}
            />
          </Flex>
        </div>
      );
    }

    return (
      <form ref={formRef} onSubmit={semesterSumbitHandler}>
        <Flex flexWrap="wrap" gap={2}>
          {formElements}
        </Flex>
        <div className={styles.formButtons}>
          <button type="button" onClick={togglePopup}>
            Close
          </button>
          <button type="submit" disabled={!isFormChanged}>
            Set
          </button>
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

  const handleSaveProfile = () => {
    let updated_fields = editedUserData;
    if (
      updated_fields.dob !== null &&
      updated_fields.dob !== undefined &&
      updated_fields.dob
    )
      updated_fields["dob"] = new Date(updated_fields["dob"]).toISOString();
    delete updated_fields.type;
    console.log(updated_fields);

    updated_student(student.token, student.user.enrollment_no, editedUserData)
      .then((result) => {
        result = result.data;
        console.log(result);
        dispatch(studentAuthActions.update({ user: editedUserData }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setClicked(true);
        handleEdit();
      });
  };
  function formatDate(date) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
                      Add SGPA
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
                    Add SGPA
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
                      <select
                        onChange={handleSemesterChange}
                        value={selectedSemester || ""}
                      >
                        {selectedSemester ? (
                          <option value={selectedSemester}>
                            {selectedSemester}
                          </option>
                        ) : (
                          <option value="">--Select--</option>
                        )}
                        {Array.from({ length: 12 }, (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      {selectedSemester !== null && <RenderForm />}
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
                    <select
                      value={editedUserData.programme || ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange("programme", e.target.value)
                      }
                    >
                      <option>Batchelor of Technology (CSE)</option>
                      <option>Master of Computer Aplication</option>
                      <option>Master of Technology (CSE)</option>
                      <option>Master of Technology (IT)</option>
                    </select>
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
                      type="date"
                      value={formatDate(editedUserData.dob)}
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
                  <button disabled={disabled} onClick={handleSaveProfile}>
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
