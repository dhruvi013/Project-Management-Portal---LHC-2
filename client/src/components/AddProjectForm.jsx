import React, { useState } from 'react';
import axios from 'axios';

function AddProject({ companyId }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/project/add', { ...form, companyId });
        setMsg('✅ Project added successfully!');
        setForm({ name: '', description: '' });
    } catch (err) {
        setMsg(`❌ ${err?.response?.data?.message || 'Error adding project'}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Project</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
          style={styles.input}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Add Project</button>
      </form>
      {msg && <p style={styles.message}>{msg}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f4f6f9',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    minHeight: '100px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '15px',
    fontSize: '16px',
    color: '#333',
  },
};

export default AddProject;
