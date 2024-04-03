import React, { useState } from "react";
import { Select, Input, Button, Center, Heading } from "@chakra-ui/react";
import Table from "./Table";
import classes from "../Css/AssignMentorToMentees.module.scss";
const StudentTable = ({ students }) => {
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });
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
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Programme",
        accessor: "programme",
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
        branch: "Computer Science",
        programme: "Bachelor",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        name: "Jane Smith",
        rollNo: "A002",
        branch: "Electrical Engineering",
        programme: "Master",
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
      branch: i % 2 === 0 ? "Computer Science" : "Electrical Engineering",
      programme: i % 3 === 0 ? "B.Tech" : "B.E.",
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
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </Select>
        <Select
          placeholder="Select Branch"
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
          placeholder="Search by ID..."
          className={classes.searchBar}
        />
        <button className={classes.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={classes.table}>
        <div className={classes.button}>
          <Button
            variant="outline"
            border="1px solid #0d30ac"
            disabled={selectedRowKeys.length === 0}
          >
            Assign Random Numbers
          </Button>
        </div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default StudentTable;
