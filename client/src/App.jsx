import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PackageManager from "./components/packagemanager";
import AdminLogin from "./components/AdminLogin";
import HomePage from "./components/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/packages" element={<PackageManager />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/user/login" element={<UserLogin></UserLogin>} /> */}
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
