import React, { useEffect, useState } from "react";
import {
  Select,
  Input,
  Button,
  Center,
  Heading,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import Table from "./Table";
import classes from "../Css/AssignMentorToMentees.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { all_students } from "../../../api/studentApi";
import { all_mentors } from "../../../api/mentorApi";
const dummyData = [
  { name: "Dr. Bhogeswar Bora", menteesAllocated: 2 },
  { name: "Dr. Sanjib k. Deka", menteesAllocated: 3 },
  { name: "Dr. Rosy Sharma", menteesAllocated: 1 },
  { name: "Dr. Nityananda Sharma", menteesAllocated: 4 },
  { name: "Dr. Navajroti Medhi", menteesAllocated: 2 },
  { name: "Dr. Utpal Sharma", menteesAllocated: 3 },
  { name: "Dr. Bhogeswar Bora", menteesAllocated: 2 },
  { name: "Dr. Sanjib k. Deka", menteesAllocated: 3 },
  { name: "Dr. Rosy Sharma", menteesAllocated: 1 },
  { name: "Dr. Nityananda Sharma", menteesAllocated: 4 },
  { name: "Dr. Navajroti Medhi", menteesAllocated: 2 },
  { name: "Dr. Utpal Sharma", menteesAllocated: 3 },
  { name: "Dr. Bhogeswar Bora", menteesAllocated: 2 },
  { name: "Dr. Sanjib k. Deka", menteesAllocated: 3 },
  { name: "Dr. Rosy Sharma", menteesAllocated: 1 },
  { name: "Dr. Nityananda Sharma", menteesAllocated: 4 },
];
const PassoutMenteeList = ({ students }) => {
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin);

  //state variables
  const [tableData, setTableData] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [showMentors, setShowMentors] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [selectedNames, setSelectedNames] = useState([]);

  //useEffect functions

  useEffect(() => {
    const fetchData = () => {
      all_students(admin.token)
        .then((result) => {
          result = result.data;
          console.log(result);
          let temp_data = [];
          result.students.map((student) => {
            temp_data.push({
              id: student.student_id,
              name: student.fname + " " + student.lname,
              rollNo: student.enrollment_no,
              programme: student.programme,
              mentor: student.mentor.mentor_name,
              email: student.email,
              enrollment_year: student.enrollment_year,
            });
          });
          setTableData(temp_data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMentors = () => {
      all_mentors(admin.token)
        .then((result) => {
          result = result.data;
          console.log(result);
          setMentors(result.mentors);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchMentors();
  }, []);

  const handleNameClick = (name) => {
    if (selectedNames.includes(name)) {
      setSelectedNames(selectedNames.filter((selected) => selected !== name));
    } else {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    const filteredData = students.filter(
      (student) =>
        student.year === filters.year &&
        student.branch === filters.branch &&
        student.name.toLowerCase().includes(filters.searchText.toLowerCase())
    );
    setFilteredStudents(filteredData);
    setPagination({ ...pagination, current: 1 });
  };

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
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Enrollment No",
        accessor: "rollNo",
      },
      {
        Header: "Programme",
        accessor: "programme",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
      {
        Header: "Enrollment Year",
        accessor: "enrollment_year",
      },
      {
        Header: "Mentor",
        accessor: "mentor",
      },
    ],
    []
  );

  const handleDeleteMentees = () => {};

  return (
    <div className={classes.header}>
      <Heading className={classes.heading}>Mentees</Heading>
      <div className={classes.searchContainer}>
        <Select
          placeholder="Select Year"
          onChange={(value) => handleFilterChange("year", value)}
          className={classes.selectBar}
          // h="6vh"
          // w="30%"
          w={["46%", "50%", "30%", "30%"]}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Select programme"
          onChange={(value) => handleFilterChange("branch", value)}
          className={classes.selectBar}
          // h="6vh"
          // w="30%"
          w={["46%", "50%", "30%", "30%"]}
        >
          <option value="cse">B-Tech</option>
          <option value="ece">M-Tech</option>
          <option value="mech">MCA</option>
          <option value="civil">BCA</option>
          {/* Add more options for other branches */}
        </Select>
        <input
          type="text"
          placeholder="Search by Roll No..."
          className={classes.searchBar}
        />
        <button className={classes.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={classes.table}>
        <div className={classes.buttons}>
          <div className={classes.button}>
            <Button
              variant="outline"
              border="1px solid #0d30ac"
              // disabled={selectedRowKeys.length === 0}
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Mentees
            </Button>
          </div>
          {showDeletePopup && (
            <Box className={classes.editPopup}>
              <Text>Are you sure?</Text>
              <Text>You can't undo this afterwards</Text>
              <Flex justify="flex-end" align="center">
                <Button
                  variant="outline"
                  onClick={() => setShowDeletePopup(false)}
                >
                  No
                </Button>
                <Button colorScheme="facebook" onClick={handleDeleteMentees}>
                  Confirm
                </Button>
              </Flex>
            </Box>
          )}
        </div>
        <Table columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default PassoutMenteeList;
