import express from "express";
import {
  getAllVehicles,
  createVehicles,
  updateVehicles,
  deleteVehicles,
} from "../controllers/Controller.js";

const router = express.Router();

router.get("/vehicles", getAllVehicles);
router.post("/vehicles", createVehicles);
router.put("/vehicles/:id", updateVehicles);
router.delete("/vehicles/:id", deleteVehicles);

export default router;
