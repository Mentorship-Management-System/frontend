import React, { useEffect, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import styles from "../Css/Table.module.scss"; // Import SCSS file
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import * as XLSX from "xlsx";

function Table({ columns, data, isAssignMentors, handleClickStudents, mentorMentee }) {
  const [selectCount, setSelectCount] = useState(0);
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
    state: { pageIndex, pageSize, selectedRowPaths },
    toggleAllRowsSelected,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = table;

  useEffect(() => {
    setSelectCount(selectedFlatRows.length);
    handleClickStudents(selectedFlatRows)
  }, [selectedFlatRows]);

  const handleDownloadMentorMentee = () => {
    console.log("Download mentors");

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Define custom headers
      const headers = [
        { key: "enrollment_no", header: "Roll Number" },
        { key: "name", header: "Student's Name" },
        { key: "gsuite_id", header: "Student's G-Suite ID" },
        { key: "phone", header: "Student's Phone Number" },
        { key: "mentor", header: "Mentor Name" },
        { key: "mentor_phone", header: "Mentor's Phone Number" },
        { key: "mentor_email", header: "Mentor's Email" },
        { key: "programme", header: "Programme" },
        { key: "enrollment_year", header: "Enrollment Year" },
      ];

      // Convert student data to a format with custom headers
      const dataWithHeaders = mentorMentee.map((student) => {
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Mentors and Mentees");

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
      link.download = "mentors_and_mentees.xlsx";
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the temporary link element
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  }

  // Render the UI for your table
  return (
    <>
      {/* {selectCount} */}
      <div className={styles.tableContainer}>
        <Flex justify="space-between">
          <Box m="1% 0" fontSize="1.1rem">
            Rows Selected: <strong>{selectCount}</strong>
          </Box>
          <Center cursor="pointer" className={styles.tooltip}>
            <MdOutlineFileDownload size={25} onClick={handleDownloadMentorMentee} />
            <span className={styles.tooltiptext}>Download</span>
          </Center>
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
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
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
        {/* <p>Selected Rows: {selectedRowPaths.size}</p>
      <pre>
      <code>
          {JSON.stringify(
              {
                  selectedRowPaths: [...selectedRowPaths.values()],
                  "selectedFlatRows[].original": selectedFlatRows.map(
                      (d) => d.original
                      ),
                    },
                    null,
                    2
                    )}
                    </code>
                </pre> */}
      </div>
    </>
  );
}

export default Table;
