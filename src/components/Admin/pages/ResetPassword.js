import { useState } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import styles from ".././Css/ResetPassword.module.scss";
import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { student_login } from "../../../api/studentApi";
import { useSelector } from "react-redux";
import { admin_login, reset_password } from "../../../api/adminApi";
import { mentor_login } from "../../../api/mentorApi";

const ResetPassword = ({ onSubmit, isStudent, isMentor, isAdmin, user }) => {
  //hooks
  const student = useSelector(state => state.studentAuth.student);
  console.log(student);

  //state variables
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReenteredPassword, setShowReenteredPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPassword = async () => {
    if(newPassword !== reenteredPassword){
      alert("New password does not match!")
    } else {
      if(isStudent){
        const payload = {
          tezu_email: user.user.gsuite_id,
          password: currentPassword
        }
        student_login(payload)
          .then(result => {
            if(result && result.data && result.data.success){
              // console.log(student);
              let creds = {email: payload.tezu_email, newPassword}
              reset_password(user.token, creds)
                .then(response => {
                  response = response.data;
                  console.log(response);
                  alert(response.message);
                  onSubmit();
                })
                .catch(err => {
                  console.log(err);
                })
              console.log(creds);
            } else {
              alert("Current password does not match!");
            }
          })
          .catch(error => {
            console.log(error);
          })
      } else if (isMentor) {
        console.log("reset mentor");
        const payload = {
          email: user.user.email,
          password: currentPassword
        }
        mentor_login(payload)
          .then(result => {
            if(result && result.data && result.data.success){
              // console.log(student);
              let creds = {email: payload.email, newPassword}
              reset_password(user.token, creds)
                .then(response => {
                  response = response.data;
                  console.log(response);
                  alert(response.message);
                  onSubmit();
                })
                .catch(err => {
                  console.log(err);
                })
              console.log(creds);
            } else {
              alert("Current password does not match!");
            }
          })
          .catch(error => {
            console.log(error);
          })
      } else if (isAdmin) {
        console.log("reset admin");
        const payload = {
          email: user.user.email,
          password: currentPassword
        }
        admin_login(payload)
          .then(result => {
            if(result && result.data && result.data.success){
              // console.log(student);
              let creds = {email: payload.email, newPassword}
              reset_password(user.token, creds)
                .then(response => {
                  response = response.data;
                  console.log(response);
                  alert(response.message);
                  onSubmit();
                })
                .catch(err => {
                  console.log(err);
                })
              console.log(creds);
            } else {
              alert("Current password does not match!");
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className={styles.container}
    >
      <Center>
        <RxCross1 className={styles.cancelIcon} onClick={onSubmit} />
      </Center>
      <div>
        <h1>Reset Password</h1>
      </div>

      <h2>Enter current password</h2>
      <div className={styles.inputBox}>
        <input
          type={showCurrentPassword ? "text" : "password"}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {showCurrentPassword ? (
          <IoEyeOutline
            className={styles.EyeIcon}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className={styles.EyeIcon}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        )}
      </div>
      <h2>Enter new password</h2>
      <div className={styles.inputBox}>
        <input
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {showNewPassword ? (
          <IoEyeOutline
            className={styles.EyeIcon}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className={styles.EyeIcon}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        )}
      </div>
      <h2>Re-enter new password</h2>
      <div className={styles.inputBox}>
        <input
          type={showReenteredPassword ? "text" : "password"}
          value={reenteredPassword}
          onChange={(e) => setReenteredPassword(e.target.value)}
        />
        {showReenteredPassword ? (
          <IoEyeOutline
            className={styles.EyeIcon}
            onClick={() => setShowReenteredPassword(!showReenteredPassword)}
          />
        ) : (
          <IoEyeOffOutline
            className={styles.EyeIcon}
            onClick={() => setShowReenteredPassword(!showReenteredPassword)}
          />
        )}
      </div>
      <div className={styles.submitBtn}>
        <button onClick={handleResetPassword}> Submit</button>
      </div>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </motion.div>
  );
};

export default ResetPassword;
