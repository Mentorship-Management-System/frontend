import { useState, useEffect, useContext } from "react";
// import {
//   onSnapshot,
//   query,
//   collection,
//   where,
//   doc,
//   getDoc,
//   getDocs,
// } from "firebase/firestore";
// import { AuthContext, useAuth } from "../components/data_fetch/authProvider"; // Import the AuthProvider
// import { db } from "../firebase";
import classes from "../Css/Profile.module.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  //hooks
  const admin = useSelector((state) => state.adminAuth.admin);

  //state variables
  const [userData, setUserData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  //   console.log(userData);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";

  return (
    <div className={classes.rootProfile}>
      <div className={classes.userPicture}>
        <img
          src={userData ? userData.profileImageURL : defaultImage}
          alt="profile"
        ></img>
      </div>
      {!isMobile && (
        <p className={classes.name}>
          {admin && admin.user
            ? admin.user.fname + " " + admin.user.lname
            : "Jhon Doe"}
        </p>
      )}
    </div>
  );
};

export default Profile;
