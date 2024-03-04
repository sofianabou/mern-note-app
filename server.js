import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import notes from "./routes/notes.js";


dotenv.config({
    path: "./config/confog.env",
});

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/notes", notes);



app.listen(port, () => {
    console.log("Server is up and run on port 3001");
});

