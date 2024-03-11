import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import notes from "./routes/notes.js";
import users from "./routes/users.js";
import { connectDB } from "./config/db.js";

dotenv.config({
    path: "./config/config.env",
});

const app = express();
const port = 3000;
connectDB();


app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: 'http://localhost:5173', // Autoriser uniquement les requêtes provenant de ce domaine
  methods: ['GET', 'POST'], // Autoriser uniquement certaines méthodes HTTP
  allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser uniquement certains en-têtes
  credentials: true, // Autoriser les cookies et les en-têtes d'autorisation
}));


app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);



app.listen(port, () => {
    try {
        connectDB();
        console.log("Server is running on port 3000");
        console.log("Connected to MongoDB");
      } catch (error) {
        console.error(`Error: ${error.message}`);
               process.exit(1);
      }
});

