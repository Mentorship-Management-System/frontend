import classes from "./Admin/Css/AdminDashboard.module.scss";
import { MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Profile from "./Mentor/Pages/Profile";
import Navbar from "./Navbar";
import SideBar from "./Mentor/Pages/Sidebar";
import { useDispatch } from "react-redux";
import { mentorAuthActions } from "../redux/store";
import { useEffect, useState } from "react";

function MentorHome(props) {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
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
  const handleLogOut = () => {
    dispatch(mentorAuthActions.logout());
    navigate("/");
  };
  return (
    <div>
      <div className={classes.root}>
        {isOpen && (
          <div className={classes.overlay} onClick={toggleDrawer}></div>
        )}
        <div
          className={`${classes.left} ${isMobile && classes.drawer} ${
            isOpen ? classes.open : ""
          }`}
        >
          <div className={classes.profile}>
            <Profile />
          </div>

          <div className={classes.sideBar}>
            <SideBar toggleDrawer={() => setIsOpen(false)} />
          </div>

          <div className={classes.logout}>
            <div className={classes.button} onClick={handleLogOut}>
              <div className={classes.icon}>
                <MdLogout color="#0D30AC" />
              </div>
              <div className={classes.option}>Log Out</div>
            </div>
          </div>
        </div>

        <div className={classes.right}>
          <Navbar toggleDrawer={toggleDrawer} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MentorHome;
