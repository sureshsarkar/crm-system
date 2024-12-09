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
          <Route path="/employees" element={<ManageEmployee />} />
          <Route path="/employees/add" element={<AddEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
