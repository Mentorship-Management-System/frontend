import React, { useEffect, useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Center, Flex, Heading, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
import { useSelector } from "react-redux";
// import { all_admins } from "../../../api/mentorApi";
// Dummy data
const adminsData = [
  {
    id: 1,
    fname: "John",
    lname: "Doe",
    email: "abcd@gmail.com",
  },
  {
    id: 2,
    fname: "Jane Smith",
    lname: "Doe",
    email: "abcd@gmail.com",
  },
  {
    id: 3,
    fname: "Alice Johnson",
    lname: "Doe",
    email: "abcd@gmail.com",
  },
  {
    id: 4,
    fname: "Bob Brown",
    lname: "Doe",
    email: "abcd@gmail.com",
  },

  // Add more dummy data as needed
];

const Admin = () => {
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin.user);
  const token = useSelector((state) => state.adminAuth.admin.token);
  console.log(admin);

  //state variables
  const [mentors, setMentors] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });

  //useEffect functions
  //   useEffect(() => {
  //     const fetchMentors = () => {
  //       all_admins(token)
  //         .then((result) => {
  //           result = result.data;
  //           console.log(result);
  //           setMentors(result.admins);
  //           let temp_data = [];
  //           result.admins.map((admin) => {
  //             temp_data.push({
  //               id: admin.admin_id,
  //               name: admin.fname + " " + admin.lname,
  //               email: admin.email,
  //             });
  //           });
  //           setTableData(temp_data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     };
  //     fetchMentors();
  //   }, []);

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
        Header: "First Name",
        accessor: "fname",
      },
      {
        Header: "Last Name",
        accessor: "lname",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
    ],
    []
  );

  return (
    <div className={styles.menteesContainer}>
      {/* Heading */}
      <Heading className={styles.header}>Admins</Heading>

      <div className={styles.table}>
        <TableList columns={columns} data={adminsData} admins={adminsData} />
      </div>
    </div>
  );
};

export default Admin;
