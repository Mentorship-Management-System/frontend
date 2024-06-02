import { useState, useEffect, useContext } from "react";
import classes from "../../Mentor/Css/Profile.module.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const student = useSelector((state) => state.studentAuth.student);

  // const user = useAuth(); // Use the authentication state from the context
  const [userData, setUserData] = useState(null);
  //   const { user } = useContext(AuthContext);
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
          {student && student.user
            ? student.user.fname + " " + student.user.lname
            : ""}
        </p>
      )}
    </div>
  );
};

export default Profile;
