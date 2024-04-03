import { useState, useEffect, useContext } from "react";
import classes from "../Css/Profile.module.scss";

const Profile = () => {
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
    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

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
          {userData ? userData.username : "Jhon Doe"}
        </p>
      )}
    </div>
  );
};

export default Profile;
