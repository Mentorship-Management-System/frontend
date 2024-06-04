import React, { useEffect, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import styles from "../Css/Table.module.scss"; // Import SCSS file
import {
  ChakraProvider,
  Button,
  Modal,
  Box,
  Center,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { MdOutlineFileDownload, MdOutlineFileUpload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { MdDelete } from "react-icons/md";
import { delete_students, upload_students } from "../../../api/studentApi";
import { delete_mentors } from "../../../api/mentorApi";
import { delete_admins } from "../../../api/adminApi";

const generateRandomPassword = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
  }
  return password;
}

const transformData = (arr) => {
  return arr.map(item => {
      // Extracting first two digits to determine the year of enrollment
      const year = parseInt(item.enrollment_no.slice(3, 5)) + 2000;
      
      // Determining the program based on the first three characters of enrollment_no
      let program;
      switch(item.enrollment_no.slice(0, 3)) {
          case "CSE":
              program = "Master of Technology (CSE)";
              break;
          case "CSI":
              program = "Master of Technology (IT)";
              break;
          case "CSM":
              program = "Master of Computer Application";
              break;
          case "CSB":
              program = "Bachelor of Technology";
              break;
          default:
              program = "Unknown Program";
      }

      // Transforming name to fname and lname in camel case
      const nameParts = item.name.toLowerCase().split(' ');
      const fname = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1);
      const lname = nameParts.slice(1).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

      // Creating the transformed object
      return {
        enrollment_no: item.enrollment_no,
        fname: fname,
        lname: lname,
        programme: program,
        enrollment_year: year,
        gsuite_id: item.gsuite_id,
        email: item.email,
        phone: item.phone,
        password: generateRandomPassword(8)
      };
  });
}

const download_student_credentials = (transformedData) => {
  const download_workbook = XLSX.utils.book_new();

  // Define custom headers
  const headers = [
    { key: "fname", header: "First Name" },
    { key: "lname", header: "Last Name" },
    { key: "gsuite_id", header: "GSuite ID" },
    { key: "enrollment_no", header: "Enrollment No" },
    { key: "programme", header: "Programme" },
    { key: "password", header: "Password" },
  ];

  // Convert student data to a format with custom headers
  const dataWithHeaders = transformedData.map((student) => {
    const newObj = {};
    headers.forEach((header) => {
      newObj[header.header] = student[header.key];
    });
    return newObj;
  });

  // Add custom headers as the first row
  const download_worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, {
    header: headers.map((h) => h.header),
  });

  // Append the download_worksheet to the download_workbook
  XLSX.utils.book_append_sheet(download_workbook, download_worksheet, "Students");

  // Generate a binary string representation of the download_workbook
  const workbookBinary = XLSX.write(download_workbook, {
    bookType: "xlsx",
    type: "binary",
  });

  // Convert the binary string to an ArrayBuffer
  const buffer = new ArrayBuffer(workbookBinary.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < workbookBinary.length; i++) {
    view[i] = workbookBinary.charCodeAt(i) & 0xff;
  }

  // Create a Blob from the ArrayBuffer and create a URL for it
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  // Create a temporary link element, set its href to the Blob URL, and trigger a download
  const link = document.createElement("a");
  link.href = url;
  link.download = "students_with_credentials.xlsx";
  document.body.appendChild(link);
  link.click();

  // Clean up and remove the temporary link element
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function Table({
  columns,
  data,
  students,
  mentors,
  admin,
  admins,
  setStudents,
}) {
  const Navigate = useNavigate();
  const location = useLocation();
  const [selectCount, setSelectCount] = useState(0);
  const segments = location.pathname.split("/");
  const initiallySelectedRows = React.useMemo(() => new Set(), []);
  // Use the state and functions returned from useTable to build your UI
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadStudents = () => {
    if (file) {
      console.log("File uploaded:", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the data is in the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert JSON data to array of records, filtering out empty rows
        const records = jsonData.slice(1).filter(row => row[1] && row[2] && row[3] && row[4] && row[5]).map((row) => ({
          enrollment_no: row[1],
          name: row[2],
          gsuite_id: row[3],
          email: row[4],
          phone: row[5]
        }));
        // console.log("File data:", records);
        const transformedData = transformData(records);
        console.log(transformedData);

        upload_students(admin.token, transformedData)
          .then(result => {
            result = result.data;
            console.log(result);
            alert(result.message);
            download_student_credentials(transformedData);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            onClose();
          })
      };
      reader.readAsArrayBuffer(file);
      
    } else {
      alert("Please select a file to upload.");
    }
  };
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowPaths: initiallySelectedRows,
      },
      debug: true,
      // Use the usePagination hook to add pagination
      ...usePagination,
    },
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of 'rows', we'll use 'page' for the current page of data
    prepareRow,
    selectedFlatRows,
    state: { pageIndex },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = table;

  useEffect(() => {
    setSelectCount(selectedFlatRows.length);
  }, [selectedFlatRows]);

  const handleDownloadMentees = () => {
    if (students) {
      console.log("Download students");

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Define custom headers
      const headers = [
        { key: "student_id", header: "Student ID" },
        { key: "fname", header: "First Name" },
        { key: "lname", header: "Last Name" },
        { key: "email", header: "Email" },
        { key: "gsuite_id", header: "GSuite ID" },
        { key: "gender", header: "Gender" },
        { key: "enrollment_no", header: "Enrollment No" },
        { key: "phone", header: "Phone" },
        { key: "programme", header: "Programme" },
        { key: "enrollment_year", header: "Enrollment Year" },
        { key: "mentor_id", header: "Mentor ID" },
        { key: "cgpa", header: "CGPA" },
        { key: "dob", header: "Date of Birth" },
      ];

      // Convert student data to a format with custom headers
      const dataWithHeaders = students.map((student) => {
        const newObj = {};
        headers.forEach((header) => {
          newObj[header.header] = student[header.key];
        });
        return newObj;
      });

      // Add custom headers as the first row
      const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, {
        header: headers.map((h) => h.header),
      });

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      // Generate a binary string representation of the workbook
      const workbookBinary = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });

      // Convert the binary string to an ArrayBuffer
      const buffer = new ArrayBuffer(workbookBinary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < workbookBinary.length; i++) {
        view[i] = workbookBinary.charCodeAt(i) & 0xff;
      }

      // Create a Blob from the ArrayBuffer and create a URL for it
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element, set its href to the Blob URL, and trigger a download
      const link = document.createElement("a");
      link.href = url;
      link.download = "students.xlsx";
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the temporary link element
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (mentors) {
      console.log("Download mentors");

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Define custom headers
      const headers = [
        { key: "mentor_id", header: "Mentor ID" },
        { key: "honorifics", header: "Honorifics" },
        { key: "fname", header: "First Name" },
        { key: "lname", header: "Last Name" },
        { key: "email", header: "Email" },
        { key: "gsuite_id", header: "GSuite ID" },
        { key: "gender", header: "Gender" },
        { key: "phone", header: "Phone" },
        { key: "position", header: "Position" },
        { key: "isAvailableAsMentor", header: "Available As Mentor?" },
        { key: "extension", header: "Extension Number" },
        { key: "assigned_mentees", header: "Mentees Assigned" },
      ];

      // Convert student data to a format with custom headers
      const dataWithHeaders = mentors.map((student) => {
        const newObj = {};
        headers.forEach((header) => {
          if (header.key === "isAvailableAsMentor") {
            newObj[header.header] = Boolean(student[header.key]) ? "Yes" : "No";
          } else {
            newObj[header.header] = student[header.key];
          }
        });
        return newObj;
      });

      // Add custom headers as the first row
      const worksheet = XLSX.utils.json_to_sheet(dataWithHeaders, {
        header: headers.map((h) => h.header),
      });

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Mentors");

      // Generate a binary string representation of the workbook
      const workbookBinary = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary",
      });

      // Convert the binary string to an ArrayBuffer
      const buffer = new ArrayBuffer(workbookBinary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < workbookBinary.length; i++) {
        view[i] = workbookBinary.charCodeAt(i) & 0xff;
      }

      // Create a Blob from the ArrayBuffer and create a URL for it
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element, set its href to the Blob URL, and trigger a download
      const link = document.createElement("a");
      link.href = url;
      link.download = "mentors.xlsx";
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the temporary link element
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (admins) {
    }
  };

  const handleDelete = () => {
    const profiles = selectedFlatRows.map((d) => d.original.id);
    if (profiles && profiles.length > 0) {
      console.log(profiles);
      if (students) {
        console.log("delete students");
        const payload = { studentIds: profiles };
        delete_students(admin.token, payload)
          .then((result) => {
            result = result.data;
            console.log(result);
            Navigate(0);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (mentors) {
        console.log("delete mentors");
        const payload = { mentorIds: profiles };
        delete_mentors(admin.token, payload)
          .then((result) => {
            result = result.data;
            console.log(result);
            Navigate(0);
          })
          .catch((error) => {
            console.log(error);
          })
      } else if(admins){
        console.log("Delete admins");
        const payload = { adminIds: profiles }
        delete_admins(admin.token, payload)
          .then(result => {
            result = result.data;
            console.log(result);
            Navigate(0)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  };

  return (
    <>
      {/* {selectCount} */}
      <div className={styles.tableContainer}>
        <Flex justify="space-between" position="relative">
          <Box m="1% 0" fontSize="1.1rem">
            Rows Selected: <strong>{selectCount}</strong>
          </Box>
          <Flex gap={5}>
            {segments[1] === "admin" && segments[2] === "Mentees" && (
              <Center cursor="pointer" onClick={onOpen}>
                <MdOutlineFileUpload size={25} />
              </Center>
            )}
            {segments[1] === "admin" && (
              <Center cursor="pointer">
                <MdDelete size={25} onClick={() => setShowDeletePopup(true)} />
              </Center>
            )}
            {!admins && (
              <Center cursor="pointer">
                <MdOutlineFileDownload
                  size={25}
                  onClick={handleDownloadMentees}
                />
              </Center>
            )}
          </Flex>
          {showDeletePopup && (
            <Box className={styles.editPopup}>
              <Text>Are you sure?</Text>
              <Text>You can't undo this afterwards</Text>
              <Flex justify="flex-end" align="center">
                <Button
                  variant="outline"
                  onClick={() => setShowDeletePopup(false)}
                >
                  No
                </Button>
                <Button colorScheme="facebook" onClick={handleDelete}>
                  Yes
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>

        {/* <button onClick={() => toggleAllRowsSelected()}>Select All Rows</button> */}
        <Box className={styles.tableBody}>
          <table className={styles.table} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      if (index === row.cells.length - 1) {
                        // If it's the last cell in the row
                        return (
                          <React.Fragment key={cell.getCellProps().key}>
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                            {segments[2] !== "Admins" && (
                              <td>
                                <button
                                  className={styles.btnTable}
                                  onClick={() =>
                                    Navigate(
                                      `/${segments[1]}/${segments[2]}/${
                                        segments[2] === "Mentees"
                                          ? cell.row.values.rollNo
                                          : cell.row.values.id
                                      }`
                                    )
                                  }
                                >
                                  view
                                </button>
                              </td>
                            )}
                          </React.Fragment>
                        );
                      } else {
                        // For other cells in the row
                        return (
                          <td
                            key={cell.getCellProps().key}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
        <div className={styles.pagination}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>{" "}
          <Center p="0 1%">
            {pageIndex + 1}/{pageOptions.length}
          </Center>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>{" "}
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Mentees</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="file">
                  Select an Excel file (.xlsx)
                </FormLabel>
                <Input
                  type="file"
                  id="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUploadStudents}>
                Upload
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default Table;
