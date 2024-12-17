import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register({ setRole, setUserId }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Kasutaja registreerimise funktsioon
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', { username, password }, { withCredentials: true });
      setRole(res.data.role); // Määrame kasutaja rolli
      setUserId(res.data.userId); // Määrame kasutaja ID
      alert('Registreerimine õnnestus!');
      navigate('/buses'); // Liikumine busside lehele
    } catch (err) {
      alert(err.response?.data?.message || 'Viga registreerimisel');
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2 style={styles.authTitle}>Registreerimine</h2>
      <form onSubmit={handleRegister} style={styles.authForm}>
        <input
          type="text"
          placeholder="Kasutajanimi"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.authInput}
        />
        <input
          type="password"
          placeholder="Parool"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.authInput}
        />
        <button type="submit" style={styles.authButton}>
          Registreeru
        </button>
      </form>
    </div>
  );
}

// Stiilid registreerimisvormile
const styles = {
  authContainer: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  authTitle: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  authInput: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  authButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
};

export default Register;
