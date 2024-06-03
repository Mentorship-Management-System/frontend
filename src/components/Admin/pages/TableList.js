import React, { useEffect, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import styles from "../Css/Table.module.scss"; // Import SCSS file
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { MdDelete } from "react-icons/md";
import { delete_students } from "../../../api/studentApi";
import { delete_mentors } from "../../../api/mentorApi";
import { delete_admins } from "../../../api/adminApi";

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

  // console.log(
  //   selectedFlatRows &&
  //     JSON.stringify(
  //       {
  //         values: selectedFlatRows.map((d) => d.original.id),
  //       },
  //       null,
  //       2
  //     )
  // );

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
        <Flex justify="space-between">
          <Box m="1% 0" fontSize="1.1rem">
            Rows Selected: <strong>{selectCount}</strong>
          </Box>
          <Flex gap={5}>
            <Center cursor="pointer">
              <MdDelete size={25} onClick={handleDelete} />
            </Center>
            {!admins && (
              <Center cursor="pointer">
                <MdOutlineFileDownload
                  size={25}
                  onClick={handleDownloadMentees}
                />
              </Center>
            )}
          </Flex>
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
      </div>
    </>
  );
}

export default Table;
