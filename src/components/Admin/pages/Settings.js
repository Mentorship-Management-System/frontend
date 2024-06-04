import styles from ".././Css/Settings.module.scss";
import React, { useEffect, useState } from "react";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
import { get_admin, update_admin } from "../../../api/adminApi";

const Settings = () => {
  //hooks
  const admin = useSelector((state) => state.adminAuth.admin);
  const toast = useToast();

  //state variables
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    get_admin(admin.token, admin.user.admin_id)
      .then((result) => {
        result = result.data;
        console.log(result);
        setEditedUserData(result.admin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //useEffect functions
  // useEffect(() => {
  //   setEditedUserData(admin.user);
  // }, []);

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

    setLoading(true);
    update_admin(admin.token, admin.user.admin_id, updated_fields)
      .then((result) => {
        if(result.data){
          result = result.data;
          console.log(result);
          setEditedUserData(result.admin);
          toast({
            title: 'Success',
            description: "Profile updated successfully.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } else {
          console.log(result.response);
          toast({
            title: result.response.statusText,
            description: "Error updating profile.",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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
                      Update your personal details
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
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      value={editedUserData.admin_id || ""}
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
                  <div className={styles.label1}>Email</div>
                  <div className={styles.input1}>
                    <input
                      value={editedUserData.email || ""}
                      disabled={true}
                      style={{ cursor: "not-allowed" }}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
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
                  <button disabled={disabled} onClick={() => handleSaveEdit()}>
                    {loading ? <Spinner /> : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {showResetPassword && (
        <div className={styles.resetPass}>
          <ResetPassword onSubmit={handleResetPasswordClick} isStudent={false} isMentor={false} isAdmin={true} user={admin} />
        </div>
      )}
    </div>
  );
};

export default Settings;
