import classes from "./Admin/Css/AdminDashboard.module.scss";
// import Header from "../../components/header";
// import Profile from "../../components/profile";
// import SideBar from "../../components/sideBar";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
// import { signOut } from "firebase/auth";
// import { auth, db } from "../../firebase";
import { Outlet, useNavigate } from "react-router-dom";
// import {
//   AuthContext,
//   AuthProvider,
// } from "../../components/data_fetch/authProvider";
// import { collection, getDocs, query, where } from "firebase/firestore";
import { VStack } from "@chakra-ui/react";
import Profile from "./Admin/pages/Profile";
import SideBar from "./Admin/pages/Sidebar";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { adminAuthActions } from "../redux/store";

function AdminHome(props) {
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

  const adminLogout = () => {
    dispatch(adminAuthActions.logout());
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
            <div className={classes.button} onClick={adminLogout}>
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

export default AdminHome;
