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

  const adminLogout = () => {
    dispatch(adminAuthActions.logout());
    navigate("/");
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

          <div className={classes.logout} onClick={adminLogout}>
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

export default AdminHome;
