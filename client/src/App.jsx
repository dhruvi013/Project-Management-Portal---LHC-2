import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PackageManager from "./components/packagemanager";
import AdminLogin from "./components/AdminLogin";
import HomePage from "./components/HomePage";
import UserLogin from "./components/UserLogin";
import AdminDashboard from "./components/AdminDashboard";
import CompanyAdminLogin from "./components/companyadminlogin";
import Project from "./components/Project";
import AddProject from "./components/AddProjectForm";
import AddEmployee from "./components/AddEmployeeForm";
import AssignEmployeeToProject from "./components/AssignEmployeeToProject";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/packages" element={<PackageManager />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/companyadminlogin" element={<CompanyAdminLogin />} />
        <Route path="/project" element={<Project />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/assignemployee" element={<AssignEmployeeToProject />} />


        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
