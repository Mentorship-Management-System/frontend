import React, { useState } from "react";
import { Select, Input, Button, Center, Heading } from "@chakra-ui/react";
import Table from "./Table";
import classes from "../Css/AssignMentorToMentees.module.scss";
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
const StudentTable = ({ students }) => {
  const [showMentors, setShowMentors] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, index) => 2015 + index
  );
  const [selectedNames, setSelectedNames] = useState([]);

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
      },
      {
        id: 2,
        name: "Jane Smith",
        rollNo: "A002",
        programme: "M-tech",
        mentor: "Dr. Bhogeswar Bora",
        email: "jane.smith@example.com",
      },
      // Add more dummy data as needed
    ],
    []
  );

  for (let i = 3; i <= 50; i++) {
    data.push({
      id: i,
      name: `Student ${i}`,
      rollNo: `R${10000 + i}`,
      programme: i % 3 === 0 ? "B.Tech" : "B.E.",
      mentor: i % 2 === 0 ? "Dr. Bhogeswar Bora" : "Sanjib k. Deka",
      email: `student${i}@example.com`,
    });
  }
  return (
    <div className={classes.header}>
      <Heading className={classes.heading}>Mentees</Heading>
      <div className={classes.searchContainer}>
        <Select
          placeholder="Select Year"
          onChange={(value) => handleFilterChange("year", value)}
          className={classes.selectBar}
          h="6vh"
          w="30%"
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
          h="6vh"
          w="30%"
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
          <Button onClick={() => setShowMentors(!showMentors)}>
            Select Mentors
          </Button>
          <div className={classes.button}>
            <Button
              variant="outline"
              border="1px solid #0d30ac"
              disabled={selectedRowKeys.length === 0}
            >
              Assign Random Numbers
            </Button>
          </div>
        </div>
        <Table columns={columns} data={data} />
      </div>
      {showMentors && (
        <div className={classes.popupContainer}>
          <div className={classes.popup}>
            <h1 className={classes.header}>Select Mentees</h1>
            <div className={classes.content}>
              {dummyData.map((item, index) => (
                <div
                  key={index}
                  className={classes.nameRow}
                  onClick={() => handleNameClick(item.name)}
                >
                  <input
                    type="checkbox"
                    checked={selectedNames.includes(item.name)}
                    readOnly
                  />
                  <span className={classes.name}>{item.name}</span>
                  <span className={classes.menteesAllocated}>
                    Mentees allocated: {item.menteesAllocated}
                  </span>
                </div>
              ))}
            </div>
            <div className={classes.footer}>
              <Button
                variant="outline"
                onClick={() => setShowMentors(!showMentors)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => console.log("Selected Names:", selectedNames)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
