import React, { useEffect, useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
import { useSelector } from "react-redux";
import { all_students } from "../../../api/studentApi";

// Dummy data
const menteesData = [
  {
    id: 1,
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 4,
    name: "Bob Brown",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 5,
    name: "Eva Martinez",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 6,
    name: "David Lee",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 7,
    name: "Anna Wilson",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 8,
    name: "Michael Taylor",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 9,
    name: "Sophia Rodriguez",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 10,
    name: "William Anderson",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 11,
    name: "Olivia Garcia",
    image: "https://via.placeholder.com/150",
    role: "student",
  },
  {
    id: 12,
    name: "Daniel Hernandez",
    image: "https://via.placeholder.com/150",
    role: "student",
  },

  // Add more dummy data as needed
];

const Mentees = () => {
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin.user);
  const token = useSelector((state) => state.adminAuth.admin.token);
  console.log(admin);

  //state variables
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });
  const [students, setStudents] = useState([]);
  const [tableData, setTableData] = useState([]);

  //useEffect functions
  useEffect(() => {
    const fetchMentees = async () => {
      all_students(token)
        .then((result) => {
          result = result.data;
          console.log(result);
          setStudents(result.students);
          let temp_data = [];
          result.students.map((student) => {
            temp_data.push({
              id: student.student_id,
              name: student.fname + " " + student.lname,
              rollNo: student.enrollment_no,
              programme: student.programme,
              mentor: student.mentor.mentor_name,
              email: student.email,
              contact: student.phone,
            });
          });
          setTableData(temp_data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMentees();
  }, []);

  const columns = React.useMemo(
    () => [
      // Let's make a column for selection
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Roll No",
        accessor: "rollNo",
      },
      {
        Header: "Programme",
        accessor: "programme",
      },
      {
        Header: "Mentor",
        accessor: "mentor",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
      {
        Header: "Contact No",
        accessor: "contact",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        rollNo: "A001",
        programme: "B-tech",
        mentor: "Sanjib k. Deka",
        email: "john.doe@example.com",
        contact: "8090980984",
      },
      {
        id: 2,
        name: "Jane Smith",
        rollNo: "A002",
        programme: "M-tech",
        mentor: "Dr. Bhogeswar Bora",
        email: "jane.smith@example.com",
        contact: "8090980984",
      },
      // Add more dummy data as needed
    ],
    []
  );
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  return (
    <div className={styles.menteesContainer}>
      {/* Heading */}
      <Heading className={styles.header}>Mentees</Heading>

      {/* Search bars */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name..."
          className={styles.searchBar}
        />
        <input
          type="text"
          placeholder="Search by roll no..."
          className={styles.searchBar}
        />
        <Select
          placeholder="Select programme"
          onChange={(value) => handleFilterChange("branch", value)}
          className={styles.selectBar}
          w={["60%", "70%", "30%", "30%"]}
        >
          <option value="cse">B-Tech</option>
          <option value="ece">M-Tech</option>
          <option value="mech">MCA</option>
          <option value="civil">BCA</option>
          {/* Add more options for other branches */}
        </Select>
        <button className={styles.searchButton}>Search</button>
      </div>

      <div className={styles.table}>
        <TableList columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default Mentees;
