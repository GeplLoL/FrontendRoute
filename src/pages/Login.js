import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setRole, setUserId, setUsername }) {
  const [username, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { username, password }, { withCredentials: true });
      setRole(res.data.role);
      setUserId(res.data.userId);
      setUsername(username); // Передаем ник напрямую
      alert('Sisselogimine õnnestus!');
      navigate('/buses');
    } catch (err) {
      alert(err.response?.data?.message || 'Viga sisselogimisel');
    }
  };

  return (
    <div style={styles.authContainer}>
      <h2 style={styles.authTitle}>Sisselogimine</h2>
      <form onSubmit={handleLogin} style={styles.authForm}>
        <input
          type="text"
          placeholder="Kasutajanimi"
          value={username}
          onChange={(e) => setLocalUsername(e.target.value)}
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
        <button type="submit" style={styles.authButton}>Logi sisse</button>
      </form>
    </div>
  );
}

const styles = {
  authContainer: { maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' },
  authTitle: { marginBottom: '20px', color: '#333', fontSize: '24px', fontWeight: 'bold' },
  authForm: { display: 'flex', flexDirection: 'column', gap: '15px' },
  authInput: { padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '5px' },
  authButton: { padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
};

export default Login;
