import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper } from '@material-ui/core';

function DataLogTable() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/mongodb");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (property) => (event) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data.sort((a, b) => {
    const isAscending = order === "asc";
    if (typeof a[orderBy] === "string") {
      return isAscending
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    } else {
      return isAscending
        ? a[orderBy] > b[orderBy]
          ? 1
          : -1
        : b[orderBy] > a[orderBy]
        ? 1
        : -1;
    }
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell key="time">
              <TableSortLabel
                active={orderBy === "time"}
                direction={order}
                onClick={handleSort("time")}
              >
                originationTime
              </TableSortLabel>
            </TableCell>
            <TableCell key="clusterId">
              <TableSortLabel
                active={orderBy === "clusterId"}
                direction={order}
                onClick={handleSort("clusterId")}
              >
                ClusterId
              </TableSortLabel>
            </TableCell>
            <TableCell key="userId">
              <TableSortLabel
                active={orderBy === "userId"}
                direction={order}
                onClick={handleSort("userId")}
              >
                UserId
              </TableSortLabel>
            </TableCell>
            <TableCell key="Phone">
              <TableSortLabel
                active={orderBy === "Phone"}
                direction={order}
                onClick={handleSort("Phone")}
              >
                Phone
              </TableSortLabel>
            </TableCell>
            <TableCell key="VM">
              <TableSortLabel
                active={orderBy === "VM"}
                direction={order}
                onClick={handleSort("VM")}
              >
                VM
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.originationTime}</TableCell>
              <TableCell>{row.clusterId}</TableCell>
              <TableCell>{row.userId}</TableCell>
              <TableCell>{row.devices.phone}</TableCell>
              <TableCell>{row.devices.voicemail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataLogTable;