import React, { useEffect, useState } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import styles from "../Css/Table.module.scss"; // Import SCSS file
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";

function Table({ columns, data }) {
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
  }, [selectedFlatRows]);

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
            <MdOutlineFileDownload size={25} />
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
