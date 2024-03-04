import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: "./config/confog.env",
});

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server is up and run on port 3001");
});

