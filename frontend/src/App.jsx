import { useState } from "react";
import "./App.css";
import Header from "./admin/Header";
import Dashboard from "./admin/Dashboard";
import Sidebar from "./admin/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ManageEmployee from "./admin/components/employee/ManageEmployee";
import AddEmployee from "./admin/components/employee/AddEmployee";
import EditEmployee from "./admin/components/employee/EditEmployee";
import ManageTask from "./admin/components/task/ManageTask";
import AddTask from "./admin/components/task/AddTask";
import EditTask from "./admin/components/task/EditTask";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<ManageEmployee />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/edit/:id" element={<EditEmployee />} />

          <Route path="/task" element={<ManageTask />} />
          <Route path="/task/add" element={<AddTask />} />
          <Route path="/task/edit/:id" element={<EditTask />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
