import classes from "./Admin/Css/AdminDashboard.module.scss";
import { MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Profile from "./Mentor/Pages/Profile";
import Navbar from "./Navbar";
import SideBar from "./Mentor/Pages/Sidebar";
import { useDispatch } from "react-redux";
import { mentorAuthActions } from "../redux/store";

function MentorHome(props) {
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(mentorAuthActions.logout());
    navigate("/")
  }
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.left}>
          <div className={classes.profile}>
            {/* <AuthProvider> */}
            <Profile />
            {/* </AuthProvider> */}
          </div>

          <div className={classes.sideBar}>
            <SideBar />
          </div>

          <div className={classes.logout} onClick={handleLogOut}>
            <div className={classes.button}>
              <div className={classes.icon}>
                <MdLogout size={35} color="#0D30AC" />
              </div>
              <div className={classes.option}>
                <span>Log Out</span>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.right}>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MentorHome;
