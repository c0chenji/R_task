import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function DataLogTable() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState({column: null, direction: null});

  useEffect(() => {
    axios
      .get("http://localhost:3000/mongodb")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const sortData = (column) => {
    let direction = "asc";
    if (sortOrder.column === column && sortOrder.direction === "asc") {
      direction = "desc";
    }
    setSortOrder({ column: column, direction: direction });
  };

  const sortedData = React.useMemo(() => {
    if (sortOrder.column === null) {
      return data;
    }
    return [...data].sort((a, b) => {
      let columnA = a[sortOrder.column];
      let columnB = b[sortOrder.column];
      if (sortOrder.column === "devices.phone" || sortOrder.column === "devices.voicemail") {
        columnA = a.devices[sortOrder.column.split(".")[1]];
        columnB = b.devices[sortOrder.column.split(".")[1]];
      }
      if (sortOrder.direction === "asc") {
        return columnA < columnB ? -1 : 1;
      } else {
        return columnA > columnB ? -1 : 1;
      }
    });
  }, [data, sortOrder]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th onClick={() => sortData("_id")}>ID</th> */}
            <th onClick={() => sortData("originationTime")}>Origination Time</th>
            <th onClick={() => sortData("clusterId")}>Cluster ID</th>
            <th onClick={() => sortData("userId")}>User ID</th>
            <th onClick={() => sortData("devices.phone")}>Phone</th>
            <th onClick={() => sortData("devices.voicemail")}>Voicemail</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row._id}>
              {/* <td>{row._id}</td> */}
              <td>{row.originationTime}</td>
              <td>{row.clusterId}</td>
              <td>{row.userId}</td>
              <td>{row.devices.phone}</td>
              <td>{row.devices.voicemail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DataLogTable;