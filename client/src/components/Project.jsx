import React from 'react';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();

  const handleRedirectToPage1 = () => {
    navigate('/addproject'); // Replace '/page1' with your desired route
  };

  const handleRedirectToPage2 = () => {
    navigate('/addemployee'); // Replace '/page2' with your desired route
  };

  return (
    <div style={styles.container}>
      <h2>Project</h2>
      <div style={styles.buttonContainer}>
        <button onClick={handleRedirectToPage1} style={styles.button}>ADD PROJECT</button>
        <button onClick={handleRedirectToPage2} style={styles.button}>ADD EMPLOYEE</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default Project;
