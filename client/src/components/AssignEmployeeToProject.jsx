import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignEmployeeToProject() {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empRes = await axios.get('http://localhost:5000/api/employee');
        const projRes = await axios.get('http://localhost:5000/api/project');
        setEmployees(empRes.data);
        setProjects(projRes.data);
      } catch (err) {
        setMsg(" Failed to load employees or projects.");
      }
    };
    fetchData();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedProject) {
      setMsg("Please select both employee and project.");
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/assign', {
        employeeId: selectedEmployee,
        projectId: selectedProject,
      });
      setMsg(" Employee assigned successfully!");
      setSelectedEmployee('');
      setSelectedProject('');
    } catch (err) {
      setMsg(`${err?.response?.data?.message || 'Error assigning employee'}`);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '500px', margin: 'auto' }}>
      <h3>Assign Employee to Project</h3>
      <form onSubmit={handleAssign}>
        <label>Select Employee:</label><br />
        <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} required>
          <option value="">-- Select Employee --</option>
          {employees.filter(emp => !emp.projectId).map(emp => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.position || 'Employee'})
            </option>
          ))}
        </select><br /><br />

        <label>Select Project:</label><br />
        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} required>
          <option value="">-- Select Project --</option>
          {projects.map(proj => (
            <option key={proj._id} value={proj._id}>{proj.name}</option>
          ))}
        </select><br /><br />

        <button type="submit">Assign</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default AssignEmployeeToProject;
