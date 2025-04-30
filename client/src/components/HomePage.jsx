import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>Project Management Portal</div>
        <ul style={styles.navLinks}>
          <li><Link to="/admin/login" style={styles.link}>Admin Login</Link></li>
          <li><Link to="/user/login" style={styles.link}>User login</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Welcome to Project Management Portal</h1>
        <p style={styles.subtext}>Manage projects, companies, and employees all in one place.</p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  nav: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  main: {
    marginTop: '70px',
    paddingTop: '120px',
    textAlign: 'center',
    padding: '4rem 11rem',
    width: '100vw',
  },
  heading: {
    marginTop: '150px',
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default HomePage;
