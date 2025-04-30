import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    packageName: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [packages, setPackages] = useState([]); // State to store packages

  useEffect(() => {
    // Fetch packages from the backend when the component mounts
    const fetchPackages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/packages');
        setPackages(res.data); // Assuming the response is an array of packages
      } catch (err) {
        setError('Error fetching packages');
      }
    };

    fetchPackages();
  }, []); // Empty dependency array to run this effect only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { companyName, adminName, adminEmail, adminPassword, packageName } = form;

    if (!companyName || !adminName || !adminEmail || !adminPassword || !packageName) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/companyadmin/register', {
        companyName,
        adminName,
        adminEmail,
        adminPassword,
        packageName, // map here
      });

      if (res.data.success) {
        setSuccess('Registration successful. Awaiting approval from the super admin.');
        setTimeout(() => navigate('/companyadminlogin'), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Company Admin Sign-Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            style={styles.input}
            type="text"
            name="adminName"
            value={form.adminName}
            onChange={handleChange}
            placeholder="Admin Name"
          />
          <input
            style={styles.input}
            type="email"
            name="adminEmail"
            value={form.adminEmail}
            onChange={handleChange}
            placeholder="Admin Email"
          />
          <input
            style={styles.input}
            type="password"
            name="adminPassword"
            value={form.adminPassword}
            onChange={handleChange}
            placeholder="Admin Password"
          />
          <select
            style={styles.input}
            name="packageName"
            value={form.packageName}
            onChange={handleChange}
          >
            <option value="">-- Select Package --</option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/companyadminlogin">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '100vw',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default UserLogin;
