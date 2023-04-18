import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination, CircularProgress, IconButton } from '@material-ui/core';
import { Download as DownloadIcon } from '@material-ui/icons';
import { CSVLink } from 'react-csv';

const TableComponent = ({ data, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    if (sortBy === property) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(property);
      setSortOrder('asc');
    }
  };

  const sortedData = sortBy ? [...data].sort((a, b) => {
    const aValue = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
    const bValue = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    } else if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  }) : data;

  const columns = Object.keys(data[0] || {}).filter(key => key !== '_id');

  const tableData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {loading ? <CircularProgress /> :
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column} onClick={() => handleSort(column)}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(row => (
                  <TableRow key={row._id}>
                    {columns.map(column => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <CSVLink data={sortedData} filename="data.csv"><IconButton><DownloadIcon /></IconButton></CSVLink>
        </>
      }
    </>
  );
};

export default TableComponent;