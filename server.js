import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
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

app.use("/api/v1/notes", notes);
app.use("/api/v1/users", users);



app.listen(port, () => {
    console.log("Server is up and run on port 3001");
});

