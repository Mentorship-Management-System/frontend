import classes from "../Css/Sidebar.module.scss";
import { MdSpaceDashboard, MdChatBubble } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiRun, BiMessageAdd } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SideBar = ({ toggleDrawer, handleOptionClick }) => {
  const location = useLocation();
  const segments = location.pathname.split("/");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

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

  //Array of items
  const sidebarItems = [
    {
      icon: (
        <MdSpaceDashboard
          size={25}
          color={segments[2] === "Dashboard" && "#0D30AC"}
        />
      ),
      text: "Dashboard",
    },
    {
      icon: (
        <FaUserGroup size={25} color={segments[2] === "Mentees" && "#0D30AC"} />
      ),
      text: "Mentees",
    },
    {
      icon: <BiRun size={25} color={segments[2] === "Mentors" && "#0D30AC"} />,
      text: "Mentors",
    },
    {
      icon: (
        <BiMessageAdd
          size={25}
          color={segments[2] === "Mentor-mentee%20list" && "#0D30AC"}
        />
      ),
      text: "Mentor-mentee list",
    },
    {
      icon: (
        <BiMessageAdd
          size={25}
          color={segments[2] === "Passout-mentee%20list" && "#0D30AC"}
        />
      ),
      text: "Passout-mentee list",
    },
    {
      icon: (
        <IoMdSettings
          size={25}
          color={segments[2] === "Profile" && "#0D30AC"}
        />
      ),
      text: "Profile",
    },
  ];
  console.log(segments[2].includes("Passout-mentee"));
  return (
    <div className={classes.rootSidebar}>
      <div className={classes.sidebar}>
        {sidebarItems.map((item, index) => (
          <Link
            to={`/admin/${item.text}`}
            onClick={toggleDrawer}
            key={index}
            className={
              segments[2] === item.text ||
              segments[2].slice(0, -7) === item.text.slice(0, -5)
                ? classes.selectedOption
                : ""
            }
          >
            <div className={classes.icon}>{item.icon}</div>

            <div className={classes.option}>
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
