import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from "cors"


dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api",  routes);


export default app;