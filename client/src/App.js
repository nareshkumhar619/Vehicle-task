import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    chassisNumber: '',
    registrationNumber: '',
    lastLocation: { lat: 0, long: 0 },
    kind: 'Reefer',
    milesDriven: 0,
    lastInspection: new Date().toISOString(),
  });
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addVehicle = async () => {
    try {
      await axios.post('http://localhost:5000/vehicles', newVehicle);
      setNewVehicle({
        chassisNumber: '',
        registrationNumber: '',
        lastLocation: { lat: 0, long: 0 },
        kind: 'Reefer',
        milesDriven: 0,
        lastInspection: new Date().toISOString(),
      });
      fetchVehicles();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const editVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle);
  };

  const updateVehicle = async () => {
    try {
      await axios.put(
        `http://localhost:5000/vehicles/${editingVehicle._id}`,
        newVehicle
      );
      setEditingVehicle(null);
      setNewVehicle({
        chassisNumber: '',
        registrationNumber: '',
        lastLocation: { lat: 0, long: 0 },
        kind: 'Reefer',
        milesDriven: 0,
        lastInspection: new Date().toISOString(),
      });
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Vehicle Management App</h1>
      <div className="form-container">
        <h2>{editingVehicle ? 'Edit Vehicle' : 'Add a New Vehicle'}</h2>
        <label>Chassis Number:</label>
        <input
          type="text"
          name="chassisNumber"
          value={newVehicle.chassisNumber}
          onChange={handleInputChange}
        />
        <label>Registration Number:</label>
        <input
          type="text"
          name="registrationNumber"
          value={newVehicle.registrationNumber}
          onChange={handleInputChange}
        />
        <label>Kind:</label>
        <input
          type="text"
          name="kind"
          value={newVehicle.kind}
          onChange={handleInputChange}
        />
        <label>Miles Driven:</label>
        <input
          type="number"
          name="milesDriven"
          value={newVehicle.milesDriven}
          onChange={handleInputChange}
        />
        <label>Last Location:</label>
        
        <label>Last Inspection:</label>
        <input
          type="text"
          name="lastInspection"
          value={newVehicle.lastInspection}
          onChange={handleInputChange}
        />
        
        {editingVehicle ? (
          <button className="update-button" onClick={updateVehicle}>
            Update Vehicle
          </button>
        ) : (
          <button className="add-button" onClick={addVehicle}>
            Add Vehicle
          </button>
        )}
      </div>
      <div className="list-container">
        <h2>Vehicle List</h2>
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle._id} className="vehicle-item">
              {vehicle.chassisNumber} - {vehicle.registrationNumber} -{' '}
              {vehicle.kind}
              <button className="edit-button" onClick={() => editVehicle(vehicle)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => deleteVehicle(vehicle._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
