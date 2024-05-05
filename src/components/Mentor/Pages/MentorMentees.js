import React, { useState } from "react";
import styles from "../../Admin/Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "../../Admin/pages/TableList";

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
        Header: "Roll No",
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
        email: "john.doe@example.com",
        contact: "8090980984",
      },
      {
        id: 2,
        name: "Jane Smith",
        rollNo: "A002",
        programme: "M-tech",
        email: "jane.smith@example.com",
        contact: "8090980984",
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
      programme: i % 3 === 0 ? "B.Tech" : "M.Tech",
      email: `student${i}@example.com`,
      contact: "9987656742",
    });
  }
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
          h="7vh"
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
                  Navigate(`/mentor/Mentees/${mentee.id}`);
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

export default Mentees;
