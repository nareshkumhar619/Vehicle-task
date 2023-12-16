import { Vehicle } from "../Model/model.js";

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createVehicles = async (req, res) => {
  const vehicle = req.body
  try {
    const newVehicle = await Vehicle.create(vehicle);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateVehicles = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteVehicles = async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.findByIdAndDelete(id);
    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
