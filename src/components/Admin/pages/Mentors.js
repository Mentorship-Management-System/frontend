import React, { useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
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
  const Navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
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
        Header: "Title",
        accessor: "title",
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
        name: "Dr. Bhogeswar Borah",
        title: "Professor",
        email: "john.doe@example.com",
        contact: "8090980984",
      },
      {
        id: 2,
        name: "Dr. Sarat Saharia",
        title: "Professor",
        email: "jane.smith@example.com",
        contact: "8090980984",
      },
      // Add more dummy data as needed
    ],
    []
  );

  for (let i = 3; i <= 20; i++) {
    data.push({
      id: i,
      name: `Student ${i}`,
      title: i % 3 === 0 ? "Professor" : "Assistant Professor",
      mentor: i % 2 === 0 ? "Dr. Bhogeswar Bora" : "Sanjib k. Deka",
      email: `student${i}@example.com`,
      contact: "9987656742",
    });
  }
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
        />
        <input
          type="text"
          placeholder="Search by title..."
          className={styles.searchBar}
        />
        <Select
          placeholder="Select programme"
          onChange={(value) => handleFilterChange("branch", value)}
          className={styles.selectBar}
          h="6vh"
          w="30%"
        >
          <option value="cse">B-Tech</option>
          <option value="ece">M-Tech</option>
          <option value="mech">MCA</option>
          <option value="civil">BCA</option>
          {/* Add more options for other branches */}
        </Select>
        {showList ? (
          <IoListOutline onClick={() => setShowList(!showList)} />
        ) : (
          <CiGrid41 onClick={() => setShowList(!showList)} />
        )}
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Cards */}
      {showList ? (
        <div className={styles.table}>
          <TableList columns={columns} data={data} />
        </div>
      ) : (
        <div className={styles.cardsContainer}>
          {menteesData.map((mentee) => (
            <Flex justify="space-between" className={styles.headerCard}>
              <div className={styles.card} key={mentee.id}>
                <img
                  src={mentee.image}
                  alt={mentee.name}
                  className={styles.menteeImage}
                />
                <div className={styles.menteeInfo}>
                  <p className={styles.menteeName}>{mentee.name}</p>
                  <p className={styles.menteeRole}>{mentee.role}</p>
                </div>
              </div>
              <Button
                className={styles.button}
                variant="outline"
                colorScheme="blue"
                onClick={() => {
                  Navigate(`/admin/Mentors/${mentee.id}`);
                }}
              >
                View
              </Button>
            </Flex>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mentors;
