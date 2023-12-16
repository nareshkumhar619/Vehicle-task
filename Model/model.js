import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema({
  chassisNumber: String,
  registrationNumber: String,
  lastLocation: {
    lat: Number,
    long: Number,
  },
  kind: {
    type: String,
    enum: ["Reefer", "Heavy", "Light"],
  },
  milesDriven: Number,
  lastInspection: Date,
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
