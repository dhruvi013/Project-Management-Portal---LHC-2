import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyAdminLogin = () => {
  const [form, setForm] = useState({ adminEmail: '', adminPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.adminEmail || !form.adminPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/companyadmin/login', {
        username: form.adminEmail, // Send username instead of adminEmail
        password: form.adminPassword, // Send password
      });

      if (res.data.success) {
        navigate('/project');
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Company Admin Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
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
            placeholder="Password"
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
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
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default CompanyAdminLogin;
