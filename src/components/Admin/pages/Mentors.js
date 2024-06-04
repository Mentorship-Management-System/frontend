import React, { useEffect, useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Center, Flex, Heading, Select, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
import { useSelector } from "react-redux";
import { all_mentors } from "../../../api/mentorApi";
// Dummy data
const menteesData = [
  {
    id: 1,
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 3,
    name: "Alice Johnson",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 4,
    name: "Bob Brown",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 5,
    name: "Eva Martinez",
    image: "https://via.placeholder.com/150",
    role: "Ass. Professor",
  },
  {
    id: 6,
    name: "David Lee",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 7,
    name: "Anna Wilson",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 8,
    name: "Michael Taylor",
    image: "https://via.placeholder.com/150",
    role: "Ass. Professor",
  },
  {
    id: 9,
    name: "Sophia Rodriguez",
    image: "https://via.placeholder.com/150",
    role: "Ass. Professor",
  },
  {
    id: 10,
    name: "William Anderson",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },
  {
    id: 11,
    name: "Olivia Garcia",
    image: "https://via.placeholder.com/150",
    role: "Ass. Professor",
  },
  {
    id: 12,
    name: "Daniel Hernandez",
    image: "https://via.placeholder.com/150",
    role: "Professor",
  },

  // Add more dummy data as needed
];

const Mentors = () => {
  //hooks
  const Navigate = useNavigate();
  const admin = useSelector((state) => state.adminAuth.admin);

  //state variables
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    title: "",
    id: "",
  });

  //useEffect functions
  useEffect(() => {
    const fetchMentors = () => {
      setLoading(true);
      all_mentors(admin.token)
        .then((result) => {
          result = result.data;
          console.log(result);
          setMentors(result.mentors);
          setFilteredMentors(result.mentors);
          let temp_data = [];
          result.mentors.map((mentor) => {
            temp_data.push({
              id: mentor.mentor_id,
              name: mentor.honorifics + " " + mentor.fname + " " + mentor.lname,
              title: mentor.position,
              email: mentor.email,
            });
          });
          setTableData(temp_data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        })
    };
    fetchMentors();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Email ID",
        accessor: "email",
      },
    ],
    []
  );

  const handleFilter = () => {
    let filteredArray = [];
    console.log(filters);
    filteredArray = mentors.filter((mentor) => {
      const fullName = `${mentor.fname} ${mentor.lname}`.toLowerCase();
      return (
        (!filters.name || fullName.includes(filters.name.toLowerCase())) &&
        (!filters.title || mentor.position.includes(filters.title)) &&
        (!filters.id || mentor.mentor_id === filters.id)
      );
    });
    setFilteredMentors(filteredArray);

    let temp_data = [];
    filteredArray.map((mentor) => {
      temp_data.push({
        id: mentor.mentor_id,
        name: mentor.honorifics + " " + mentor.fname + " " + mentor.lname,
        title: mentor.position,
        email: mentor.email,
      });
    });
    setTableData(temp_data);

    // console.log(temp_data);
  };

  return (
    <div className={styles.menteesContainer}>
      {/* Heading */}
      <Heading className={styles.header}>Mentors</Heading>

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
          placeholder="Search by title..."
          className={styles.searchBar}
          onChange={(value) => handleFilterChange("title", value.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Id..."
          className={styles.searchBar}
          onChange={(value) => handleFilterChange("id", value.target.value)}
        />
        <button className={styles.searchButton} onClick={handleFilter}>
          Search
        </button>
      </div>

      <div className={styles.table}>
        {loading ? <Spinner /> : <TableList
          columns={columns}
          data={tableData}
          mentors={filteredMentors}
          admin={admin}
        />}
      </div>
    </div>
  );
};

export default Mentors;
