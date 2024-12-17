import React, { useState } from 'react';
import axios from 'axios';

function AddBus() {
  const [busNumber, setBusNumber] = useState('');
  const [seats, setSeats] = useState('');
  const [route, setRoute] = useState('');
  const [departurePoint, setDeparturePoint] = useState('');
  const [destinationPoint, setDestinationPoint] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/buses',
        { busNumber, seats: parseInt(seats), route, departurePoint, destinationPoint, departureTime },
        { withCredentials: true }
      );
      alert('Buss on edukalt lisatud!');
      // Сброс значений формы
      setBusNumber('');
      setSeats('');
      setRoute('');
      setDeparturePoint('');
      setDestinationPoint('');
      setDepartureTime('');
    } catch (err) {
      alert(err.response?.data?.message || 'Serveri viga bussi lisamisel');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Lisa uus buss</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input placeholder="Bussi number" value={busNumber} onChange={(e) => setBusNumber(e.target.value)} style={styles.input} required />
        <input placeholder="Istekohtade arv" type="number" value={seats} onChange={(e) => setSeats(e.target.value)} style={styles.input} required />
        <input placeholder="Marsruut" value={route} onChange={(e) => setRoute(e.target.value)} style={styles.input} required />
        <input placeholder="Lähtepunkt" value={departurePoint} onChange={(e) => setDeparturePoint(e.target.value)} style={styles.input} required />
        <input placeholder="Sihtpunkt" value={destinationPoint} onChange={(e) => setDestinationPoint(e.target.value)} style={styles.input} required />
        <input placeholder="Väljumisaeg (nt 14:00)" type="text" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} style={styles.input} required />
        <button type="submit" style={styles.button}>Lisa buss</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '400px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '15px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
  button: { padding: '10px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px', cursor: 'pointer' },
};

export default AddBus;
