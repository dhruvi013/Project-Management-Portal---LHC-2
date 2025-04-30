import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');

  const fetchCompanies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/companyadmin/companies');
      setCompanies(res.data);
    } catch (err) {
      setError('Error fetching companies');
    }
  };

  const approveCompany = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/companyadmin/approve/${id}`);
      fetchCompanies();
    } catch (err) {
      setError('Error approving company');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Company Registration Approval</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <p>{company.companyName} - {company.status}</p>
            {company.status === 'Pending' && (
              <button onClick={() => approveCompany(company._id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default AdminDashboard;
