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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import TableList from "./TableList";
import { useSelector } from "react-redux";
import { get_all_admins, register_admin } from "../../../api/adminApi";
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
  const toast = useToast();

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
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [regsiterLoading, setRegsiterLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password did not match");
      return;
    } else {
      // Add your form submission logic here
      console.log(formData);
      setRegsiterLoading(true);
      register_admin(admin.token, formData)
        .then(result => {
          if(result.data){
            result = result.data;
            toast({
              title: 'Success',
              description: result.message,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
            // console.log(result);
            setTableData(prev => [{
              id: result.admin.admin_id,
              fname: result.admin.fname,
              lname: result.admin.lname,
              email: result.admin.email,
            }, ...prev])
            // alert("New Admin Registered!")
          } else {
            console.log(result.response);
            toast({
              title: result.response.statusText,
              description: result.response.data.error,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          onClose();
          setFormData({
            fname: "",
            lname: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setRegsiterLoading(false);
        })
    }
  };

  //useEffect functions
    useEffect(() => {
      setLoading(true);
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
        .finally(() => {
          setLoading(false);
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
        {loading ? <Spinner /> : <TableList columns={columns} data={tableData} admins={admins} admin={admin} />}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleRegisterAdmin}>
              <Flex className={styles.nameInputs}>
                <FormControl id="fname" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="fname"
                    value={formData.fname}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="lname" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lname"
                    value={formData.lname}
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
                  {regsiterLoading ? <Spinner /> : "Submit"}
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
