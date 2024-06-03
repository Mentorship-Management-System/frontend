import React, { useEffect, useState } from "react";
import styles from "../Css/Mentees.module.scss"; // Import SCSS module for styling
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
import { useSelector } from "react-redux";
import { get_all_admins } from "../../../api/adminApi";
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
  const admin = useSelector((state) => state.adminAuth.admin);

  //state variables
  const [admins, setAdmins] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    year: "",
    branch: "",
    searchText: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password didnot match");
      return;
    }
    // Add your form submission logic here
    console.log(formData);
    onClose();
  };

  //useEffect functions
    useEffect(() => {
      get_all_admins(admin.token)
        .then(result => {
          result = result.data;
          console.log(result);
          setAdmins(result.admins);

          let temp_data = [];
          result.admins.map((adm) => {
            if(adm.admin_id !== admin.user.admin_id){
              temp_data.push({
                id: adm.admin_id,
                fname: adm.fname,
                lname: adm.lname,
                email: adm.email,
              });
            }
          });
          setTableData(temp_data);

        })
        .catch(error => {
          console.log(error);
        })
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
      <Flex justify="flex-end" mb="2%">
        <Button
          backgroundColor="#03ac"
          color="white"
          _hover={{ backgroundColor: "#03ab" }}
          onClick={onOpen}
        >
          Add New Admin
        </Button>
      </Flex>
      <div className={styles.table}>
        <TableList columns={columns} data={tableData} admins={admins} admin={admin} />
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Flex className={styles.nameInputs}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Flex>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Center
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </Center>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={"full"}>
                    <Center
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </Center>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Admin;
