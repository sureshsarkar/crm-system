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
  const [roleAuth, setRoleAuth] = useState(null);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };


  const getRole = ()=>{
    const logedInUser = localStorage.getItem('user');
    if(logedInUser){
        // const role = JSON.parse(logedInUser).role;
        setRoleAuth(JSON.parse(logedInUser).role);
    }
}

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
          getRole={getRole}
          roleAuth ={roleAuth}
        />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact  path="/dashboard" element={<ProtectedRoute><Dashboard getRole={getRole} roleAuth ={roleAuth} /></ProtectedRoute>} />

          <Route exact  path="/project" element={<ProtectedRoute><ManageProject getRole={getRole} roleAuth ={roleAuth}/></ProtectedRoute>} />
          <Route exact  path="/project/add" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route exact  path="/project/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />

          <Route exact  path="/employee" element={<ProtectedRoute><ManageEmployee getRole={getRole} roleAuth ={roleAuth}/></ProtectedRoute>} />
          <Route exact  path="/employee/add" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route exact  path="/employee/edit/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />

          <Route exact  path="/task" element={<ProtectedRoute><ManageTask getRole={getRole} roleAuth ={roleAuth}/></ProtectedRoute>} />
          <Route exact  path="/task/add" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
          <Route exact  path="/task/edit/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
