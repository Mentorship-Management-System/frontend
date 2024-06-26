import classes from "../../Admin/Css/Sidebar.module.scss";
import { MdSpaceDashboard, MdChatBubble } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiRun, BiMessageAdd } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const SideBar = ({ toggleDrawer, handleOptionClick }) => {
  const location = useLocation();
  const segments = location.pathname.split("/");

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
      icon: <BiRun size={25} color={segments[2] === "Meetings" && "#0D30AC"} />,
      text: "Meetings",
    },
    {
      icon: (
        <BiMessageAdd
          size={25}
          color={segments[2] === "Messges" && "#0D30AC"}
        />
      ),
      text: "Messages",
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

  return (
    <div className={classes.rootSidebar}>
      <div className={classes.sidebar}>
        {sidebarItems.map((item, index) => (
          <Link
            to={`/mentor/${item.text}`}
            onClick={toggleDrawer}
            key={index}
            className={segments[2] === item.text ? classes.selectedOption : ""}
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
