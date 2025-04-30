import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link

const PackageManager = () => {
  const [auth, setAuth] = useState(false);
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ name: '', maxProjects: '', maxUsers: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loginAdmin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username: 'admin',
        password: 'admin123',
      });
      if (res.data.success) {
        setAuth(true);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/packages');
      setPackages(res.data);
    } catch (err) {
      setError('Failed to fetch packages');
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.maxProjects || !form.maxUsers) {
      alert('Please fill all fields');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/admin/packages', form);
      setForm({ name: '', maxProjects: '', maxUsers: '' });
      fetchPackages();
    } catch (err) {
      alert('Error creating package');
    }
  };

  const deletePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/packages/${id}`);
      fetchPackages();
    } catch (err) {
      alert('Error deleting package');
    }
  };

  useEffect(() => {
    const init = async () => {
      await loginAdmin();
      await fetchPackages();
    };
    init();
  }, []);

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</h3>;
  if (!auth) return <h3 style={{ textAlign: 'center', marginTop: '100px' }}>{error || 'Unauthorized access'}</h3>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Package Manager</h2>
        <input
          style={styles.input}
          placeholder="Package Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Max Projects"
          type="number"
          value={form.maxProjects}
          onChange={(e) => setForm({ ...form, maxProjects: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Max Users"
          type="number"
          value={form.maxUsers}
          onChange={(e) => setForm({ ...form, maxUsers: e.target.value })}
        />
        <button style={styles.button} onClick={handleSubmit}>Create Package</button>

        <h3 style={{ marginTop: '20px' }}>Existing Packages</h3>
        <ul style={styles.list}>
          {packages.map((p, i) => (
            <li key={i} style={styles.listItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <strong>{p.name}</strong> — {p.maxProjects} Projects, {p.maxUsers} Users
                </span>
                <button style={styles.deleteButton} onClick={() => deletePackage(p._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add the Link to the request page here */}
        <div style={{ marginTop: '20px' }}>
          <Link to="/admindashboard" style={styles.link}>
            Go to Request Page
          </Link>
        </div>
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
  title: {
    marginBottom: '20px',
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
  list: {
    textAlign: 'left',
    paddingLeft: '0px',
    marginTop: '10px',
  },
  listItem: {
    margin: '8px 0',
    background: '#f9f9f9',
    padding: '10px',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: '30px',
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default PackageManager;
