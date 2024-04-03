import React from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
        <input
          type="text"
          placeholder="Search by ID..."
          className={styles.searchBar}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Cards */}
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
    </div>
  );
};

export default Mentors;
