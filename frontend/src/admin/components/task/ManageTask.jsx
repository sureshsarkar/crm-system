import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { TiArchive } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
const ManageTask = () => {
  const data = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 34 },
    { id: 3, name: "Sam Wilson", age: 23 },
    { id: 4, name: "Sam Wilson", age: 23 },
    { id: 5, name: "Sam Wilson", age: 23 },
    { id: 6, name: "Sam Wilson", age: 23 },
    { id: 7, name: "Sam Wilson", age: 23 },
    { id: 8, name: "Sam Wilson", age: 23 },
    { id: 9, name: "Sam Wilson", age: 23 },
    { id: 10, name: "Sam Wilson", age: 23 },
    { id: 11, name: "Sam Wilson", age: 23 },
  ];

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex">
          <a href={`/employee/edit/${row.id}`}>
            <button className="btn btn-primary m-1" title="Edit">
              <FaEdit />
            </button>
          </a>
          <button
            onClick={() => handleDeleteEmployee(row.id)}
            className="btn btn-danger m-1"
            title="Delete"
          >
            <TiArchive />
          </button>
        </div>
      ),
    },
  ];
  const [records, setRecords] = useState(data);

  //  filter employee function
  const handelFilter = (event) => {
    const newData = data.filter((row) => {
      return row.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    setRecords(newData);
  };

  //  delete employee function
  const handleDeleteEmployee = (e) => {
    console.log(e);
  };
  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Task Data Table</h2>
        <a href="/task/add" className="p-2">
          <button className="btn btn-primary">
            <IoIosPersonAdd /> Add
          </button>
        </a>
      </div>
      <div>
        <div className="text-end">
          <input
            type="text"
            placeholder="Filter data"
            onChange={handelFilter}
          />
        </div>
        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default ManageTask;
