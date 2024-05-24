import classes from "./Admin/Css/AdminDashboard.module.scss";
import { MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Profile from "./Student/Pages/Profile";
import Navbar from "./Navbar";
import SideBar from "./Student/Pages/Sidebar";

function MentorHome(props) {
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

          <div className={classes.logout}>
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