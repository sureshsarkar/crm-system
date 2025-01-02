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
import ManageProject from "./admin/components/project/ManageProjects";
import AddProject from "./admin/components/project/AddProject";
import EditProject from "./admin/components/project/EditProject";
import Login from "./admin/Login";
import ProtectedRoute from "./utills/ProtectedRoute";

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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/project" element={<ProtectedRoute><ManageProject /></ProtectedRoute>} />
          <Route path="/project/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path="/project/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />

          <Route path="/employee" element={<ProtectedRoute><ManageEmployee /></ProtectedRoute>} />
          <Route path="/employee/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/employee/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />

          <Route path="/task" element={<ProtectedRoute><ManageTask /></ProtectedRoute>} />
          <Route path="/task/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
          <Route path="/task/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
