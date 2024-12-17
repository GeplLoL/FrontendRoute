import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BusList({ role, userId }) {
  const [buses, setBuses] = useState([]);
  const [editBus, setEditBus] = useState(null); // Busside redigeerimise olek
  const [filterRoute, setFilterRoute] = useState('');
  const [minSeats, setMinSeats] = useState('');
  const [maxSeats, setMaxSeats] = useState('');

  useEffect(() => {
    fetchBuses(); // Busside toomine serverist
  }, []);

  // Busside toomine serverist
  const fetchBuses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buses');
      setBuses(res.data);
    } catch (err) {
      console.error(err);
      alert('Viga busside toomisel');
    }
  };

  // Bussi kustutamine
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/buses/${id}`, { withCredentials: true });
      fetchBuses();
      alert('Buss on kustutatud');
    } catch (err) {
      alert('Viga bussi kustutamisel');
    }
  };

  // Bussi redigeerimine
  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/buses/${editBus._id}`,
        {
          busNumber: editBus.busNumber,
          seats: editBus.seats,
          route: editBus.route,
          departurePoint: editBus.departurePoint,
          destinationPoint: editBus.destinationPoint,
          departureTime: editBus.departureTime,
        },
        { withCredentials: true }
      );
      setEditBus(null);
      fetchBuses();
      alert('Buss on uuendatud');
    } catch (err) {
      console.error(err);
      alert('Viga bussi uuendamisel');
    }
  };
  

  // Busside filtreerimine
  const filteredBuses = buses.filter((bus) => {
    const matchesRoute = bus.route.toLowerCase().includes(filterRoute.toLowerCase());
    const matchesMinSeats = minSeats ? bus.seats >= parseInt(minSeats) : true;
    const matchesMaxSeats = maxSeats ? bus.seats <= parseInt(maxSeats) : true;
    return matchesRoute && matchesMinSeats && matchesMaxSeats;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Busside nimekiri</h2>

      {/* Filtrite väljad */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Filtreeri marsruudi järgi"
          value={filterRoute}
          onChange={(e) => setFilterRoute(e.target.value)}
          style={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Minimaalne istekohtade arv"
          value={minSeats}
          onChange={(e) => setMinSeats(e.target.value)}
          style={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Maksimaalne istekohtade arv"
          value={maxSeats}
          onChange={(e) => setMaxSeats(e.target.value)}
          style={styles.filterInput}
        />
      </div>

      {/* Busside nimekiri */}
      {filteredBuses.map((bus) => (
        <div key={bus._id} style={styles.busCard}>
          {/* Bussi info */}
          <p><strong>Bussi number:</strong> {bus.busNumber}</p>
          <p><strong>Istekohtade arv:</strong> {bus.seats}</p>
          <p><strong>Marsruut:</strong> {bus.route}</p>
          <p><strong>Lähtepunkt:</strong> {bus.departurePoint}</p>
          <p><strong>Sihtpunkt:</strong> {bus.destinationPoint}</p>
          <p><strong>Väljumisaeg:</strong> {bus.departureTime}</p>

            {/* Redigeerimisvorm */}
            {editBus && editBus._id === bus._id && (
            <form style={styles.commentForm}>
                <input
                type="text"
                value={editBus.busNumber}
                onChange={(e) => setEditBus({ ...editBus, busNumber: e.target.value })}
                placeholder="Bussi number"
                style={styles.filterInput}
                />
                <input
                type="number"
                value={editBus.seats}
                onChange={(e) => setEditBus({ ...editBus, seats: e.target.value })}
                placeholder="Istekohtade arv"
                style={styles.filterInput}
                />
                <input
                type="text"
                value={editBus.route}
                onChange={(e) => setEditBus({ ...editBus, route: e.target.value })}
                placeholder="Marsruut"
                style={styles.filterInput}
                />
                <input
                type="text"
                value={editBus.departurePoint}
                onChange={(e) => setEditBus({ ...editBus, departurePoint: e.target.value })}
                placeholder="Lähtepunkt"
                style={styles.filterInput}
                />
                <input
                type="text"
                value={editBus.destinationPoint}
                onChange={(e) => setEditBus({ ...editBus, destinationPoint: e.target.value })}
                placeholder="Sihtpunkt"
                style={styles.filterInput}
                />
                <input
                type="text"
                value={editBus.departureTime}
                onChange={(e) => setEditBus({ ...editBus, departureTime: e.target.value })}
                placeholder="Väljumisaeg"
                style={styles.filterInput}
                />
                <button type="button" onClick={handleEdit} style={styles.button}>Salvesta</button>
                <button type="button" onClick={() => setEditBus(null)} style={styles.buttonDelete}>Tühista</button>
            </form>
            )}

          {/* Nupud administraatorile */}
          {role === 'admin' && !editBus && (
            <div style={styles.adminActions}>
              <button onClick={() => setEditBus(bus)} style={styles.button}>Muuda</button>
              <button onClick={() => handleDelete(bus._id)} style={styles.buttonDelete}>Kustuta</button>
            </div>
          )}
        </div>
      ))}

    </div>
  );
}

// Stiilid
const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px' },
  title: { textAlign: 'center', marginBottom: '20px' },
  filterContainer: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  filterInput: { padding: '10px', borderRadius: '5px', width: '30%' },
  busCard: { padding: '15px', border: '1px solid #ddd', marginBottom: '20px', borderRadius: '5px' },
  commentForm: { marginTop: '10px' },
  button: { padding: '8px 12px', backgroundColor: '#4CAF50', color: '#fff', borderRadius: '5px' },
  buttonDelete: { padding: '8px 12px', backgroundColor: '#e74c3c', color: '#fff', borderRadius: '5px' },
  adminActions: { marginTop: '10px', display: 'flex', gap: '10px' },
};

export default BusList;
