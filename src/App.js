import "./App.css";
import Home from "./components/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./components/LoginPages/StudentLogin";
import MentorLogin from "./components/LoginPages/MentorLogin";
import AdminLogin from "./components/LoginPages/AdminLogin";
import AdminHome from "./components/AdminHome";
import Dashboard from "./components/Admin/pages/Dashboard";
import Mentees from "./components/Admin/pages/Mentees";
import Mentors from "./components/Admin/pages/Mentors";
import Settings from "./components/Admin/pages/Settings";
import AssignMentorsToMentees from "./components/Admin/pages/AssignMentorsToMentees";
import EditMentees from "./components/Admin/pages/EditMentees";
import EditMentors from "./components/Admin/pages/EditMentors";
import MentorDashboard from "./components/Mentor/Pages/MentorDashboard";
import MentorMentees from "./components/Mentor/Pages/MentorMentees";
import MentorEditMentees from "./components/Mentor/Pages/MentorEditMentees";
import MentorProfile from "./components/Mentor/Pages/MentorProfile";
import MentorMeetings from "./components/Mentor/Pages/MentorMeetings";
import MentorHome from "./components/MentorHome";
import StudentHome from "./components/StudentHome";
import StudentProfile from "./components/Student/Pages/StudentProfile";
import StudentMeetings from "./components/Student/Pages/StudentMeetings";
import StudentMentor from "./components/Student/Pages/StudentMentor";
import StudentDashboard from "./components/Student/Pages/StudentDashboard";
import Messages from "./components/Mentor/Pages/Messages";
import StudentMessage from "./components/Student/Pages/StudentMessage";
import Admin from "./components/Admin/pages/Admin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="student-login" element={<StudentLogin />} />
        <Route path="mentor-login" element={<MentorLogin />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminHome />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Mentees" element={<Mentees />} />
          <Route path="Mentees/:id" element={<EditMentees />} />
          <Route path="Mentors" element={<Mentors />} />
          <Route path="Mentors/:id" element={<EditMentors />} />
          <Route path="Mentor-mentee list" element={<AssignMentorsToMentees />} />
          <Route path="Profile" element={<Settings />} />
          <Route path="Admins" element={<Admin />} />
          <Route path="" element={<Navigate to="Dashboard" />} />
        </Route>
        <Route path="mentor" element={<MentorHome />}>
          <Route path="Dashboard" element={<MentorDashboard />} />
          <Route path="Mentees" element={<MentorMentees />} />
          <Route path="Mentees/:id" element={<MentorEditMentees />} />
          <Route path="Meetings" element={<MentorMeetings />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="Profile" element={<MentorProfile />} />
          <Route path="" element={<Navigate to="Dashboard" />} />
        </Route>
        <Route path="student" element={<StudentHome />}>
          <Route path="Dashboard" element={<StudentDashboard />} />
          <Route path="Mentor" element={<StudentMentor />} />
          <Route path="Meetings" element={<StudentMeetings />} />
          <Route path="Profile" element={<StudentProfile />} />
          <Route path="Mentor/Message" element={<StudentMessage />} />
          <Route path="" element={<Navigate to="Dashboard" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
