const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.port || 5000;
const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://nareshkumhar619:pmtDst5JSzFsZCGc@cluster0.bmlwf23.mongodb.net/?retryWrites=true&w=majority");

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})



const vehicleSchema = new mongoose.Schema({
  chassisNumber: String,
  registrationNumber: String,
  lastLocation: {
    lat: Number,
    long: Number
  },
  kind: {
    type: String,
    enum: ["Reefer", "Heavy", "Light"]
  },
  milesDriven: Number,
  lastInspection: Date
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/vehicles', async (req, res) => {
  const vehicle = new Vehicle(req.body);
  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/vehicles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.findByIdAndDelete(id);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})