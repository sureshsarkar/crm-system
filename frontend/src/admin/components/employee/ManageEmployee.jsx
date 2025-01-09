import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { TiArchive } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import toast  from 'react-hot-toast';
import { format } from 'date-fns';

const ManageEmployee = ({getRole,roleAuth}) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employee
  const getEmployees = async () => {
    try {
      const { data } = await axios.get("/api/auth/employee");
      
      if (data?.success) {
        const formattedData = data.employee.map((employee, index) => ({
          id: employee._id,
          name: employee.fullname,
          email: employee.email,
          mobile: employee.mobile,
          role: employee.role,
          status: employee.status,
          createdAt:format(new Date(employee.createdAt), 'dd/MM/yyyy HH:mm'),
        }));
        setEmployeeData(formattedData);
        setRecords(formattedData);  // Initialize records with fetched data
      }else{
        toast.error(data.message);
      }

      
    } catch (error) {
      toast.error(error);
      // console.log("Error fetching projects:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getEmployees();
  }, []);

  // Filter employee function
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = employeeData.filter((row) =>
      row.name.toLowerCase().includes(value)
    );
    setRecords(filteredData);
  };

  // Delete employee function

const handleDeleteEmployee = async (id) => {
  if (!window.confirm("Are you sure you want to delete this employee?")) return;
  
  setLoading(true);
  try {
    const { data } = await axios.delete(`/api/auth/delete-employee/${id}`);
    if (data.success) {
      toast.success(data.message);
      const updatedEmployees = employeeData.filter(emp => emp.id !== id);
      setEmployeeData(updatedEmployees);
      setRecords(updatedEmployees);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to delete employee");
  } finally {
    setLoading(false);
  }
};

  // Table columns
  const columns = [
    // { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true,
      cell: (row) => (
        <div title={row.email} className="emailCell">
          {row.email}
        </div>
      ),
     },
    { name: "Mobile", selector: (row) => row.mobile, sortable: true },
    { name: "Role", selector: (row) => row.role==1? "Employee": row.role==2 ? "Project Manager"  : row.role==3 ? "SEO Manager" : row.role==4 ? "Development Manager" : "Admin", sortable: true },
    { name: "Status", selector: (row) => (row.status==1 ? "Active" : "Inactive"), sortable: true },
    { name: "Created", selector: (row) => row.createdAt, sortable: true },
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
            disabled={loading}
          >
           {loading ? "..." : <TiArchive />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="main-container">
      <div className="d-flex justify-content-between">
        <h2 className="text-success text-start p-2">Employee Data Table</h2>
        {roleAuth ===5 ?(
        <a href="/employee/add" className="p-2">
          <button className="btn btn-primary">
            <IoIosPersonAdd /> Add
          </button>
        </a>
        ):null}
      </div>

      <div>
        <div className="text-end">
          <input
            type="text"
            placeholder="Filter data"
            onChange={handleFilter}
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

export default ManageEmployee;
