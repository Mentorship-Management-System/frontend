import React, { useEffect, useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Center, Flex, Heading, Select } from "@chakra-ui/react";
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
  const admin = useSelector((state) => state.adminAuth.admin);
  console.log(admin);

  //state variables
  const [filters, setFilters] = useState({
    year: "",
    programme: "",
    roll: "",
    name: "",
  });
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [tableData, setTableData] = useState([]);

  //useEffect functions
  useEffect(() => {
    const fetchMentees = async () => {
      all_students(admin.token)
        .then((result) => {
          result = result.data;
          console.log(result);
          setStudents(result.students);
          setFilteredStudents(result.students);
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
        id: "selection",
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <Center>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </Center>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <Center>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </Center>
        ),
      },
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
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleFilter = () => {
    let filteredArray = [];
    console.log(filters);
    filteredArray = students.filter((student) => {
      const fullName = `${student.fname} ${student.lname}`.toLowerCase();
      return (
        (!filters.name || fullName.includes(filters.name.toLowerCase())) &&
        (!filters.roll ||
          student.enrollment_no.includes(filters.roll.toUpperCase())) &&
        (!filters.year || student.enrollment_year == filters.year) &&
        (!filters.programme || student.programme === filters.programme)
      );
    });
    setFilteredStudents(filteredArray);

    let temp_data = [];
    filteredArray.map((student) =>
      temp_data.push({
        id: student.student_id,
        name: student.fname + " " + student.lname,
        rollNo: student.enrollment_no,
        programme: student.programme,
        email: student.email,
        contact: student.phone,
      })
    );
    setTableData(temp_data);

    // console.log(temp_data);
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
          onChange={(value) => handleFilterChange("name", value.target.value)}
        />
        <input
          type="text"
          placeholder="Search by roll no..."
          className={styles.searchBar}
          onChange={(value) => handleFilterChange("roll", value.target.value)}
        />
        <Select
          placeholder="Select programme"
          onChange={(value) =>
            handleFilterChange("programme", value.target.value)
          }
          className={styles.selectBar}
          w={["40%", "40%", "30%", "30%"]}
          flexGrow="1"
        >
          <option value="Bachelor of Technology">Bachelor of Technology</option>
          <option value="Master of Technology (CSE)">
            Master of Technology (CSE)
          </option>
          <option value="Master of Technology (IT)">
            Master of Technology (IT)
          </option>
          <option value="Master of Computer Applications">
            Master of Computer Applications
          </option>
        </Select>
        <Select
          placeholder="Enrollment Year"
          value={filters.year}
          onChange={(value) => handleFilterChange("year", value.target.value)}
          className={styles.selectBar}
          w={["40%", "40%", "30%", "30%"]}
          flexGrow="1"
        >
          {Array.from(
            { length: new Date().getFullYear() - 1999 },
            (_, i) => 2000 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <button className={styles.searchButton} onClick={handleFilter}>
          Search
        </button>
      </div>

      <div className={styles.table}>
        <TableList
          columns={columns}
          data={tableData}
          students={filteredStudents}
          admin={admin}
          setStudents={setStudents}
        />
      </div>
    </div>
  );
};

export default Mentees;
