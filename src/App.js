import './App.css';
import Home from './components/Home';
import { Routes,Route } from 'react-router-dom';
import StudentLogin from './components/LoginPages/StudentLogin';
import MentorLogin from './components/LoginPages/MentorLogin';
import AdminLogin from './components/LoginPages/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import MentorDashboard from './components/MentorDashboard';

function App() {
  return (
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="studentlogin" element={<StudentLogin />} />
          <Route path="mentorlogin" element={<MentorLogin />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="mentor" element={<MentorDashboard />} />
        </Routes>
      </div>
  );
}

export default App;
