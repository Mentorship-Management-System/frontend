import React, { useEffect, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import styles from "../Css/Table.module.scss"; // Import SCSS file
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

function Table({ columns, data }) {
  const Navigate = useNavigate();
  const location = useLocation();

  const segments = location.pathname.split("/");
  const initiallySelectedRows = React.useMemo(() => new Set(), []);
  // Use the state and functions returned from useTable to build your UI
  console.log(data);
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
    state: { pageIndex },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = table;

  // Render the UI for your table
  return (
    <>
      {/* {selectCount} */}
      <div className={styles.tableContainer}>
        <Flex justify="flex-end">
          <Center cursor="pointer">
            <MdOutlineFileDownload size={25} />
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
                    {row.cells.map((cell, index) => {
                      if (index === row.cells.length - 1) {
                        // If it's the last cell in the row
                        return (
                          <React.Fragment key={cell.getCellProps().key}>
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                            <td>
                              <button
                                className={styles.btnTable}
                                onClick={() =>
                                  Navigate(
                                    `/${segments[1]}/Mentees/${cell.row.values.rollNo}`
                                  )
                                }
                              >
                                view
                              </button>
                            </td>
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
