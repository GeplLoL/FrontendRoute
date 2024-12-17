import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import BusList from './pages/BusList';
import AddBus from './pages/AddBus';

function App() {
  const [role, setRole] = useState(null); // Kasutaja rolli salvestamine
  const [userId, setUserId] = useState(null); // Kasutaja ID salvestamine

  const handleLogout = () => {
    setRole(null); // Nullime rolli
    setUserId(null); // Nullime kasutaja ID
    alert('Olete süsteemist välja logitud');
  };

  return (
    <Router>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Busside Haldus</div>
        <div>
          {/* Kui rolli pole määratud, näitame registreerimist ja sisselogimist */}
          {!role && (
            <>
              <Link to="/register" style={styles.navLink}>Registreerimine</Link>
              <Link to="/login" style={styles.navLink}>Logi sisse</Link>
            </>
          )}
          <Link to="/buses" style={styles.navLink}>Busside nimekiri</Link>
          {/* Ainult administraator saab lisada busse */}
          {role === 'admin' && (
            <Link to="/add-bus" style={styles.navLink}>Lisa buss</Link>
          )}
          {/* Näitame välja logimise nuppu ainult sisselogitud kasutajatele */}
          {role && (
            <button onClick={handleLogout} style={styles.logoutButton}>Logi välja</button>
          )}
        </div>
      </nav>

      <div style={styles.container}>
        <Routes>
          <Route path="/register" element={<Register setRole={setRole} setUserId={setUserId} />} />
          <Route path="/login" element={<Login setRole={setRole} setUserId={setUserId} />} />
          <Route path="/buses" element={<BusList role={role} userId={userId} />} />
          {role === 'admin' && <Route path="/add-bus" element={<AddBus />} />}
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
  },
  logo: {
    color: '#fff',
    fontSize: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default App;
